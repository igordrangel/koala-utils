import type { Locale } from "../models/locale.types";

export const UI_COPY = {
  pt: {
    home: "Início",
    docs: "Documentação",
    search: "Buscar",
    searchDocs: "Buscar docs…",
    searchPlaceholder: "Buscar páginas, seções e exemplos…",
    searchNoResults: "Nenhum resultado encontrado.",
    searchNoResultsFor: "Nenhum resultado para",
    searchHint: "Digite para buscar páginas e seções da documentação",
    searchNavigate: "navegar",
    searchOpen: "abrir",
    copyAiIndex: "Copy AI docs index",
    copyAiShort: "Copy AI",
    copied: "Copied!",
    copyForAi: "Copy for AI",
    language: "Idioma",
    notFound: "Página não encontrada.",
    goToInstallGuide: "Ir para a instalação",
    onThisPage: "Nesta página",
    metaDescription:
      "Biblioteca utilitária Koala: máscaras, datas, arrays, operators e prototypes para TypeScript/JavaScript.",
    seo: {
      landingTitle: "@koalarx/utils — utilitários TypeScript do ecossistema Koala",
    },
    footer: {
      description:
        "Máscaras BR, datas, arrays e APIs fluentes (operators) ou globais (prototypes) para apps Node e front-end.",
      creatorRole: "Design, back-end e estratégia de produto.",
      links: "Links",
      npm: "npm — @koalarx/utils",
      koala: "Koala",
      docsAi: "Docs & AI",
      installGuide: "Instalação",
      tagline: "Feito para o ecossistema Koala e fluxos assistidos por IA.",
    },
    landing: {
      heroBadge: "npm i @koalarx/utils",
      heroLead: "Utilitários TypeScript para o ",
      heroGradient: "ecossistema Koala",
      heroTrail: "",
      heroSubtitle:
        "Máscaras, datas, arrays e conversões — com operators fluentes no front e prototypes no back.",
      gettingStarted: "Começar agora",
      viewDocs: "Ver documentação",
      whatIsTitle: "O que é o @koalarx/utils?",
      whatIsSubtitle:
        "Uma lib pequena e tipada para problemas do dia a dia em TypeScript/JavaScript.",
      cliTitle: "Quatro formas de uso",
      cliSubtitle:
        "Escolha classe, função primitiva, operators (FE) ou prototypes (BE) conforme o contexto.",
      aiTitle: "Pronto para IA",
      aiSubtitle:
        "Índice llms.txt e Markdown por página — copie a URL e cole no seu assistente.",
      exploreTitle: "Explore a documentação",
      exploreSubtitle: "Atalhos para os tópicos mais usados.",
      exploreDdd: "Operators",
      exploreCrud: "Prototypes",
      exploreOpenApi: "KlString",
      exploreMapping: "Instalação",
    },
    whatIsCards: [
      {
        title: "Core tipado",
        description:
          "KlString, KlNumber, KlDate, KlTime e KlArray estendem tipos nativos com APIs fluentes.",
      },
      {
        title: "Operators no frontend",
        description:
          "Importe só o que precisa: format(date).split('/') sem poluir protótipos.",
      },
      {
        title: "Prototypes no backend",
        description:
          'Um import no main e "123".maskCpf() em qualquer lugar do processo.',
      },
      {
        title: "Feriados opt-in",
        description:
          "date-holidays só entra quando você importa @koalarx/utils/holidays.",
      },
    ],
    cliBenefits: [
      {
        title: "Tree-shakeable",
        description:
          "Subpaths por módulo e operators nomeados para bundles menores no front.",
      },
      {
        title: "Encadeamento",
        description:
          "KlString.split retorna KlArray — clearEmptyValues e orderBy no mesmo fluxo.",
      },
      {
        title: "Brasil first",
        description:
          "CPF, CNPJ, moeda e fusos comuns do dia a dia em apps BR.",
      },
    ],
    aiCards: [
      {
        title: "Índice global",
        description:
          "Use Copy AI no header para copiar https://utils.koalarx.com/llms.txt.",
      },
      {
        title: "Contexto por página",
        description:
          "Use Copy for AI em cada página para a URL do .md daquele tópico.",
      },
    ],
  },
  en: {
    home: "Home",
    docs: "Documentation",
    search: "Search",
    searchDocs: "Search docs…",
    searchPlaceholder: "Search pages, sections, and examples…",
    searchNoResults: "No results found.",
    searchNoResultsFor: "No results for",
    searchHint: "Type to search documentation pages and sections",
    searchNavigate: "navigate",
    searchOpen: "open",
    copyAiIndex: "Copy AI docs index",
    copyAiShort: "Copy AI",
    copied: "Copied!",
    copyForAi: "Copy for AI",
    language: "Language",
    notFound: "Page not found.",
    goToInstallGuide: "Go to installation",
    onThisPage: "On this page",
    metaDescription:
      "Koala utility library: masks, dates, arrays, operators, and prototypes for TypeScript/JavaScript.",
    seo: {
      landingTitle: "@koalarx/utils — TypeScript utilities for the Koala ecosystem",
    },
    footer: {
      description:
        "BR masks, dates, arrays, and fluent (operators) or global (prototypes) APIs for Node and front-end apps.",
      creatorRole: "Design, back-end, and product strategy.",
      links: "Links",
      npm: "npm — @koalarx/utils",
      koala: "Koala",
      docsAi: "Docs & AI",
      installGuide: "Installation",
      tagline: "Built for the Koala ecosystem and AI-assisted workflows.",
    },
    landing: {
      heroBadge: "npm i @koalarx/utils",
      heroLead: "TypeScript utilities for the ",
      heroGradient: "Koala ecosystem",
      heroTrail: "",
      heroSubtitle:
        "Masks, dates, arrays, and conversions — with fluent operators on the front and prototypes on the back.",
      gettingStarted: "Get started",
      viewDocs: "View documentation",
      whatIsTitle: "What is @koalarx/utils?",
      whatIsSubtitle:
        "A small, typed library for everyday TypeScript/JavaScript problems.",
      cliTitle: "Four ways to use it",
      cliSubtitle:
        "Pick class, primitive function, operators (FE), or prototypes (BE) for your context.",
      aiTitle: "AI ready",
      aiSubtitle:
        "llms.txt index and per-page Markdown — copy the URL into your assistant.",
      exploreTitle: "Explore the docs",
      exploreSubtitle: "Shortcuts to the most used topics.",
      exploreDdd: "Operators",
      exploreCrud: "Prototypes",
      exploreOpenApi: "KlString",
      exploreMapping: "Installation",
    },
    whatIsCards: [
      {
        title: "Typed core",
        description:
          "KlString, KlNumber, KlDate, KlTime, and KlArray extend native types with fluent APIs.",
      },
      {
        title: "Operators on the frontend",
        description:
          "Import only what you need: format(date).split('/') without polluting prototypes.",
      },
      {
        title: "Prototypes on the backend",
        description:
          'One import in main and "123".maskCpf() anywhere in the process.',
      },
      {
        title: "Opt-in holidays",
        description:
          "date-holidays only loads when you import @koalarx/utils/holidays.",
      },
    ],
    cliBenefits: [
      {
        title: "Tree-shakeable",
        description:
          "Per-module subpaths and named operators for smaller front-end bundles.",
      },
      {
        title: "Chaining",
        description:
          "KlString.split returns KlArray — clearEmptyValues and orderBy in the same flow.",
      },
      {
        title: "Brazil first",
        description:
          "CPF, CNPJ, currency, and time zones common in BR apps.",
      },
    ],
    aiCards: [
      {
        title: "Global index",
        description:
          "Use Copy AI in the header to copy https://utils.koalarx.com/llms-en.txt.",
      },
      {
        title: "Page-level context",
        description:
          "Use Copy for AI on each page for that topic's .md URL.",
      },
    ],
  },
} as const satisfies Record<Locale, unknown>;
