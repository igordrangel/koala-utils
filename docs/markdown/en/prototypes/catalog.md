---
title: Prototypes catalog
slug: catalog
category: prototypes
docKey: prototypes/catalogo
order: 1
description: Methods added to native prototypes.
---

# Prototypes catalog

## String.prototype

`normalizeAndRemoveSpecialChars`, `removeSpaces`, `clear`, `toCamelCase`, `unmaskCoin` (→ number), `maskCpf`, `maskCnpj`, `validateCpf`, `validateCnpj`, `onlyNumbers`, `nbl2br`, `toBase64`, `concatenate`, `concatenateToStart`

## Number.prototype

`maskCoin(prefix?, thousands?, decimal?, decimalCount?)`

## Date.prototype

KlDate semantics: `format`, `changeTimeZone`, `toUTC`, `add`, `sub`, `diff`, `isHoliday`

## Array.prototype

`clearEmptyValues`, `split(maxRows)` (chunk), `orderBy`, `shuffle`

> Native `String#split` + `Array#clearEmptyValues` enable `"a,,b".split(',').clearEmptyValues()`.
