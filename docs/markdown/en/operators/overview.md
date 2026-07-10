---
title: Operators — overview
slug: overview
category: operators
docKey: operators/visao-geral
order: 0
description: Tree-shakeable fluent entry points for the frontend.
---

# Operators — overview

Import: `@koalarx/utils/operators`

Start from the function and chain with `.`. Return type is usually `Kl*` (not a primitive).

```ts
import { format, maskCpf, clear, split } from '@koalarx/utils/operators';

format(new Date('2023-10-01'), 'dd/MM/yyyy').split('/');
maskCpf('12345678909').onlyNumbers();
clear('Hello World').toCamelCase().toString();
split('a,,b,c', ',').clearEmptyValues();
```

**Note:** `maskCpf` from `KlString` returns `string`; from `operators` it returns `KlString`.
