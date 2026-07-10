---
title: Prototypes — overview
slug: overview
category: prototypes
docKey: prototypes/visao-geral
order: 0
description: Opt-in extensions for String, Number, Date, and Array.
---

# Prototypes — overview

```ts
import '@koalarx/utils/prototypes';
// or granular: prototypes/string | number | date | array
```

Global side-effect. Ideal in Nest `main`. Avoid on the frontend (bundle).

```ts
'9964085842'.maskCpf();
'a,,b'.split(',').clearEmptyValues();
(1000).maskCoin();
new Date('2023-10-01').format('dd/MM/yyyy');
```
