---
title: KlString
slug: kl-string
category: core
docKey: core/kl-string
order: 0
description: Máscaras CPF/CNPJ, camelCase, moeda, Base64 e split fluente.
---

# KlString

```ts
import { KlString, maskCpf, toCamelCase, clear } from '@koalarx/utils/KlString';
```

Estende `String`. Transformações retornam `KlString` (ou `KlNumber` / `KlArray` / `boolean`).

## Métodos principais

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `normalizeAndRemoveSpecialChars()` | `KlString` | Remove acentos |
| `removeSpaces(delimiter?)` | `KlString` | Troca espaços |
| `clear(delimiter?)` | `KlString` | Limpa especiais |
| `toCamelCase()` | `KlString` | camelCase |
| `unmaskCoin(decimalCount?)` | `KlNumber` | Moeda → número |
| `maskCpf()` / `maskCnpj()` | `KlString` | Máscaras BR |
| `validateCpf()` / `validateCnpj()` | `boolean` | Validação |
| `onlyNumbers()` | `KlString` | Só dígitos |
| `nbl2br()` | `KlString` | Quebras → `<br/>` |
| `toBase64()` | `KlString` | Base64 |
| `contatenate(...parts)` | `KlString` | Typo histórico no nome |
| `concatenateToStart(prefix)` | `KlString` | Prefixo |
| `split(separator, limit?)` | `KlArray` | Split fluente |

## Funções primitivas

`maskCpf`, `maskCnpj`, `clear`, `toCamelCase`, `unmaskCoin` (number), `nbl2br`, `validateCpf`, `validateCnpj`, `randomString` retornam primitivos (exceto `unmaskCpf`/`unmaskCnpj` → `KlString`).

```ts
maskCpf('9964085842'); // '099.640.858-42'
new KlString('a,,b').split(',').clearEmptyValues();
```
