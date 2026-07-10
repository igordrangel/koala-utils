---
title: KlTime
slug: kl-time
category: core
docKey: core/kl-time
order: 3
description: Manipulação de horários com format/add/sub.
---

# KlTime

```ts
import { KlTime } from '@koalarx/utils/KlTime';
```

Construtores: `new KlTime()`, `new KlTime(date)`, `new KlTime(hours?, minutes?, seconds?, ms?)`.

| Método | Unidades |
|--------|----------|
| `format(mask?)` | Default `HH:mm:ss` |
| `add` / `sub` | `seconds | minutes | hours` (mutam) |
| `changeTimeZone` / `toUTC` | Retornam `KlTime` |
| `diff` | number |

```ts
new KlTime(13).format(); // '13:00:00'
```
