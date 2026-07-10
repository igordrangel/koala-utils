// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import {
  collectTocItems,
  extractCodeText,
  findCopyCodeButton,
  shouldCloseSearchDialog,
  shouldOpenSearchDialog,
} from './doc-ui';

describe('shouldOpenSearchDialog', () => {
  it('detecta Ctrl+K e Cmd+K', () => {
    expect(
      shouldOpenSearchDialog(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })),
    ).toBe(true);
    expect(
      shouldOpenSearchDialog(new KeyboardEvent('keydown', { key: 'K', metaKey: true })),
    ).toBe(true);
    expect(shouldOpenSearchDialog(new KeyboardEvent('keydown', { key: 'k' }))).toBe(false);
  });
});

describe('shouldCloseSearchDialog', () => {
  it('detecta Escape', () => {
    expect(shouldCloseSearchDialog(new KeyboardEvent('keydown', { key: 'Escape' }))).toBe(true);
    expect(shouldCloseSearchDialog(new KeyboardEvent('keydown', { key: 'k' }))).toBe(false);
  });
});

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
