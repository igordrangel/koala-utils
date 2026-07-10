---
title: Operators — visão geral
slug: visao-geral
category: operators
docKey: operators/visao-geral
order: 0
description: Entradas fluentes tree-shakeable para o frontend.
---

# Operators — visão geral

Import: `@koalarx/utils/operators`

Comece na função e encadeie com `.`. Retorno em geral é `Kl*` (não primitivo).

```ts
import { format, maskCpf, clear, split } from '@koalarx/utils/operators';

format(new Date('2023-10-01'), 'dd/MM/yyyy').split('/');
maskCpf('12345678909').onlyNumbers();
clear('Olá Mundo').toCamelCase().toString();
split('a,,b,c', ',').clearEmptyValues();
```

**Atenção:** `maskCpf` em `KlString` retorna `string`; em `operators` retorna `KlString`.
