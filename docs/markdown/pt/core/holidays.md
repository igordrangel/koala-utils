---
title: Feriados
slug: holidays
category: core
docKey: core/holidays
order: 6
description: Opt-in de date-holidays para isHoliday e skipHolidays.
---

# Feriados

`date-holidays` é peer opcional: não vem em `dependencies` do `@koalarx/utils`, para não obrigar quem só usa o core a instalar dados de feriados.

1. `npm install date-holidays` no seu projeto
2. `import '@koalarx/utils/holidays'` no bootstrap

Sem o import, `isHoliday` / `skipHolidays` lançam erro.

```ts
import { KlDate, isHoliday } from '@koalarx/utils/KlDate';
import '@koalarx/utils/holidays';

isHoliday(new KlDate('2020-01-01'), 'BR');
```
