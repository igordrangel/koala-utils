# @koalarx/utils

Biblioteca utilitária TypeScript/JavaScript para máscaras (CPF/CNPJ/moeda), datas, arrays e conversões do ecossistema Koala.

**Documentação:** [utils.koalarx.com](https://utils.koalarx.com/)

## Instalação

```bash
npm install @koalarx/utils
```

## Uso rápido

```ts
// Frontend — operators fluentes
import { format, maskCpf } from "@koalarx/utils/operators";
format(new Date(), "dd/MM/yyyy").split("/");
maskCpf("12345678909").toString();

// Backend — prototypes no main
import "@koalarx/utils/prototypes";
"12345678909".maskCpf();
```

## Para LLMs

No site da documentação:

- **Copy AI** (header) → índice global [`llms.txt`](https://utils.koalarx.com/llms.txt)
- **Copy for AI** (por página) → URL do Markdown daquele tópico

## Links

- Docs: https://utils.koalarx.com
- npm: https://www.npmjs.com/package/@koalarx/utils
- GitHub: https://github.com/igordrangel/koala-utils

## Licença

MIT © [Igor D. Rangel](https://github.com/igordrangel)
