# @koalarx/utils — documentação completa para LLMs

**Instrução ao assistente:** este arquivo é a fonte da verdade da API. Não invente métodos, parâmetros ou imports. Se algo não estiver listado aqui, não existe (ou não deve ser usado). Prefira exemplos canônicos abaixo.

---

## 1. Pacote

| Campo | Valor |
|-------|--------|
| Nome npm | `@koalarx/utils` |
| Versão alvo desta doc | `5.0.0` |
| Node | `>=20.18.0` |
| Bun | `>=1.2.0` |
| Dependências | `date-fns`, `validation-br` |
| Peer opcional | `date-holidays` — **somente** com `import "@koalarx/utils/holidays"` |

Layout interno publicado: `core/`, `operators/`, `prototypes/`, `docs/llms.md`.

---

## 2. Escolha da API (obrigatório)

| Contexto | Usar | Import |
|----------|------|--------|
| Frontend (bundle) | **operators** ou funções/classes core | `@koalarx/utils/operators` ou `@koalarx/utils/Kl*` |
| Backend (Nest/Node) com DX global | **prototypes** no `main` | `@koalarx/utils/prototypes` |
| Encadeamento explícito sem side-effect | **classes** `Kl*` | `@koalarx/utils/KlString` etc. |
| Um shot sem fluent | **funções core** (primitivo) | mesmo módulo `Kl*` |

### Regras rígidas

1. **Não existe `pipe()`.** Operators começam na função: `format(date, mask).split("/")`.
2. **Mesmo nome, retorno diferente:**
   - `import { maskCpf } from "@koalarx/utils/KlString"` → `string`
   - `import { maskCpf } from "@koalarx/utils/operators"` → `KlString`
3. **Não** misturar assumptions de Angular pipes / RxJS operators — esta lib não tem isso.
4. **Feriados:** nunca chamar `isHoliday` / `skipHolidays` sem `import "@koalarx/utils/holidays"` e peer instalado.
5. Na classe existe `contatenate` (typo histórico). Em operators/prototypes o nome é `concatenate`.
6. Prototypes = side-effect global; **não tree-shakeable**. Evitar no frontend.
7. SSR / Web Worker / processo de teste = realms separados → cada um precisa do import de prototypes/holidays se for usar.

---

## 3. Imports válidos

```ts
// Barrel core
import { KlString, KlDate, maskCpf, delay } from "@koalarx/utils";

// Subpaths core
import { KlString, maskCpf } from "@koalarx/utils/KlString";
import { KlNumber, maskCoin, randomNumber } from "@koalarx/utils/KlNumber";
import { KlDate, isHoliday, registerHolidayChecker } from "@koalarx/utils/KlDate";
import { KlTime } from "@koalarx/utils/KlTime";
import { KlArray } from "@koalarx/utils/KlArray";
import { delay } from "@koalarx/utils/KlDelay";
import { KlCron } from "@koalarx/utils/KlCron";

// Holidays (side-effect)
import "@koalarx/utils/holidays";

// Operators (fluente)
import { format, maskCpf, clear, split, add } from "@koalarx/utils/operators";

// Prototypes (side-effect)
import "@koalarx/utils/prototypes";
import "@koalarx/utils/prototypes/string";
import "@koalarx/utils/prototypes/number";
import "@koalarx/utils/prototypes/date";
import "@koalarx/utils/prototypes/array";
```

**Inválido / removido:** `@koalarx/utils/light`.

---

## 4. Tipos compartilhados

```ts
type KlTimeTimeType = "seconds" | "minutes" | "hours";
type KlDateDateType = KlTimeTimeType | "days" | "months" | "years";

enum KlDateDayEnum {
  sunday, monday, tuesday, wednesday, thursday, friday, saturday, // 0..6
}

// KlDateCountry: códigos ISO de país (ex. "BR", "US", ...)
// KlDateTimeZone: IANA (ex. "America/Sao_Paulo", "UTC", ...)

type KlDateOptions = {
  skipHolidays?: { country: KlDateCountry };
  skipDays?: KlDateDayEnum[];
};
```

