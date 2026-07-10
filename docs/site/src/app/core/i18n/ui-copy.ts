import type { Locale } from "../models/locale.types";

export const UI_COPY = {
  pt: {
    home: "Início",
    docs: "Documentação",
    search: "Buscar",
    searchPlaceholder: "Buscar na documentação...",
    searchNoResults: "Nenhum resultado encontrado.",
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
      docsAi: "Docs & AI",
      installGuide: "Instalação",
      quickCommands: "Imports rápidos",
      quickCommandsHint: "Subpaths mais usados",
      quickCommandsList: [
        'import { maskCpf } from "@koalarx/utils/KlString"',
        'import { format } from "@koalarx/utils/operators"',
        'import "@koalarx/utils/prototypes"',
        'import "@koalarx/utils/holidays"',
      ],
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
          "Um import no main e \"123\".maskCpf() em qualquer lugar do processo.",
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
} as const satisfies Record<Locale, unknown>;
