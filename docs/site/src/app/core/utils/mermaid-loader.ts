declare global {
  interface Window {
    mermaid?: typeof import('mermaid').default;
  }
}

let mermaidPromise: Promise<void> | null = null;

export function contentHasMermaid(content: string) {
  return /```mermaid[\s\S]*?```/i.test(content);
}

export function ensureMermaidLoaded() {
  if (typeof window.mermaid?.initialize === 'function') {
    return Promise.resolve();
  }

  mermaidPromise ??= import('mermaid').then((module) => {
    const mermaid = module.default;
    window.mermaid = mermaid;
    (globalThis as typeof globalThis & { mermaid: typeof mermaid }).mermaid = mermaid;
  });

  return mermaidPromise;
}