Máscaras de data/hora: tokens **date-fns** (`dd`, `MM`, `yyyy`, `HH`, `mm`, `ss`, …).

---

## 5. Core — KlString

### Classe

`class KlString extends String`

Overrides nativos retornando `KlString` (ou `KlArray` no `split`):  
`split`, `replace`, `replaceAll`, `trim`, `trimStart`, `trimEnd`, `toLowerCase`, `toUpperCase`, `slice`, `substring`, `concat`, `normalize`.

| Método | Params | Returns |
|--------|--------|---------|
| `normalizeAndRemoveSpecialChars()` | — | `KlString` |
| `removeSpaces(delimiter = "")` | string | `KlString` |
| `clear(delimiter = " ")` | string | `KlString` |
| `toCamelCase()` | — | `KlString` |
| `unmaskCoin(decimalCount = 2)` | number | `KlNumber` |
| `maskCpf()` | — | `KlString` (`000.000.000-00`) |
| `maskCnpj()` | — | `KlString` (`00.000.000/0000-00`) |
| `validateCpf()` | — | `boolean` |
| `validateCnpj()` | — | `boolean` |
| `onlyNumbers()` | — | `KlString` |
| `nbl2br()` | — | `KlString` |
| `toBase64()` | — | `KlString` (usa `Buffer`) |
| `contatenate(...parts)` | `string[]` | `KlString` |
| `concatenateToStart(prefix)` | string | `KlString` |
| `random(length, options)` | ver abaixo | `KlString` |
| `split(separator, limit?)` | `string \| RegExp` | `KlArray<string>` |

```ts
type KlStringRandomOptions = {
  numbers?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  specialCharacters?: boolean;
};
```

### Funções primitivas (mesmo arquivo)

| Função | Returns |
|--------|---------|
| `maskCpf(value: string)` | `string` |
| `maskCnpj(value: string)` | `string` |
| `clear(value, delimiter?)` | `string` |
| `toCamelCase(value)` | `string` |
| `unmaskCoin(value, decimalCount?)` | `number` |
| `unmaskCpf(value)` / `unmaskCnpj(value)` | `KlString` (só dígitos) |
| `nbl2br(value)` | `string` |
| `validateCpf(value)` / `validateCnpj(value)` | `boolean` |
| `randomString(length, options?)` | `string` (default options: lower+upper) |

---

## 6. Core — KlNumber

`class KlNumber extends Number`

| API | Assinatura | Returns |
|-----|------------|---------|
| `maskCoin` (instância) | `(prefix="R$", thousands=".", decimal=",", decimalCount=2)` | `string` |
| `random` (instância) | `(min, max)` | `KlNumber` — throw se `min > max` |
| `toNumber()` | — | `number` |
| `maskCoin` (função) | `(value, { prefix, thousands, decimal, decimalCount }?)` | `string` |
| `randomNumber` | `(min=0, max=99999999999?)` | `number` |

---

## 7. Core — KlDate

`class KlDate extends Date`

| Método | Assinatura | Returns | Mutação |
|--------|------------|---------|---------|
| `format` | `(mask?: string)` default `"dd/MM/yyyy HH:mm:ss"` | `string` | não |
| `changeTimeZone` | `(timeZone: KlDateTimeZone)` | `KlDate` | nova instância |
| `toUTC` | `()` | `KlDate` | nova |
| `add` | `(qty, type: KlDateDateType, options?: KlDateOptions)` | `this` | **sim** |
| `sub` | idem | `this` | **sim** |
| `diff` | `(date: Date, type: KlDateDateType)` | `number` | não |
| `isHoliday` | `(country: KlDateCountry = "BR")` | `boolean` | exige holidays |

Funções:

- `isHoliday(date: KlDate | Date, country?)` → `boolean`
- `registerHolidayChecker(checker?)` — uso avançado; preferir `@koalarx/utils/holidays`

---

## 8. Core — KlTime

`class KlTime extends Date`

Construtores:

- `new KlTime()`
- `new KlTime(value: Date)`
- `new KlTime(hours?, minutes?, seconds?, ms?)`

