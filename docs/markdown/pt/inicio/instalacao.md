---
title: Instalação
slug: instalacao
category: inicio
docKey: inicio/instalacao
order: 0
description: Instale o pacote e o peer opcional de feriados.
---

# Instalação

```bash
npm install @koalarx/utils
# ou
bun add @koalarx/utils
```

## Feriados (opcional)

```bash
npm install date-holidays
```

```ts
import '@koalarx/utils/holidays';
```

## Subpaths

| Import | Conteúdo |
|--------|----------|
| `@koalarx/utils` | Barrel core |
| `@koalarx/utils/KlString` (e demais `Kl*`) | Módulo core |
| `@koalarx/utils/holidays` | Feriados (side-effect) |
| `@koalarx/utils/operators` | Operators fluentes |
| `@koalarx/utils/prototypes` | Prototypes (todos) |
| `@koalarx/utils/prototypes/string` | Só string |
| `@koalarx/utils/prototypes/number` | Só number |
| `@koalarx/utils/prototypes/date` | Só date |
| `@koalarx/utils/prototypes/array` | Só array |
