export const supportedLocales = ["pt"];

export const defaultLocale = "pt";

export const categoryOrder = [
  "intro",
  "inicio",
  "core",
  "operators",
  "prototypes",
  "guias",
];

export const categoryOrderByLocale = {
  pt: categoryOrder,
};

export const categoryLabelsByLocale = {
  pt: {
    intro: "Introdução",
    inicio: "Primeiros passos",
    core: "Core",
    operators: "Operators",
    prototypes: "Prototypes",
    guias: "Guias",
  },
};

export const llmsIndexHeaderByLocale = {
  pt: [
    "# @koalarx/utils",
    "",
    "> Biblioteca utilitária TypeScript/JavaScript para máscaras, datas, arrays e conversões do ecossistema Koala.",
    "",
    "Documentação otimizada para LLMs. Cada tópico aponta para o arquivo Markdown correspondente — sem duplicar conteúdo.",
    "",
    "Site: https://utils.koalarx.com",
    "",
  ].join("\n"),
};

export const categoryLabels = categoryLabelsByLocale.pt;

export function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) meta[key.trim()] = rest.join(":").trim();
  }
  return { meta, body: match[2] };
}

export function toPosix(p) {
  return p.split(/[/\\]/).join("/");
}

export function getCategoryLabels(locale) {
  return categoryLabelsByLocale[locale] ?? categoryLabelsByLocale[defaultLocale];
}

export function getCategoryOrder(locale) {
  return categoryOrderByLocale[locale] ?? categoryOrderByLocale[defaultLocale];
}
