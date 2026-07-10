---
title: KlDate
slug: kl-date
category: core
docKey: core/kl-date
order: 2
description: Formatting, time zones, add/sub, and opt-in holidays.
---

# KlDate

```ts
import { KlDate, isHoliday } from '@koalarx/utils/KlDate';
import '@koalarx/utils/holidays'; // if you use holidays
```

Extends `Date`. Masks via **date-fns**.

| Method | Notes |
|--------|-------|
| `format(mask?)` | Default `dd/MM/yyyy HH:mm:ss` |
| `changeTimeZone(tz)` | New instance |
| `toUTC()` | New instance |
| `add` / `sub` | **Mutate** `this` |
| `diff(date, type)` | Absolute difference |
| `isHoliday(country?)` | Requires holidays |

`type`: `seconds | minutes | hours | days | months | years`.

`add`/`sub` options: `skipHolidays?: { country }`, `skipDays?: KlDateDayEnum[]`.
