---
title: KlNumber
slug: kl-number
category: core
docKey: core/kl-number
order: 1
description: Currency formatting and random numbers.
---

# KlNumber

```ts
import { KlNumber, maskCoin, randomNumber } from '@koalarx/utils/KlNumber';
```

| API | Returns |
|-----|---------|
| `new KlNumber(n).maskCoin(prefix?, thousands?, decimal?, decimalCount?)` | `string` |
| `new KlNumber().random(min, max)` | `KlNumber` |
| `maskCoin(value, options?)` | `string` |
| `randomNumber(min?, max?)` | `number` |

Currency defaults: `R$`, `.` thousands, `,` decimal, 2 places.

```ts
maskCoin(1000); // 'R$ 1.000,00'
```
