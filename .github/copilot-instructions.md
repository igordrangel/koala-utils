# @koalarx/utils — Instruções para Copilot

Biblioteca TypeScript publicada no npm com validadores, conversores e abstrações para problemas comuns em JavaScript/TypeScript. Foco em APIs fluentes para o ecossistema Koala.

## Visão geral da arquitetura

- Cada módulo principal vive em `src/Kl{Nome}.ts` (ex.: `KlString`, `KlDate`, `KlNumber`).
- Classes `Kl*` **estendem tipos nativos** do JavaScript (`String`, `Number`, `Date`, `Array`) para oferecer métodos encadeáveis.
- Cada módulo expõe **duas formas de uso**:
  1. **Classe** — `new KlString("valor").maskCpf().toString()`
  2. **Funções utilitárias** — wrappers que delegam à classe e retornam primitivos (`maskCpf("123")`, `delay(1000)`)
- Tipos compartilhados ficam em `src/types/`; enums em `src/enums/`.
- O barrel `src/index.ts` reexporta todos os módulos públicos.
- Variante **light** em `src/light/`: mesma API, sem dependências pesadas (ex.: `KlDate` sem `date-holidays`). Reexportada por `src/light/index.ts`.

## Módulos existentes

| Módulo    | Estende | Responsabilidade principal                          |
|-----------|---------|-----------------------------------------------------|
| KlString  | String  | Máscaras/validação CPF/CNPJ, camelCase, base64      |
| KlNumber  | Number  | Formatação monetária, números aleatórios            |
| KlDate    | Date    | Formatação, fuso, add/sub, feriados (BR)            |
| KlTime    | Date    | Manipulação de horários                             |
| KlArray   | Array   | split, orderBy, shuffle, clearEmptyValues           |
| KlDelay   | —       | `delay()` / `KlDelay.waitFor()` assíncrono          |
| KlCron    | —       | Medição de duração de execução                      |

## Padrões de implementação

### Nomenclatura

- Prefixo `Kl` em classes, tipos e enums (`KlDateDateType`, `KlDateDayEnum`).
- Arquivo de teste colocado ao lado do fonte: `KlString.spec.ts`.
- Imports internos usam caminhos relativos (`./KlNumber`, `../types/...`). O alias `@/*` → `./src/*` existe no `tsconfig`, mas o código atual prefere relativos.

### Imutabilidade vs mutação

- Métodos de transformação em `KlString`, `KlNumber` e `KlArray` retornam **nova instância** (`return new KlString(...)`).
- `KlDate.add()` e `KlDate.sub()` **mutam** `this` e retornam `this` (encadeamento in-place).
- Funções utilitárias no final do arquivo delegam à classe e retornam primitivos (`string`, `number`, `boolean`, `Promise`).

### Documentação

- JSDoc em **português brasileiro** em todos os métodos e funções exportados (`@param`, `@returns`, `@throws` quando aplicável).
- Mensagens de erro em inglês (`throw new Error("The cron is not started.")`).

### Dependências externas

- `validation-br` — validação CPF/CNPJ em `KlString`.
- `date-fns` — formatação de datas em `KlDate` e `KlTime`.
- `date-holidays` — feriados em `KlDate` (apenas na versão completa, não em `light`).
- Base64 em `KlString.toBase64()` usa `Buffer` nativo do Node (sem dependência externa).

Ao adicionar dependência, avalie se faz sentido manter uma versão **light** sem ela.

## Como adicionar um novo módulo

1. Criar `src/Kl{Nome}.ts` com a classe estendendo o tipo nativo adequado (ou classe utilitária, como `KlCron`).
2. Exportar funções utilitárias no mesmo arquivo, delegando à classe.
3. Criar `src/Kl{Nome}.spec.ts` com testes Vitest (`describe`/`it`/`expect`).
4. Adicionar `export * from "./Kl{Nome}"` em `src/index.ts`.
5. Atualizar `README.md` com seção do novo módulo (métodos + exemplos).
6. Se o módulo tiver variante sem dependência pesada, considerar `src/light/Kl{Nome}.ts` e atualizar `src/light/index.ts`.

## Testes

- Framework: **Vitest** com globals habilitados (`describe`, `it`, `expect` sem import).
- Config: `vitest.config.mts` com `vite-tsconfig-paths`.
- Executar: `npm test` (CI) ou `npm run test:watch` (desenvolvimento).
- Cobrir métodos da classe e funções utilitárias exportadas.
- Usar dados reais quando possível (ex.: CPF/CNPJ válidos); `validation-br/dist/cnpj` oferece `fake()` nos testes.

## Build e publicação

- `npm run build` executa `tsc` e copia `package.json` (sem scripts/devDependencies), `README.md` e `LICENSE` para `dist/`.
- O pacote publicado sai de `dist/`; consumidores importam por subpath:
  ```typescript
  import { KlString, maskCpf } from "@koalarx/utils/KlString";
  import { delay } from "@koalarx/utils/KlDelay";
  ```
- `prepublishOnly` roda os testes; `preversion` roda o lint.
- Node mínimo: `^20.18.0` (ver `engines` no `package.json`).

## Qualidade de código

- TypeScript com `strict: true`; `noImplicitAny: false` (legado).
- ESLint: `@rocketseat/eslint-config/node` + Prettier.
- Lint/format: `npm run lint` (Prettier + ESLint fix em `src/**/*`).
- Não commitar `dist/` — gerado no build/CI.
- Evitar `any` desnecessário; `@typescript-eslint/no-explicit-any` está desligado, mas prefira tipos explícitos.
- Variáveis não usadas são erro (`@typescript-eslint/no-unused-vars`).

## Convenções de estilo

- Aspas duplas e ponto e vírgula no código principal (`KlString.ts`, `KlDate.ts`).
- A variante `light/` usa aspas simples e trailing commas (seguir o estilo do arquivo ao editar).
- LF como fim de linha (Prettier `--end-of-line lf`).

## O que evitar

- Não quebrar a API pública sem bump de versão major.
- Não adicionar dependências sem avaliar impacto no bundle e na variante light.
- Não remover JSDoc ao refatorar.
- Não usar frameworks de teste além do Vitest.
- Não alterar o fluxo de build (`tsc` → `dist/`) sem atualizar o workflow `.github/workflows/npm-publish.yml`.

## Comandos úteis

```bash
npm test              # rodar testes
npm run test:watch    # testes em modo watch
npm run lint          # formatar e corrigir lint
npm run build         # compilar para dist/
```
