---
title: Para LLMs
slug: para-llms
category: guias
docKey: guias/para-llms
order: 0
description: Como alimentar assistentes com a documentação.
---

# Para LLMs

## Índice global

Copie a URL do índice (botão **Copy AI** no header do site):

- https://utils.koalarx.com/llms.txt

O arquivo lista todos os tópicos com links para os `.md` estáticos.

## Por página

Em cada página da doc, use **Copy for AI** para copiar a URL do Markdown daquela página, por exemplo:

- https://utils.koalarx.com/markdown/pt/core/kl-string.md

## Regras para o assistente

1. Não inventar APIs
2. Frontend → operators; backend → prototypes
3. Não usar `pipe()`
4. Feriados exigem `import '@koalarx/utils/holidays'`
5. Mesmo nome em core vs operators pode diferir no retorno (primitivo vs `Kl*`)
