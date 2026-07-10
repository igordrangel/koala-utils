---
title: KlTime
slug: kl-time
category: core
docKey: core/kl-time
order: 3
description: Time-of-day helpers with format/add/sub.
---

# KlTime

```ts
import { KlTime } from '@koalarx/utils/KlTime';
```

Constructors: `new KlTime()`, `new KlTime(date)`, `new KlTime(hours?, minutes?, seconds?, ms?)`.

| Method | Units |
|--------|-------|
| `format(mask?)` | Default `HH:mm:ss` |
| `add` / `sub` | `seconds | minutes | hours` (mutate) |
| `changeTimeZone` / `toUTC` | Return `KlTime` |
| `diff` | number |

```ts
new KlTime(13).format(); // '13:00:00'
```
