---
title: KlNumber
slug: kl-number
category: core
docKey: core/kl-number
order: 1
description: Formatação monetária e números aleatórios.
---

# KlNumber

```ts
import { KlNumber, maskCoin, randomNumber } from '@koalarx/utils/KlNumber';
```

| API | Retorno |
|-----|---------|
| `new KlNumber(n).maskCoin(prefix?, thousands?, decimal?, decimalCount?)` | `string` |
| `new KlNumber().random(min, max)` | `KlNumber` |
| `maskCoin(value, options?)` | `string` |
| `randomNumber(min?, max?)` | `number` |

Defaults de moeda: `R$`, `.` milhar, `,` decimal, 2 casas.

```ts
maskCoin(1000); // 'R$ 1.000,00'
```
