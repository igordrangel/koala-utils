# @koalarx/utils — Instruções para Copilot

Biblioteca TypeScript publicada no npm com validadores, conversores e abstrações para problemas comuns em JavaScript/TypeScript. Foco em APIs fluentes para o ecossistema Koala.

## Visão geral da arquitetura

```
src/
  index.ts              # barrel (core)
  core/                 # classes Kl* + funções primitivas + holidays
    types/
    enums/
  operators/            # entradas fluentes (retorno Kl*)
  prototypes/           # patches opt-in de String/Number/Date/Array
tests/                  # specs (fora de src/)
docs/llms.md            # doc condensada para LLMs
```

- Classes `Kl*` **estendem tipos nativos** (`String`, `Number`, `Date`, `Array`) para métodos encadeáveis.
- Cada módulo core expõe **classe + funções utilitárias** que retornam primitivos.
- **Operators** (`@koalarx/utils/operators`): mesmas operações começando na função, retorno `Kl*` para fluent; **sem `pipe()`**.
- **Prototypes** (`@koalarx/utils/prototypes`): side-effect opt-in; não entra no barrel principal.
- Feriados: `src/core/holidays.ts` via `@koalarx/utils/holidays`.

Doc para LLMs: [`docs/llms.md`](../docs/llms.md) (também publicada no npm). Manter README e `llms.md` alinhados e detalhados; versão atual do pacote é `5.0.0` (operators/prototypes entram nesta major ainda não publicada).

## Módulos core

| Módulo   | Estende | Responsabilidade principal                     |
| -------- | ------- | ---------------------------------------------- |
| KlString | String  | Máscaras/validação CPF/CNPJ, camelCase, base64 |
| KlNumber | Number  | Formatação monetária, números aleatórios       |
| KlDate   | Date    | Formatação, fuso, add/sub; feriados via opt-in |
| KlTime   | Date    | Manipulação de horários                        |
| KlArray  | Array   | split, orderBy, shuffle, clearEmptyValues      |
| KlDelay  | —       | `delay()` / `KlDelay.waitFor()` assíncrono     |
| KlCron   | —       | Medição de duração de execução                 |

## Operators vs prototypes vs core

| Camada | Import | Uso típico |
|--------|--------|------------|
| Core funções | `@koalarx/utils/KlString` | `maskCpf(s)` → `string` (FE tree-shake) |
| Operators | `@koalarx/utils/operators` | `format(d).split("/")` (FE fluente) |
| Prototypes | `@koalarx/utils/prototypes` | `"…".maskCpf()` (BE / main) |

Não reexportar operators no barrel raiz (conflito de nomes com funções primitivas).

## Padrões de implementação

### Nomenclatura

- Prefixo `Kl` em classes, tipos e enums.
- Testes em `tests/*.spec.ts`.
- Imports internos relativos (`../core/KlNumber`, `./types/...`).

### Imutabilidade vs mutação

- Transformações em `KlString` / `KlNumber` / `KlArray` retornam **nova instância**.
- Overrides nativos em `KlArray` / `KlString` preservam tipo `Kl*`.
- `KlDate.add` / `sub` **mutam** `this`.
- Funções core no final do arquivo retornam primitivos.
- Operators retornam `Kl*` (exceto boolean/`maskCoin` string/`diff` number).

### Documentação

- JSDoc em **português brasileiro**.
- Mensagens de erro em inglês.
- Manter `docs/llms.md` alinhado à API pública.

### Dependências

- `validation-br`, `date-fns`; `date-holidays` peer opcional via holidays.

## Como adicionar um novo módulo core

1. Criar `src/core/Kl{Nome}.ts`.
2. Funções utilitárias no mesmo arquivo (primitivos).
3. Se couber: operator em `src/operators/` e/ou patch em `src/prototypes/`.
4. Teste em `tests/Kl{Nome}.spec.ts`.
5. `export *` em `src/index.ts` + entry em `package.json` `exports`.
6. Atualizar `README.md` e `docs/llms.md`.

## Testes

- Bun test; `bun run test` (root `tests/` via `bunfig.toml`).
- Cobrir classe, funções, operators e prototypes quando aplicável.

## Pull requests e versionamento

| Tipo | Comando |
|------|---------|
| Correção | `bun run deploy:hotfix` (patch) |
| Feature | `bun run deploy:feature` (minor) |
| Breaking | `bun run deploy:release` (major) |

Na PR: `bun pm version … --no-git-tag-version` para só atualizar `package.json`.

## Build e publicação

- `bun run build` → `tsc` + copia `package.json`, `README.md`, `LICENSE`, `docs/` para `dist/`.
- `exports` aponta `Kl*` e `holidays` para `./core/…`; `./operators` e `./prototypes*`.
- `sideEffects`: holidays + prototypes.

## Qualidade

- TypeScript `strict`; ESLint + Prettier; não commitar `dist/`.

## Comandos úteis

```bash
bun run test
bun run test:watch
bun run lint
bun run build
```
