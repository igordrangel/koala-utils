---
title: For LLMs
slug: for-llms
category: guides
docKey: guias/para-llms
order: 0
description: How to feed assistants with this documentation.
---

# For LLMs

## Global index

Copy the index URL (site header **Copy AI** button):

- https://utils.koalarx.com/llms-en.txt

The file lists every topic with links to static `.md` files.

## Per page

On each docs page, use **Copy for AI** to copy that page's Markdown URL, for example:

- https://utils.koalarx.com/markdown/en/core/kl-string.md

## Rules for assistants

1. Do not invent APIs
2. Frontend → operators; backend → prototypes
3. Do not use `pipe()`
4. Holidays require `import '@koalarx/utils/holidays'`
5. The same name in core vs operators may differ in return type (primitive vs `Kl*`)
