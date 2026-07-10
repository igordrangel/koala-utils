---
title: Frontend vs backend
slug: frontend-vs-backend
category: getting-started
docKey: inicio/frontend-vs-backend
order: 1
description: When to use operators, prototypes, or core functions.
---

# Frontend vs backend

## Frontend

Prefer **operators** or core functions/classes (tree-shakeable).

```ts
import { format, maskCpf, split } from '@koalarx/utils/operators';

format(new Date('2023-10-01'), 'dd/MM/yyyy').split('/');
maskCpf(user.cpf).toString();
split(csvLine, ',').clearEmptyValues();
```

Avoid `import '@koalarx/utils/prototypes'` in the browser bundle.

## Backend

**Prototypes** in `main` give global DX:

```ts
import '@koalarx/utils/prototypes';

cpf.maskCpf();
valor.maskCoin();
```

Each realm (process, worker, SSR, tests) needs the import on its entry.
