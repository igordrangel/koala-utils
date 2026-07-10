---
title: Overview
slug: overview
category: intro
docKey: intro/visao-geral
order: 0
description: What @koalarx/utils is and when to use it.
---

# Overview

`@koalarx/utils` is the Koala ecosystem utility library for TypeScript/JavaScript: masks (CPF/CNPJ/currency), dates/times, arrays, delays, and timers.

## Four ways to use it

| Style | Import | Best for |
|-------|--------|----------|
| **Class** | `@koalarx/utils/KlString` | Explicit chaining |
| **Core function** | same module | Tree-shaking (primitive return) |
| **Operators** | `@koalarx/utils/operators` | **Frontend** — fluent `.` |
| **Prototypes** | `@koalarx/utils/prototypes` | **Backend** — global DX in `main` |

There is no `pipe()`. With operators, start from the function: `format(date).split('/')`.

## Engines

- Node `>=20.18.0`
- Bun `>=1.2.0`
- Dependencies: `date-fns`, `validation-br`
- Optional peer: `date-holidays` (holidays)
