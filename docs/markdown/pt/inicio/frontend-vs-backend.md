---
title: Frontend vs backend
slug: frontend-vs-backend
category: inicio
docKey: inicio/frontend-vs-backend
order: 1
description: Quando usar operators, prototypes ou funções core.
---

# Frontend vs backend

## Frontend

Prefira **operators** ou funções/classes core (tree-shakeable).

```ts
import { format, maskCpf, split } from '@koalarx/utils/operators';

format(new Date('2023-10-01'), 'dd/MM/yyyy').split('/');
maskCpf(user.cpf).toString();
split(csvLine, ',').clearEmptyValues();
```

Evite `import '@koalarx/utils/prototypes'` no bundle do browser.

## Backend

**Prototypes** no `main` dão DX global:

```ts
import '@koalarx/utils/prototypes';

cpf.maskCpf();
valor.maskCoin();
```

Cada realm (processo, worker, SSR, testes) precisa do import no entry.
