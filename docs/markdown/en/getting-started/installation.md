---
title: Installation
slug: installation
category: getting-started
docKey: inicio/instalacao
order: 0
description: Install the package and the optional holidays peer.
---

# Installation

```bash
npm install @koalarx/utils
# or
bun add @koalarx/utils
```

## Holidays (optional)

```bash
npm install date-holidays
```

```ts
import '@koalarx/utils/holidays';
```

## Subpaths

| Import | Contents |
|--------|----------|
| `@koalarx/utils` | Core barrel |
| `@koalarx/utils/KlString` (and other `Kl*`) | Core module |
| `@koalarx/utils/holidays` | Holidays (side-effect) |
| `@koalarx/utils/operators` | Fluent operators |
| `@koalarx/utils/prototypes` | All prototypes |
| `@koalarx/utils/prototypes/string` | String only |
| `@koalarx/utils/prototypes/number` | Number only |
| `@koalarx/utils/prototypes/date` | Date only |
| `@koalarx/utils/prototypes/array` | Array only |
