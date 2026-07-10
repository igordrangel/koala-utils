---
title: Holidays
slug: holidays
category: core
docKey: core/holidays
order: 6
description: Opt-in date-holidays for isHoliday and skipHolidays.
---

# Holidays

`date-holidays` is an optional peer: it is not in `@koalarx/utils` `dependencies`, so core-only consumers are not forced to install holiday datasets.

1. `npm install date-holidays` in your project
2. `import '@koalarx/utils/holidays'` in bootstrap

Without the import, `isHoliday` / `skipHolidays` throw.

```ts
import { KlDate, isHoliday } from '@koalarx/utils/KlDate';
import '@koalarx/utils/holidays';

isHoliday(new KlDate('2020-01-01'), 'BR');
```
