---
title: KlArray
slug: kl-array
category: core
docKey: core/kl-array
order: 4
description: Typed clearEmptyValues, split, orderBy, and shuffle.
---

# KlArray

```ts
import { KlArray } from '@koalarx/utils/KlArray';
```

`map` / `filter` / `slice` / `flatMap` / `concat` return `KlArray`.

| Method | Behavior |
|--------|----------|
| `clearEmptyValues()` | Remove falsy (new instance) |
| `split(maxRows)` | Chunks (new) |
| `orderBy(by, direction?)` | In-place |
| `shuffle()` | In-place (≠ original) |
