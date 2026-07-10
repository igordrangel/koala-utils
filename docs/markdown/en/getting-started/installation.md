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

`date-holidays` is an **optional peer dependency**, not a direct dependency of the package.

That way, projects that never use holidays do not install (or load) it — the package ships holiday data for many countries and would inflate size for everyone. If you need holidays:

1. Install the peer in your own project
2. Import the `@koalarx/utils/holidays` side-effect in bootstrap

```bash
npm install date-holidays
```

```ts
import '@koalarx/utils/holidays';
```

Without the import, `isHoliday` / `skipHolidays` throw on purpose (explicit opt-in).

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
