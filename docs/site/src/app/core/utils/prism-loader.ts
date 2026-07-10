let prismPromise: Promise<void> | null = null;

export function ensurePrismLoaded() {
  if (typeof window !== 'undefined' && 'Prism' in window) {
    return Promise.resolve();
  }

  prismPromise ??= (async () => {
    await import('prismjs');
    await import('prismjs/components/prism-bash');
    await import('prismjs/components/prism-typescript');
    await import('prismjs/components/prism-json');
    await import('prismjs/components/prism-markup');
  })();

  return prismPromise;
}

export function highlightCodeBlocks(root: ParentNode) {
  if (typeof window === 'undefined') {
    return;
  }

  const prism = (window as Window & { Prism?: { highlightElement: (element: HTMLElement) => void } })
    .Prism;
  if (!prism) return;

  root.querySelectorAll('pre code').forEach((block) => {
    prism.highlightElement(block as HTMLElement);
  });
}
