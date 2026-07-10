---
title: KlDelay and KlCron
slug: kl-delay-cron
category: core
docKey: core/kl-delay-cron
order: 5
description: Async delay and duration measurement.
---

# KlDelay and KlCron

## delay

```ts
import { delay } from '@koalarx/utils/KlDelay';
await delay(1000);
```

## KlCron

```ts
import { KlCron } from '@koalarx/utils/KlCron';
const cron = new KlCron();
cron.start();
// ...
cron.end();
cron.duration(); // seconds
```
