---
title: Visão geral
slug: visao-geral
category: intro
docKey: intro/visao-geral
order: 0
description: O que é o @koalarx/utils e quando usar.
---

# Visão geral

`@koalarx/utils` é a biblioteca utilitária do ecossistema Koala para TypeScript/JavaScript: máscaras (CPF/CNPJ/moeda), datas/horários, arrays, delays e cronômetros.

## Quatro formas de uso

| Forma | Import | Ideal para |
|-------|--------|------------|
| **Classe** | `@koalarx/utils/KlString` | Encadeamento explícito |
| **Função core** | mesmo módulo | Tree-shaking pontual (retorno primitivo) |
| **Operators** | `@koalarx/utils/operators` | **Frontend** — fluente com `.` |
| **Prototypes** | `@koalarx/utils/prototypes` | **Backend** — DX global no `main` |

Não existe `pipe()`. Em operators, comece na função: `format(date).split('/')`.

## Engines

- Node `>=20.18.0`
- Bun `>=1.2.0`
- Dependências: `date-fns`, `validation-br`
- Peer opcional: `date-holidays` (feriados; não é `dependency` para não inflar quem não usa)
