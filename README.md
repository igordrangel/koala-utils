# @koalarx/utils

Biblioteca utilitária TypeScript/JavaScript para validações, conversões, máscaras (CPF/CNPJ/moeda), datas/horários, arrays e utilitários assíncronos do ecossistema Koala.

<a id="navegacao-rapida"></a>
## Navegação rápida
<nav>
<p align="center">
<a href="#instalacao">Instalação</a> · <a href="#quatro-formas-de-uso">Formas de uso</a> · <a href="#guia-frontend-vs-backend">Frontend / Backend</a> · <a href="#subpaths-de-import">Subpaths</a>
</p>
<p align="center">
<a href="#core-klstring">KlString</a> · <a href="#core-klnumber">KlNumber</a> · <a href="#core-kldate">KlDate</a> · <a href="#core-kltime">KlTime</a> · <a href="#core-klarray">KlArray</a> · <a href="#core-kldelay">KlDelay</a> · <a href="#core-klcron">KlCron</a>
</p>
<p align="center">
<a href="#operators">Operators</a> · <a href="#prototypes">Prototypes</a> · <a href="#feriados-holidays">Feriados</a> · <a href="#tipos-e-enums">Tipos</a> · <a href="#para-llms-assistentes-de-codigo">LLMs</a> · <a href="#migracao-500">Migração</a> · <a href="#indice">Índice</a>
</p>
</nav>

> No GitHub: painel **Outline**. No npm: menu acima + índice.

<a id="indice"></a>
<details>
<summary><strong>Índice completo</strong></summary>

