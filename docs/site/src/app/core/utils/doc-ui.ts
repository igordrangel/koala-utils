export function shouldOpenSearchDialog(event: KeyboardEvent): boolean {
  return (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
}

export function shouldCloseSearchDialog(event: KeyboardEvent): boolean {
  return event.key === 'Escape';
}

export interface TocItem {
  label: string;
  fragment: string;
}

export function collectTocItems(root: ParentNode): TocItem[] {
  const links = root.querySelectorAll('h2.scroll-hash-link, h3.scroll-hash-link');
  const items: TocItem[] = [];

  links.forEach((link) => {
    const heading = link as HTMLElement;
    const label = heading.textContent?.trim();
    const fragment = heading.id;
    if (label && fragment) {
      items.push({ label, fragment });
    }
  });

  return items;
}

export function findCopyCodeButton(target: EventTarget | null): HTMLButtonElement | null {
  if (!(target instanceof HTMLElement)) return null;
  return target.closest<HTMLButtonElement>('[data-copy-code]');
}

export function extractCodeText(button: HTMLButtonElement): string | null {
  const code = button.closest('.code-block')?.querySelector('code');
  const text = code?.textContent?.trim();
  return text || null;
}
