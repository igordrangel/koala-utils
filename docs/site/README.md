# Docs site — @koalarx/utils

Site Angular da documentação (padrão Koala Nest).

## Comandos (na raiz do monorepo)

```bash
bun run doc:manifest   # gera manifest + llms.txt + public/markdown
bun run dev:docs       # serve local
bun run build:docs     # build estático para GitHub Pages
bun run preview:docs   # preview do dist
```

## Conteúdo

Edite Markdown em `docs/markdown/pt/{categoria}/*.md` com frontmatter (`title`, `slug`, `category`, `docKey`, `order`, `description`).

## AI

- Índice: `/llms.txt`
- Páginas: `/markdown/pt/.../*.md`
- Copy AI (header) e Copy for AI (página) copiam essas URLs

## Deploy

Workflow `.github/workflows/deploy-docs.yml` → GitHub Pages.  
CNAME: `utils.koalarx.com`
