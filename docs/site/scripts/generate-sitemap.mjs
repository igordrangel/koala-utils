import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://utils.koalarx.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(siteRoot, 'src/generated/docs-manifest.json');
const publicSitemapPath = path.join(siteRoot, 'public/sitemap.xml');

/** GitHub Pages 301s bare paths to trailing-slash dirs; sitemap must list final URLs. */
function withTrailingSlash(route) {
  if (!route || route === '/') return '/';
  return route.endsWith('/') ? route : `${route}/`;
}

function absoluteUrl(route) {
  const normalized = withTrailingSlash(route);
  return normalized === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function xhtmlAlternates(alternates) {
  return alternates
    .map(
      ([hreflang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`,
    )
    .join('\n');
}

export function buildSitemapEntries(manifest) {
  const entries = [];

  // Omit `/` — prerender meta-refresh → `/pt` → GH Pages 301 `/pt/` ("Redirect error").
  for (const locale of manifest.supportedLocales) {
    const alternateHome = locale === 'pt' ? '/en' : '/pt';
    const homeLoc = absoluteUrl(`/${locale}`);
    entries.push({
      loc: homeLoc,
      alternates: [
        ['pt-BR', absoluteUrl('/pt')],
        ['en', absoluteUrl('/en')],
        ['x-default', absoluteUrl('/pt')],
      ],
    });

    for (const doc of manifest.locales[locale].docs) {
      const loc = absoluteUrl(doc.route);
      const alternate = doc.alternateRoute
        ? absoluteUrl(doc.alternateRoute)
        : absoluteUrl(alternateHome);
      const ptHref = locale === 'pt' ? loc : alternate;
      const enHref = locale === 'en' ? loc : alternate;

      entries.push({
        loc,
        alternates: [
          ['pt-BR', ptHref],
          ['en', enHref],
          ['x-default', ptHref],
        ],
      });
    }
  }

  const seen = new Set();
  return entries.filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

export function buildSitemapXml(entries) {
  const urls = entries
    .map((entry) => {
      const links = xhtmlAlternates(entry.alternates);
      return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n${links}\n  </url>`;
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

export function writeSitemap(manifest, targets) {
  const xml = buildSitemapXml(buildSitemapEntries(manifest));
  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, xml);
    console.log(`Sitemap gerado → ${target}`);
  }
  return xml;
}

export function generatePublicSitemap() {
  if (!fs.existsSync(manifestPath)) {
    console.warn('Manifest não encontrado; sitemap.xml não foi gerado.');
    return false;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  writeSitemap(manifest, [publicSitemapPath]);
  return true;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  if (!generatePublicSitemap()) process.exit(1);
}
