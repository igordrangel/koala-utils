---
title: Catálogo de operators
slug: catalogo
category: operators
docKey: operators/catalogo
order: 1
description: Lista completa de funções operators e retornos.
---

# Catálogo de operators

## String → KlString (exceto booleanos)

`string`, `maskCpf`, `maskCnpj`, `clear`, `toCamelCase`, `onlyNumbers`, `nbl2br`, `toBase64`, `normalizeAndRemoveSpecialChars`, `removeSpaces`, `unmaskCpf`, `unmaskCnpj`, `concatenate`, `concatenateToStart`

- `unmaskCoin` → `KlNumber`
- `validateCpf` / `validateCnpj` → `boolean`

## Number

- `maskCoin(value, options?)` → `string`
- `number(value)` → `KlNumber`

## Date

- `format(value, mask?)` → `KlString`
- `date`, `add`, `sub`, `changeTimeZone`, `toUTC` → `KlDate`
- `diff` → `number`
- `isHoliday` → `boolean`

## Time

`time`, `formatTime`, `addTime`, `subTime`, `changeTimeZoneTime`, `toUTCTime`, `diffTime`

## Array

`split` (string→KlArray), `array`, `clearEmptyValues`, `splitArray`, `orderBy`, `shuffle`
