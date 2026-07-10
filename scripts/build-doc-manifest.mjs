import fs from "node:fs";
import path from "node:path";
import {
  defaultLocale,
  getCategoryLabels,
  getCategoryOrder,
  llmsIndexHeaderByLocale,
  parseFrontmatter,
  supportedLocales,
  toPosix,
} from "../docs/shared/nav.mjs";

const docRoot = path.resolve("docs");
const markdownRoot = path.join(docRoot, "markdown");
const manifestPath = path.join(docRoot, "site/src/generated/docs-manifest.json");
const appVersionPath = path.join(
  docRoot,
  "site/src/app/core/constants/app-version.ts",
);
const txtRoot = path.join(docRoot, "txt");
const publicRoot = path.join(docRoot, "site/public");
const publicMarkdownRoot = path.join(publicRoot, "markdown");

function extractHeadings(body) {
  const headings = [];
  for (const line of body.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/\*\*/g, "").trim();
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ level, text, id });
  }
  return headings;
}

function walkLocale(locale) {
  const localeRoot = path.join(markdownRoot, locale);
  if (!fs.existsSync(localeRoot)) return [];

  const docs = [];

  function walk(dir, rel = "") {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const relPath = path.join(rel, entry.name);
      if (entry.isDirectory()) {
        walk(full, relPath);
      } else if (entry.name.endsWith(".md")) {
        const raw = fs.readFileSync(full, "utf8");
        const { meta, body } = parseFrontmatter(raw);
        docs.push({
          ...meta,
          docKey: meta.docKey ?? `${meta.category}/${meta.slug}`,
          locale,
          mdRel: toPosix(path.join(locale, relPath)),
          route: `/${locale}/docs/${meta.category}/${meta.slug}`,
          content: body.trim(),
          headings: extractHeadings(body),
        });
      }
    }
  }

  walk(localeRoot);
  return docs;
}

function buildNavigation(docs, locale) {
  const labels = getCategoryLabels(locale);
  const order = getCategoryOrder(locale);

  return order
    .map((category) => ({
      category,
      label: labels[category] ?? category,
      items: docs
        .filter((d) => d.category === category)
        .map((d) => ({
          title: d.title,
          slug: d.slug,
          description: d.description ?? "",
          route: d.route,
        })),
    }))
    .filter((section) => section.items.length > 0);
}

function buildLlmsIndex(docs, locale) {
  const labels = getCategoryLabels(locale);
  const order = getCategoryOrder(locale);

  return [
    llmsIndexHeaderByLocale[locale] ?? llmsIndexHeaderByLocale[defaultLocale],
    ...order.flatMap((cat) => {
      const items = docs.filter((d) => d.category === cat);
      if (!items.length) return [];
      return [
        `## ${labels[cat] ?? cat}`,
        "",
        ...items.map(
          (d) =>
            `- [${d.title}](markdown/${d.mdRel}): ${d.description ?? ""}`,
        ),
        "",
      ];
    }),
  ].join("\n");
}

function copyMarkdownDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyMarkdownDir(srcPath, destPath);
      continue;
    }
    if (entry.name.endsWith(".md")) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function syncMarkdownToPublic() {
  if (fs.existsSync(publicMarkdownRoot)) {
    fs.rmSync(publicMarkdownRoot, { recursive: true, force: true });
  }
  let copied = 0;
  for (const locale of supportedLocales) {
    const source = path.join(markdownRoot, locale);
    if (!fs.existsSync(source)) continue;
    copyMarkdownDir(source, path.join(publicMarkdownRoot, locale));
    copied += walkLocale(locale).length;
  }
  return copied;
}

function syncAppVersion() {
  const rootPackage = JSON.parse(
    fs.readFileSync(path.resolve("package.json"), "utf8"),
  );
  const version = rootPackage.version;
  fs.mkdirSync(path.dirname(appVersionPath), { recursive: true });
  fs.writeFileSync(
    appVersionPath,
    [
      "// Gerado por scripts/build-doc-manifest.mjs — não editar manualmente.",
      `export const APP_VERSION = '${version}';`,
      "",
    ].join("\n"),
  );
  return version;
}

const locales = {};
const routesByDocKey = {};

for (const locale of supportedLocales) {
  const docs = walkLocale(locale);
  docs.sort((a, b) => {
    const order = getCategoryOrder(locale);
    const ca = order.indexOf(a.category);
    const cb = order.indexOf(b.category);
    if (ca !== cb) return ca - cb;
    return Number(a.order ?? 0) - Number(b.order ?? 0);
  });

  for (const doc of docs) {
    routesByDocKey[doc.docKey] ??= {};
    routesByDocKey[doc.docKey][locale] =
      `/${locale}/docs/${doc.category}/${doc.slug}`;
  }

  locales[locale] = {
    navigation: buildNavigation(docs, locale),
    docs: docs.map((d) => ({
      title: d.title,
      slug: d.slug,
      category: d.category,
      docKey: d.docKey,
      locale: d.locale,
      order: Number(d.order ?? 0),
      description: d.description ?? "",
      route: d.route,
      mdRel: d.mdRel,
      content: d.content,
      headings: d.headings,
      alternateRoute: "",
    })),
  };
}

for (const locale of supportedLocales) {
  const otherLocale = supportedLocales.find((item) => item !== locale);
  if (!otherLocale) continue;

  for (const doc of locales[locale].docs) {
    doc.alternateRoute =
      routesByDocKey[doc.docKey]?.[otherLocale] ?? doc.route;
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  defaultLocale,
  supportedLocales,
  locales,
};

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
fs.mkdirSync(txtRoot, { recursive: true });
fs.mkdirSync(publicRoot, { recursive: true });

const markdownFiles = syncMarkdownToPublic();
const appVersion = syncAppVersion();

for (const locale of supportedLocales) {
  const llmsIndex = buildLlmsIndex(locales[locale].docs, locale);
  const suffix = locale === defaultLocale ? "" : `-${locale}`;
  fs.writeFileSync(path.join(txtRoot, `llms${suffix}.txt`), llmsIndex);
  fs.writeFileSync(path.join(txtRoot, `llm${suffix}.txt`), llmsIndex);
  fs.writeFileSync(path.join(publicRoot, `llms${suffix}.txt`), llmsIndex);
  fs.writeFileSync(path.join(publicRoot, `llm${suffix}.txt`), llmsIndex);
}

const totalDocs = Object.values(locales).reduce(
  (sum, l) => sum + l.docs.length,
  0,
);
console.log(
  `Manifest gerado: ${totalDocs} tópicos (${supportedLocales.join(", ")}) → ${manifestPath}`,
);
console.log(`Versão da doc sincronizada: v${appVersion}`);
console.log(`Markdown publicado: ${markdownFiles} arquivos`);
