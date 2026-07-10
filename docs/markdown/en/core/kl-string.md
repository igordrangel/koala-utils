---
title: KlString
slug: kl-string
category: core
docKey: core/kl-string
order: 0
description: CPF/CNPJ masks, camelCase, currency, Base64, and fluent split.
---

# KlString

```ts
import { KlString, maskCpf, toCamelCase, clear } from '@koalarx/utils/KlString';
```

Extends `String`. Transforms return `KlString` (or `KlNumber` / `KlArray` / `boolean`).

## Main methods

| Method | Returns | Description |
|--------|---------|-------------|
| `normalizeAndRemoveSpecialChars()` | `KlString` | Strip accents |
| `removeSpaces(delimiter?)` | `KlString` | Replace spaces |
| `clear(delimiter?)` | `KlString` | Clean special chars |
| `toCamelCase()` | `KlString` | camelCase |
| `unmaskCoin(decimalCount?)` | `KlNumber` | Currency → number |
| `maskCpf()` / `maskCnpj()` | `KlString` | BR masks |
| `validateCpf()` / `validateCnpj()` | `boolean` | Validation |
| `onlyNumbers()` | `KlString` | Digits only |
| `nbl2br()` | `KlString` | Newlines → `<br/>` |
| `toBase64()` | `KlString` | Base64 |
| `contatenate(...parts)` | `KlString` | Historical typo in the name |
| `concatenateToStart(prefix)` | `KlString` | Prefix |
| `split(separator, limit?)` | `KlArray` | Fluent split |

## Primitive helpers

`maskCpf`, `maskCnpj`, `clear`, `toCamelCase`, `unmaskCoin` (number), `nbl2br`, `validateCpf`, `validateCnpj`, `randomString` return primitives (except `unmaskCpf`/`unmaskCnpj` → `KlString`).

```ts
maskCpf('9964085842'); // '099.640.858-42'
new KlString('a,,b').split(',').clearEmptyValues();
```
