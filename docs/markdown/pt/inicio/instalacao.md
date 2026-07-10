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

`date-holidays` é uma **peer dependency opcional**, não uma dependência direta do pacote.

Assim, quem não usa feriados não instala (nem carrega) essa lib — ela traz dados de vários países e aumentaria o tamanho para todo mundo. Quem precisa:

1. Instala o peer no próprio projeto
2. Importa o side-effect `@koalarx/utils/holidays` no bootstrap

```bash
npm install date-holidays
```

```ts
import '@koalarx/utils/holidays';
```

Sem o import, `isHoliday` / `skipHolidays` lançam erro de propósito (opt-in explícito).

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