**Começar**
- [Navegação rápida](#navegacao-rapida)
- [Instalação](#instalacao)
- [Engines e dependências](#engines-e-dependencias)
- [Estrutura do pacote](#estrutura-do-pacote)

**Como usar**
- [Quatro formas de uso](#quatro-formas-de-uso)
  - [Comparação do mesmo fluxo](#comparacao-do-mesmo-fluxo)
- [Guia: frontend vs backend](#guia-frontend-vs-backend)
  - [Frontend](#frontend-angular-react-vue-etc)
  - [Backend](#backend-nest-express-scripts-node)
- [Subpaths de import](#subpaths-de-import)

**Core**
- [KlString](#core-klstring)
  - [Classe](#classe-klstring-estende-string)
  - [Funções utilitárias](#funcoes-utilitarias-retorno-primitivo)
- [KlNumber](#core-klnumber)
- [KlDate](#core-kldate)
- [KlTime](#core-kltime)
- [KlArray](#core-klarray)
- [KlDelay](#core-kldelay)
- [KlCron](#core-klcron)
- [Feriados (holidays)](#feriados-holidays)

**Operators e prototypes**
- [Operators](#operators)
  - [String](#operators-string) · [Number](#operators-number) · [Date](#operators-date) · [Time](#operators-time) · [Array](#operators-array) · [Exemplos](#operators-exemplos)
- [Prototypes](#prototypes)
  - [Ativação](#ativacao)
  - [String.prototype](#stringprototype) · [Number.prototype](#numberprototype) · [Date.prototype](#dateprototype) · [Array.prototype](#arrayprototype)
  - [Cuidados](#cuidados)

**Referência e migração**
- [Tipos e enums](#tipos-e-enums)
- [Para LLMs / assistentes de código](#para-llms-assistentes-de-codigo)
- [Migração 5.0.0](#migracao-500)
- [Contribuição](#contribuicao)
- [Licença](#licenca)

</details>

<a id="instalacao"></a>
## Instalação

```bash
npm install @koalarx/utils
# ou
bun add @koalarx/utils
# ou
yarn add @koalarx/utils
```

Para feriados (opcional):

```bash
npm install date-holidays
```

```typescript
import "@koalarx/utils/holidays";
```

<a id="engines-e-dependencias"></a>
## Engines e dependências

| Item | Valor |
|------|--------|
| Node | `>=20.18.0` |
| Bun | `>=1.2.0` |
| Dependências | `date-fns`, `validation-br` |
| Peer opcional | `date-holidays` (somente se usar feriados) |

<a id="estrutura-do-pacote"></a>
## Estrutura do pacote

```
@koalarx/utils
├── core/           # classes Kl* + funções que retornam primitivos + holidays
├── operators/      # entradas fluentes (retorno Kl*) — ideal no frontend
├── prototypes/     # extensão opt-in de String/Number/Date/Array — ideal no backend
└── docs/llms.md    # documentação para colar em LLMs
```

Imports públicos como `@koalarx/utils/KlString` e `@koalarx/utils/holidays` continuam estáveis (apontam para `core/`).

<a id="quatro-formas-de-uso"></a>
## Quatro formas de uso

| Forma | Import típico | Como começa | Retorno | Tree-shake | Ideal para |
|-------|---------------|-------------|---------|------------|------------|
| **Classe** | `@koalarx/utils/KlString` | `new KlString(v)` | `Kl*` encadeável | Parcial | Encadeamento explícito |
| **Função core** | `@koalarx/utils/KlString` | `maskCpf(v)` | primitivo (`string`/`number`/`boolean`) | Sim | Uso pontual |
| **Operator** | `@koalarx/utils/operators` | `maskCpf(v)` / `format(d)` | `Kl*` (fluente com `.`) | Sim | **Frontend** |
| **Prototype** | `@koalarx/utils/prototypes` | `"…".maskCpf()` | primitivo no valor nativo | Não (side-effect) | **Backend** / DX global |

**Não existe `pipe()`.** Em operators, comece direto na função e encadeie com `.`.

<a id="comparacao-do-mesmo-fluxo"></a>
### Comparação do mesmo fluxo

```typescript
// 1) Classe
import { KlString } from "@koalarx/utils/KlString";
new KlString("Olá Mundo").clear().toCamelCase().toString(); // "olaMundo"

// 2) Função core (primitivo — sem encadear métodos Kl*)
import { clear, toCamelCase } from "@koalarx/utils/KlString";
toCamelCase(clear("Olá Mundo")); // "olaMundo"

// 3) Operator (fluente)
import { clear } from "@koalarx/utils/operators";
clear("Olá Mundo").toCamelCase().toString(); // "olaMundo"

// 4) Prototype
import "@koalarx/utils/prototypes";
"Olá Mundo".clear().toCamelCase(); // "olaMundo"
```

**Atenção:** `maskCpf` importado de `@koalarx/utils/KlString` retorna `string`. O mesmo nome em `@koalarx/utils/operators` retorna `KlString`. Importe sempre do subpath correto.

<a id="guia-frontend-vs-backend"></a>
## Guia: frontend vs backend

<a id="frontend-angular-react-vue-etc"></a>
### Frontend (Angular, React, Vue, etc.)
Prefira **operators** ou **funções/classes core**:

- Tree-shaking funciona com imports nomeados.
- Evite `import "@koalarx/utils/prototypes"` no bundle do browser (puxa o patch inteiro e deps).
- Se ainda quiser prototypes no front, use subpaths granulares (`prototypes/string`) e aceite o custo.

```typescript
import { format, maskCpf, split } from "@koalarx/utils/operators";

format(new Date("2023-10-01"), "dd/MM/yyyy").split("/");
maskCpf(user.cpf).toString();
split(csvLine, ",").clearEmptyValues();
```

<a id="backend-nest-express-scripts-node"></a>
### Backend (Nest, Express, scripts Node)
**Prototypes** no `main` dão DX global em todo o processo:

```typescript
// main.ts
import "@koalarx/utils/prototypes";

// em qualquer service/controller depois disso:
cpf.maskCpf();
valor.maskCoin();
```

Cada **realm** precisa do import: processo Node, worker, processo de teste, SSR server e browser (se usar nos dois lados).

<a id="subpaths-de-import"></a>
## Subpaths de import

| Import | Conteúdo |
|--------|----------|
| `@koalarx/utils` | Barrel: reexporta o core (`Kl*` + funções primitivas) |
| `@koalarx/utils/KlString` | Classe + funções de string |
| `@koalarx/utils/KlNumber` | Classe + funções de número |
| `@koalarx/utils/KlDate` | Classe + `isHoliday` / `registerHolidayChecker` |
| `@koalarx/utils/KlTime` | Classe de horário |
| `@koalarx/utils/KlArray` | Classe de array |
| `@koalarx/utils/KlDelay` | `delay` |
| `@koalarx/utils/KlCron` | `KlCron` |
| `@koalarx/utils/holidays` | Side-effect: habilita feriados (`date-holidays`) |
| `@koalarx/utils/operators` | Todas as entradas fluentes |
| `@koalarx/utils/prototypes` | Todos os patches de protótipo |
| `@koalarx/utils/prototypes/string` | Só `String.prototype` |
| `@koalarx/utils/prototypes/number` | Só `Number.prototype` |
| `@koalarx/utils/prototypes/date` | Só `Date.prototype` |
| `@koalarx/utils/prototypes/array` | Só `Array.prototype` |

<a id="core-klstring"></a>
## Core — KlString

```typescript
import {
  KlString,
  maskCpf,
  maskCnpj,
  clear,
  toCamelCase,
  unmaskCoin,
  unmaskCpf,
  unmaskCnpj,
  nbl2br,
  validateCpf,
  validateCnpj,
  randomString,
} from "@koalarx/utils/KlString";
```

<a id="classe-klstring-estende-string"></a>
### Classe `KlString` (estende `String`)
Métodos de transformação retornam **nova** instância `KlString` (ou `KlNumber` / `KlArray` / `boolean` quando indicado). Overrides nativos (`split`, `replace`, `replaceAll`, `trim`, `trimStart`, `trimEnd`, `toLowerCase`, `toUpperCase`, `slice`, `substring`, `concat`, `normalize`) também retornam `KlString` / `KlArray` para manter o encadeamento tipado.

| Método | Parâmetros | Retorno | Descrição |
|--------|------------|---------|-----------|
| `normalizeAndRemoveSpecialChars()` | — | `KlString` | Remove acentos (NFD) |
| `removeSpaces(delimiter?)` | `delimiter` default `""` | `KlString` | Troca espaços pelo delimitador |
| `clear(delimiter?)` | `delimiter` default `" "` | `KlString` | Remove especiais + normaliza |
| `toCamelCase()` | — | `KlString` | Converte para camelCase |
| `unmaskCoin(decimalCount?)` | default `2` | `KlNumber` | Parseia moeda BR → número |
| `maskCpf()` | — | `KlString` | Máscara `000.000.000-00` |
| `maskCnpj()` | — | `KlString` | Máscara `00.000.000/0000-00` |
| `validateCpf()` | — | `boolean` | Valida CPF (`validation-br`) |
| `validateCnpj()` | — | `boolean` | Valida CNPJ |
| `onlyNumbers()` | — | `KlString` | Só dígitos |
| `nbl2br()` | — | `KlString` | `\n` → `` |
| `toBase64()` | — | `KlString` | Base64 (`Buffer`) |
| `contatenate(...parts)` | strings | `KlString` | Concatena no fim (**typo histórico** no nome) |
| `concatenateToStart(prefix)` | string | `KlString` | Concatena no início |
| `random(length, options)` | ver abaixo | `KlString` | Gera aleatória |
| `split(separator, limit?)` | string/RegExp | `KlArray<string>` | Split fluente |

`random` options: `{ lowercase?, uppercase?, numbers?, specialCharacters? }`.

<a id="funcoes-utilitarias-retorno-primitivo"></a>
### Funções utilitárias (retorno primitivo)

| Função | Retorno |
|--------|---------|
| `maskCpf(value)` | `string` |
| `maskCnpj(value)` | `string` |
| `clear(value, delimiter?)` | `string` |
| `toCamelCase(value)` | `string` |
| `unmaskCoin(value, decimalCount?)` | `number` |
| `unmaskCpf(value)` / `unmaskCnpj(value)` | `KlString` (só números; legado) |
| `nbl2br(value)` | `string` |
| `validateCpf(value)` / `validateCnpj(value)` | `boolean` |
| `randomString(length, options?)` | `string` |

```typescript
maskCpf("9964085842"); // "099.640.858-42"
new KlString("1,,2,3").split(",").clearEmptyValues(); // KlArray ["1","2","3"]
```

<a id="core-klnumber"></a>
## Core — KlNumber

```typescript
import { KlNumber, maskCoin, randomNumber } from "@koalarx/utils/KlNumber";
```

| API | Assinatura | Retorno | Descrição |
|-----|------------|---------|-----------|
| `new KlNumber(n).maskCoin(...)` | `(prefix?, thousands?, decimal?, decimalCount?)` | `string` | Defaults: `R$`, `.`, `,`, `2` |
| `new KlNumber().random(min, max)` | — | `KlNumber` | Inteiro inclusivo; erro se `min > max` |
| `maskCoin(value, options?)` | `options`: `{ prefix, thousands, decimal, decimalCount }` | `string` | Função utilitária |
| `randomNumber(min?, max?)` | default `0` … `99999999999` | `number` | |

```typescript
maskCoin(1000); // "R$ 1.000,00"
maskCoin(1000, { prefix: "US$", thousands: ",", decimal: "." });
```

<a id="core-kldate"></a>
## Core — KlDate

```typescript
import { KlDate, isHoliday, registerHolidayChecker } from "@koalarx/utils/KlDate";
```

Estende `Date`. Máscaras de `format` usam **date-fns** (ex.: `dd/MM/yyyy`, `HH:mm:ss`).

| Método | Parâmetros | Retorno | Notas |
|--------|------------|---------|-------|
| `format(mask?)` | default `"dd/MM/yyyy HH:mm:ss"` | `string` | |
| `changeTimeZone(timeZone)` | `KlDateTimeZone` (IANA) | `KlDate` | Nova instância |
| `toUTC()` | — | `KlDate` | |
| `add(qty, type, options?)` | ver tipos | `this` | **Mutável** |
| `sub(qty, type, options?)` | ver tipos | `this` | **Mutável** |
| `diff(date, type)` | outra `Date` | `number` | Diferença absoluta |
| `isHoliday(country?)` | default `"BR"` | `boolean` | Exige holidays |

`type` (`KlDateDateType`): `"seconds" | "minutes" | "hours" | "days" | "months" | "years"`.

`options` de `add`/`sub`:

```typescript
{
  skipHolidays?: { country: KlDateCountry };
  skipDays?: KlDateDayEnum[]; // domingo=0 … sábado=6
}
```

```typescript
new KlDate("2023-10-01").format("dd/MM/yyyy"); // "01/10/2023"
new KlDate("2023-10-01").add(1, "days").format("dd/MM/yyyy"); // "02/10/2023"
```

Função `isHoliday(date, country?)` delega a `new KlDate(date).isHoliday(country)`.

<a id="core-kltime"></a>
## Core — KlTime

```typescript
import { KlTime } from "@koalarx/utils/KlTime";
```

Construtores:

- `new KlTime()` — meia-noite de hoje
- `new KlTime(date: Date)`
- `new KlTime(hours?, minutes?, seconds?, ms?)` — data de hoje com esse horário

| Método | Tipo de unidade | Default `format` |
|--------|-----------------|------------------|
| `format(mask?)` | — | `"HH:mm:ss"` |
| `changeTimeZone(tz)` | — | retorna `KlTime` |
| `toUTC()` | — | `KlTime` |
| `add` / `sub` | `"seconds" \| "minutes" \| "hours"` | mutam `this` |
| `diff(date, type)` | idem | `number` |

```typescript
new KlTime(13).format(); // "13:00:00"
new KlTime(13).add(1, "hours").format(); // "14:00:00"
```

<a id="core-klarray"></a>
## Core — KlArray

```typescript
import { KlArray } from "@koalarx/utils/KlArray";
```

Estende `Array`. `map`, `filter`, `slice`, `flatMap`, `concat` retornam `KlArray`.

| Método | Parâmetros | Retorno | Descrição |
|--------|------------|---------|-----------|
| `clearEmptyValues()` | — | `KlArray` | Remove falsy (`null`, `undefined`, `0`, `""`, …) |
| `split(maxRowsSplit)` | número | `KlArray<KlArray<T>>` | Chunk em grupos |
| `orderBy(by, direction?)` | propriedade; `"asc"` \| `"desc"` | `this` | Ordena **in-place** |
| `shuffle()` | — | `this` | Embaralha **in-place** (garante resultado ≠ original) |

```typescript
new KlArray([1, 2, 3, 4]).split(2); // [[1,2],[3,4]]
new KlString("a,,b").split(",").clearEmptyValues();
```

<a id="core-kldelay"></a>
## Core — KlDelay

```typescript
import { delay } from "@koalarx/utils/KlDelay";

await delay(1000); // Promise resolve após 1s
```

<a id="core-klcron"></a>
## Core — KlCron

```typescript
import { KlCron } from "@koalarx/utils/KlCron";

const cron = new KlCron();
cron.start();
// ... trabalho ...
cron.end();
cron.duration(); // segundos (number)
```

Lança erro se `duration()` for chamado sem `start` ou sem `end`.

<a id="feriados-holidays"></a>
## Feriados (holidays)
1. Instale o peer: `npm install date-holidays`
2. Importe o side-effect **uma vez** no bootstrap:

```typescript
import "@koalarx/utils/holidays";
```

Isso chama `enableHolidays()` / registra o checker em `KlDate`.

Sem o import, `isHoliday` e `skipHolidays` lançam erro explicando a necessidade do módulo.

```typescript
import { KlDate, isHoliday } from "@koalarx/utils/KlDate";
import "@koalarx/utils/holidays";

isHoliday(new KlDate("2020-01-01"), "BR"); // true
new KlDate("2020-11-03").sub(1, "days", {
  skipHolidays: { country: "BR" },
  skipDays: [/* KlDateDayEnum.saturday, sunday */],
});
```

<a id="operators"></a>
## Operators
Import: `@koalarx/utils/operators`

Entradas que devolvem `Kl*` para continuar com `.`. **Sem `pipe()`.**

<a id="operators-string"></a>
### String

| Operator | Retorno |
|----------|---------|
| `maskCpf(value)` | `KlString` |
| `maskCnpj(value)` | `KlString` |
| `clear(value, delimiter?)` | `KlString` |
| `toCamelCase(value)` | `KlString` |
| `unmaskCoin(value, decimalCount?)` | `KlNumber` |
| `onlyNumbers(value)` | `KlString` |
| `nbl2br(value)` | `KlString` |
| `toBase64(value)` | `KlString` |
| `normalizeAndRemoveSpecialChars(value)` | `KlString` |
| `removeSpaces(value, delimiter?)` | `KlString` |
| `unmaskCpf(value)` / `unmaskCnpj(value)` | `KlString` |
| `concatenate(value, ...parts)` | `KlString` |
| `concatenateToStart(value, prefix)` | `KlString` |
| `string(value)` | `KlString` |
| `validateCpf(value)` / `validateCnpj(value)` | `boolean` (terminal) |

<a id="operators-number"></a>
### Number

| Operator | Retorno |
|----------|---------|
| `maskCoin(value, options?)` | `string` (terminal) |
| `number(value)` | `KlNumber` |

<a id="operators-date"></a>
### Date

| Operator | Retorno |
|----------|---------|
| `format(value, mask?)` | `KlString` — permite `.split("/")` |
| `date(value?)` | `KlDate` |
| `add(value, qty, type, options?)` | `KlDate` |
| `sub(value, qty, type, options?)` | `KlDate` |
| `changeTimeZone(value, tz)` | `KlDate` |
| `toUTC(value)` | `KlDate` |
| `diff(value, other, type)` | `number` |
| `isHoliday(value, country?)` | `boolean` |

<a id="operators-time"></a>
### Time

| Operator | Retorno |
|----------|---------|
| `time(hoursOrDate?, minutes?, seconds?, ms?)` | `KlTime` |
| `formatTime(value, mask?)` | `KlString` |
| `addTime` / `subTime` | `KlTime` |
| `changeTimeZoneTime` / `toUTCTime` | `KlTime` |
| `diffTime` | `number` |

<a id="operators-array"></a>
### Array

| Operator | Retorno |
|----------|---------|
| `split(value, separator, limit?)` | `KlArray` (a partir de string) |
| `array(value?)` | `KlArray` |
| `clearEmptyValues(arr)` | `KlArray` |
| `splitArray(arr, size)` | `KlArray` (chunks) |
| `orderBy(arr, by, direction?)` | `KlArray` |
| `shuffle(arr)` | `KlArray` |

<a id="operators-exemplos"></a>
### Exemplos

```typescript
import {
  format,
  maskCpf,
  clear,
  split,
  add,
  maskCoin,
} from "@koalarx/utils/operators";

format(new Date("2023-10-01"), "dd/MM/yyyy").split("/");
maskCpf("12345678909").onlyNumbers().toString();
clear("Olá Mundo").toCamelCase().toString();
split("a,,b,c", ",").clearEmptyValues();
format(add(new Date("2023-10-01"), 1, "days"), "dd/MM/yyyy").toString();
maskCoin(1000); // "R$ 1.000,00"
```

<a id="prototypes"></a>
## Prototypes

<a id="ativacao"></a>
### Ativação

```typescript
import "@koalarx/utils/prototypes";
// ou
import "@koalarx/utils/prototypes/string";
import "@koalarx/utils/prototypes/number";
import "@koalarx/utils/prototypes/date";
import "@koalarx/utils/prototypes/array";
```

Side-effect: altera protótipos nativos. Um import no `main` vale para todo o processo JS daquele realm.

<a id="stringprototype"></a>
### String.prototype
Retornos primitivos para encadear no próprio `String`:

`normalizeAndRemoveSpecialChars()`, `removeSpaces(delimiter?)`, `clear(delimiter?)`, `toCamelCase()`, `unmaskCoin(decimalCount?)` → `number`, `maskCpf()`, `maskCnpj()`, `validateCpf()`, `validateCnpj()`, `onlyNumbers()`, `nbl2br()`, `toBase64()`, `concatenate(...parts)`, `concatenateToStart(prefix)`.

<a id="numberprototype"></a>
### Number.prototype
`maskCoin(prefix?, thousands?, decimal?, decimalCount?)` → `string`

<a id="dateprototype"></a>
### Date.prototype
Semântica **KlDate**: `format`, `changeTimeZone`, `toUTC`, `add`, `sub`, `diff`, `isHoliday`.  
`add`/`sub` no prototype operam sobre uma cópia `KlDate` derivada do `Date` (o retorno é a data ajustada).

<a id="arrayprototype"></a>
### Array.prototype
`clearEmptyValues()`, `split(maxRows)` (chunk — **não** é o `split` de string), `orderBy(by, direction?)`, `shuffle()`.

Encadeamento típico string → array:

```typescript
"a,,b,c".split(",").clearEmptyValues(); // ["a","b","c"]
```

Aqui `split` é o **nativo** de `String`; `clearEmptyValues` é o patch de `Array`.

<a id="cuidados"></a>
### Cuidados
- Colisão possível com outras libs que também patcham protótipos.
- Bundle de frontend: prefira operators.
- SSR / workers / testes: importe no entry de cada ambiente.
- TypeScript: após o import, os tipos globais passam a incluir os métodos.

<a id="tipos-e-enums"></a>
## Tipos e enums

| Símbolo | Onde | Valores / uso |
|---------|------|----------------|
| `KlTimeTimeType` | core | `"seconds" \| "minutes" \| "hours"` |
| `KlDateDateType` | core | time + `"days" \| "months" \| "years"` |
| `KlDateDayEnum` | core | `sunday` … `saturday` (0–6) |
| `KlDateCountry` | core | códigos ISO de país (ex.: `"BR"`) |
| `KlDateTimeZone` | core | timezones IANA (ex.: `"America/Sao_Paulo"`) |

Importe via o módulo que os reexporta (ex.: tipos usados nas assinaturas de `KlDate`) ou caminhos internos do pacote publicado sob `core/types` / `core/enums` quando necessário.

<a id="para-llms-assistentes-de-codigo"></a>
## Para LLMs / assistentes de código
Documentação **completa e autocontida** para colar no contexto do LLM:

- Repositório: [docs/llms.md](docs/llms.md)
- Pacote instalado: `node_modules/@koalarx/utils/docs/llms.md`

**Como usar:** abra `docs/llms.md`, copie o arquivo inteiro e cole (ou anexe) na conversa com o assistente. Peça explicitamente para seguir só essa API e não inventar métodos.

Sugestão de prompt curto:

> Use apenas a API do `@koalarx/utils` descrita no arquivo `llms.md` que colei. Prefira operators no frontend e prototypes no backend. Não invente métodos nem use `pipe()`.

<a id="migracao-500"></a>
## Migração 5.0.0
Breaking / mudanças desta major:

1. **Remoção de `@koalarx/utils/light`** — use `@koalarx/utils` ou `@koalarx/utils/KlDate`.
2. **Feriados opt-in** — `date-holidays` deixou de ser dependência direta; use `import "@koalarx/utils/holidays"`.
3. **Encadeamento tipado** — `KlArray.map` / `filter` / etc. e `KlString.split` retornam `KlArray`.
4. **Operators e prototypes** — novos subpaths `@koalarx/utils/operators` e `@koalarx/utils/prototypes` (e granulares).
5. **Layout interno** — código em `core/`; imports públicos `Kl*` / `holidays` permanecem.
6. **Doc para LLMs** — `docs/llms.md` publicada no pacote.

<a id="contribuicao"></a>
## Contribuição
Contribuições são bem-vindas. Abra uma issue ou pull request em [github.com/igordrangel/koala-utils](https://github.com/igordrangel/koala-utils).

<!-- nav-footer -->
[↑ Topo](#navegacao-rapida) · [Índice](#indice)

<a id="licenca"></a>
## Licença
MIT © [Igor D. Rangel](https://github.com/igordrangel)
