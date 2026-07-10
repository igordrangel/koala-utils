---
title: KlDate
slug: kl-date
category: core
docKey: core/kl-date
order: 2
description: Formatação, fuso, add/sub e feriados opt-in.
---

# KlDate

```ts
import { KlDate, isHoliday } from '@koalarx/utils/KlDate';
import '@koalarx/utils/holidays'; // se usar feriados
```

Estende `Date`. Máscaras via **date-fns**.

| Método | Notas |
|--------|-------|
| `format(mask?)` | Default `dd/MM/yyyy HH:mm:ss` |
| `changeTimeZone(tz)` | Nova instância |
| `toUTC()` | Nova instância |
| `add` / `sub` | **Mutam** `this` |
| `diff(date, type)` | Diferença absoluta |
| `isHoliday(country?)` | Exige holidays |

`type`: `seconds | minutes | hours | days | months | years`.

Options de `add`/`sub`: `skipHolidays?: { country }`, `skipDays?: KlDateDayEnum[]`.
