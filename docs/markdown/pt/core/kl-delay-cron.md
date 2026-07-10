---
title: KlDelay e KlCron
slug: kl-delay-cron
category: core
docKey: core/kl-delay-cron
order: 5
description: delay assíncrono e medição de duração.
---

# KlDelay e KlCron

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
cron.duration(); // segundos
```
