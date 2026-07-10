// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { collectTocItems, extractCodeText, findCopyCodeButton } from './doc-ui';

describe('collectTocItems', () => {
  it('extrai headings h2/h3 com id', () => {
    document.body.innerHTML = `
      <article>
        <h2 class="scroll-hash-link" id="setup">Setup</h2>
        <h3 class="scroll-hash-link" id="env">Environment</h3>
        <h2 id="ignored">Ignored</h2>
      </article>
    `;

    expect(collectTocItems(document.body)).toEqual([
      { label: 'Setup', fragment: 'setup' },
      { label: 'Environment', fragment: 'env' },
    ]);
  });
});

describe('markdown copy helpers', () => {
  it('localiza botão e texto do bloco de código', () => {
    document.body.innerHTML = `
      <div class="code-block">
        <button data-copy-code><i class="fa-regular fa-clipboard"></i></button>
        <pre><code>const x = 1;</code></pre>
      </div>
    `;

    const button = document.querySelector('button')!;
    expect(findCopyCodeButton(button)).toBe(button);
    expect(extractCodeText(button)).toBe('const x = 1;');
  });
});
