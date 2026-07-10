---
title: Catálogo de prototypes
slug: catalogo
category: prototypes
docKey: prototypes/catalogo
order: 1
description: Métodos adicionados aos protótipos nativos.
---

# Catálogo de prototypes

## String.prototype

`normalizeAndRemoveSpecialChars`, `removeSpaces`, `clear`, `toCamelCase`, `unmaskCoin` (→ number), `maskCpf`, `maskCnpj`, `validateCpf`, `validateCnpj`, `onlyNumbers`, `nbl2br`, `toBase64`, `concatenate`, `concatenateToStart`

## Number.prototype

`maskCoin(prefix?, thousands?, decimal?, decimalCount?)`

## Date.prototype

Semântica KlDate: `format`, `changeTimeZone`, `toUTC`, `add`, `sub`, `diff`, `isHoliday`

## Array.prototype

`clearEmptyValues`, `split(maxRows)` (chunk), `orderBy`, `shuffle`

> `String#split` nativo + `Array#clearEmptyValues` permitem `"a,,b".split(',').clearEmptyValues()`.