| Método | Unidades | Default format |
|--------|----------|----------------|
| `format(mask?)` | — | `"HH:mm:ss"` |
| `changeTimeZone(tz)` | — | `KlTime` |
| `toUTC()` | — | `KlTime` |
| `add` / `sub` | `KlTimeTimeType` only | mutam `this` |
| `diff(date, type)` | `KlTimeTimeType` | `number` |

---

## 9. Core — KlArray

`class KlArray<T> extends Array<T>`

Overrides retornando `KlArray`: `map`, `filter`, `slice`, `flatMap`, `concat`.

| Método | Assinatura | Returns | Mutação |
|--------|------------|---------|---------|
| `clearEmptyValues()` | — | `KlArray<NonNullable<T>>` | nova |
| `split(maxRowsSplit)` | number | `KlArray<KlArray<T>>` | nova |
| `orderBy(by, direction="asc")` | property name | `this` | **in-place** |
| `shuffle()` | — | `this` | **in-place** (≠ original) |

---

## 10. Core — KlDelay / KlCron

```ts
delay(ms: number): Promise<unknown>; // resolve após ms

class KlCron {
  start(): this;
  end(): this;
  duration(): number; // segundos; throw se não start/end
}
```

---

## 11. Holidays

```ts
import "@koalarx/utils/holidays"; // side-effect → enableHolidays()
```

Também exporta `enableHolidays()` do módulo holidays.

Sem isso: `isHoliday` / `skipHolidays` → `Error` pedindo o import e o peer `date-holidays`.

---

## 12. Operators — catálogo completo

Import: `from "@koalarx/utils/operators"`

### 12.1 String → em geral `KlString`

| Função | Returns |
|--------|---------|
| `string(value)` | `KlString` |
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
| `validateCpf(value)` / `validateCnpj(value)` | `boolean` |

### 12.2 Number

| Função | Returns |
|--------|---------|
| `number(value)` | `KlNumber` |
| `maskCoin(value, options?)` | `string` |

### 12.3 Date

| Função | Returns |
|--------|---------|
| `format(value: Date\|string\|number, mask?)` | `KlString` |
| `date(value?)` | `KlDate` |
| `add(value, qty, type, options?)` | `KlDate` |
| `sub(value, qty, type, options?)` | `KlDate` |
| `changeTimeZone(value, tz)` | `KlDate` |
| `toUTC(value)` | `KlDate` |
| `diff(value, other, type)` | `number` |
| `isHoliday(value, country?)` | `boolean` |

### 12.4 Time

| Função | Returns |
|--------|---------|
| `time(hoursOrDate?, minutes?, seconds?, ms?)` | `KlTime` |
| `formatTime(value, mask?)` | `KlString` |
| `addTime(value, qty, type)` | `KlTime` |
| `subTime(value, qty, type)` | `KlTime` |
| `changeTimeZoneTime(value, tz)` | `KlTime` |
| `toUTCTime(value)` | `KlTime` |
| `diffTime(value, other, type)` | `number` |

`type` em time operators: apenas `KlTimeTimeType`.

### 12.5 Array

| Função | Returns |
|--------|---------|
| `split(value: string, separator, limit?)` | `KlArray<string>` |
| `array<T>(value?)` | `KlArray<T>` |
| `clearEmptyValues<T>(value)` | `KlArray` |
| `splitArray<T>(value, maxRows)` | `KlArray` (chunks) |
| `orderBy<T>(value, by, direction?)` | `KlArray` |
| `shuffle<T>(value)` | `KlArray` |

### 12.6 Exemplos operators (copie estes padrões)

```ts
import { format, maskCpf, clear, split, add, maskCoin } from "@koalarx/utils/operators";

format(new Date("2023-10-01T00:00:00"), "dd/MM/yyyy").split("/");
// KlArray ["01","10","2023"]

maskCpf("9964085842").toString(); // "099.640.858-42"
maskCpf("099.640.858-42").onlyNumbers().toString();

clear("Olá Mundo").toCamelCase().toString(); // "olaMundo"
split("a,,b,c", ",").clearEmptyValues(); // KlArray sem vazios

format(add(new Date("2023-10-01"), 1, "days"), "dd/MM/yyyy").toString(); // "02/10/2023"
maskCoin(1000); // "R$ 1.000,00"
```

