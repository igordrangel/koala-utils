---
title: Prototypes — visão geral
slug: visao-geral
category: prototypes
docKey: prototypes/visao-geral
order: 0
description: Extensão opt-in de String, Number, Date e Array.
---

# Prototypes — visão geral

```ts
import '@koalarx/utils/prototypes';
// ou granulares: prototypes/string | number | date | array
```

Side-effect global. Ideal no `main` Nest. Evite no frontend (bundle).

```ts
'9964085842'.maskCpf();
'a,,b'.split(',').clearEmptyValues();
(1000).maskCoin();
new Date('2023-10-01').format('dd/MM/yyyy');
```
