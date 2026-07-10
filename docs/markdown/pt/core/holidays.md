---
title: Feriados
slug: holidays
category: core
docKey: core/holidays
order: 6
description: Opt-in de date-holidays para isHoliday e skipHolidays.
---

# Feriados

1. `npm install date-holidays`
2. `import '@koalarx/utils/holidays'` no bootstrap

Sem o import, `isHoliday` / `skipHolidays` lançam erro.

```ts
import { KlDate, isHoliday } from '@koalarx/utils/KlDate';
import '@koalarx/utils/holidays';

isHoliday(new KlDate('2020-01-01'), 'BR');
```
