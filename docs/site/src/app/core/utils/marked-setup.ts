import { Renderer } from 'marked';

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inferLanguage(code: string, declared?: string | null) {
  if (declared && declared !== 'text') return declared;

  const trimmed = code.trim();
  if (/^(npm |bun |npx |pnpm |cd |git |curl |kl-nest)/m.test(trimmed)) return 'bash';
  if (/^[A-Z_]+=/.test(trimmed) || trimmed.includes('DATABASE_URL')) return 'bash';
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json';
  if (/^(import |export |const |class |interface |type |async )/m.test(trimmed)) {
    return 'typescript';
  }
  return declared || 'text';
}

function codeIcon(language: string) {
  switch (language) {
    case 'bash':
    case 'sh':
    case 'shell':
      return 'fa-solid fa-terminal p-1 text-[0.5rem]';
    case 'typescript':
    case 'ts':
      return 'fa-solid fa-code p-1 text-[0.5rem]';
    case 'json':
      return 'fa-regular fa-file-code p-1 text-[0.5rem]';
    default:
      return 'fa-solid fa-code p-1 text-[0.5rem]';
  }
}

function codeLabel(language: string) {
  switch (language) {
    case 'bash':
    case 'sh':
    case 'shell':
      return 'bash';
    case 'typescript':
    case 'ts':
      return 'typescript';
    case 'json':
      return 'json';
    default:
      return language;
  }
}

export function createDocsMarkedRenderer(): Renderer {
  const renderer = new Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plain = tokens
      .filter((token) => 'text' in token)
      .map((token) => (token as { text: string }).text)
      .join('');
    const id = slugify(plain);

    if (depth < 2) {
      return `<h${depth}>${text}</h${depth}>\n`;
    }

    const headingClass =
      depth === 2
        ? 'relative text-3xl font-bold scroll-mt-40 scroll-hash-link'
        : 'relative text-xl font-semibold scroll-mt-40 scroll-hash-link';

    return `<h${depth} id="${id}" class="${headingClass}">${text}</h${depth}>\n`;
  };

  renderer.code = function ({ text, lang }) {
    const language = inferLanguage(text, lang);
    const label = codeLabel(language);
    const icon = codeIcon(language);
    const escaped = escapeHtml(text.replace(/\n$/, ''));

    return `<div class="code-block relative rounded-xl bg-neutral-900 border border-base-300 overflow-hidden my-6">
  <div class="flex items-center justify-between px-3 py-2 border-b border-base-300/80">
    <span class="flex min-w-0 items-center gap-2 text-sm text-neutral-500">
      <i class="bg-neutral-400 text-neutral-950 rounded-sm ${icon}"></i>
      <span class="truncate">${label}</span>
    </span>
    <button
      type="button"
      data-copy-code
      class="code-copy-btn hover:cursor-pointer ml-2 shrink-0 px-2 text-md text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 rounded-sm"
      aria-label="Copiar código"
    >
      <i class="fa-regular fa-clipboard"></i>
    </button>
  </div>
  <pre class="language-${language} !m-0 !rounded-none !border-0 !bg-transparent"><code class="language-${language}">${escaped}</code></pre>
</div>`;
  };

  renderer.blockquote = function ({ tokens }) {
    const body = this.parser.parse(tokens).trim();
    const content = body.replace(/^<p>([\s\S]*)<\/p>$/m, '$1');

    return `<div role="alert" class="alert alert-warning alert-dash mt-2">
  <i class="fa-solid fa-circle-info"></i>
  <span>${content}</span>
</div>\n`;
  };

  return renderer;
}