---

## 13. Prototypes — catálogo completo

Após `import "@koalarx/utils/prototypes"` (ou subpath granular):

### String.prototype → primitivos

| Método | Returns |
|--------|---------|
| `normalizeAndRemoveSpecialChars()` | `string` |
| `removeSpaces(delimiter?)` | `string` |
| `clear(delimiter?)` | `string` |
| `toCamelCase()` | `string` |
| `unmaskCoin(decimalCount?)` | `number` |
| `maskCpf()` / `maskCnpj()` | `string` |
| `validateCpf()` / `validateCnpj()` | `boolean` |
| `onlyNumbers()` / `nbl2br()` / `toBase64()` | `string` |
| `concatenate(...parts)` / `concatenateToStart(prefix)` | `string` |

### Number.prototype

| Método | Returns |
|--------|---------|
| `maskCoin(prefix?, thousands?, decimal?, decimalCount?)` | `string` |

### Date.prototype (semântica KlDate)

| Método | Returns |
|--------|---------|
| `format(mask?)` | `string` |
| `changeTimeZone(tz)` | `Date` (`KlDate`) |
| `toUTC()` | `Date` |
| `add(qty, type, options?)` | `Date` |
| `sub(qty, type, options?)` | `Date` |
| `diff(date, type)` | `number \| undefined` |
| `isHoliday(country?)` | `boolean` |

### Array.prototype

| Método | Returns | Nota |
|--------|---------|------|
| `clearEmptyValues()` | `T[]` | |
| `split(maxRowsSplit)` | `T[][]` | **chunk**; não confundir com `String#split` |
| `orderBy(by, direction?)` | `T[]` | |
| `shuffle()` | `T[]` | |

```ts
import "@koalarx/utils/prototypes";

"9964085842".maskCpf();
"Olá Mundo".clear().toCamelCase();
"a,,b,c".split(",").clearEmptyValues(); // String#split nativo + Array#clearEmptyValues
(1000).maskCoin();
new Date("2023-10-01").format("dd/MM/yyyy");
[1, 2, 3, 4].split(2); // [[1,2],[3,4]] — Array.prototype.split (chunk)
```

---

## 14. Anti-padrões (não faça)

```ts
// ERRADO — pipe não existe
pipe(value, maskCpf, clear);

// ERRADO — light removido
import { KlDate } from "@koalarx/utils/light";

// ERRADO — feriado sem opt-in
new KlDate().isHoliday(); // Error sem holidays

// ERRADO — assumir que função core retorna KlString
import { maskCpf } from "@koalarx/utils/KlString";
maskCpf("123").onlyNumbers(); // falha: string não tem onlyNumbers

// CERTO
import { maskCpf } from "@koalarx/utils/operators";
maskCpf("123").onlyNumbers();
```

---

## 15. Migração relevante (5.0.0)

- Sem `@koalarx/utils/light`
- Holidays opt-in + peer `date-holidays`
- `KlString.split` / `KlArray.map|filter|…` → `KlArray`
- Novos: `operators`, `prototypes`, `docs/llms.md`
- Subpaths `Kl*` / `holidays` estáveis (arquivos em `core/`)

---

## 16. Checklist rápido para o assistente

Ao gerar código com esta lib:

1. [ ] Escolhi operators (FE) ou prototypes (BE) ou core conforme o contexto?
2. [ ] Importei do subpath certo (retorno primitivo vs `Kl*`)?
3. [ ] Não usei `pipe()` nem APIs inventadas?
4. [ ] Se usei feriado, incluí `import "@koalarx/utils/holidays"`?
5. [ ] Encadeamento `.` só em `Kl*` (operators/classes) ou em prototypes após o side-effect?
6. [ ] Lembrei que `add`/`sub` em `KlDate`/`KlTime` mutam a instância?
