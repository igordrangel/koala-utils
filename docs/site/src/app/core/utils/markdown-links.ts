function resolveRelativeLink(
  target: string,
  currentCategory: string,
  locale: string,
): string {
  if (target.startsWith('http://') || target.startsWith('https://')) {
    return target;
  }

  if (target.startsWith('/') && !target.includes('.md')) {
    return target;
  }

  const [pathPart, anchor] = target.split('#');
  const anchorSuffix = anchor ? `#${anchor}` : '';

  if (pathPart.startsWith('../')) {
    const parts = pathPart.split('/');
    const file = parts.pop()!.replace(/\.md$/, '');
    const parent = parts[parts.length - 1];
    return `/${locale}/docs/${parent}/${file}${anchorSuffix}`;
  }

  const clean = pathPart.replace(/^\.\//, '').replace(/\.md$/, '');
  return `/${locale}/docs/${currentCategory}/${clean}${anchorSuffix}`;
}

function isInternalDocLink(href: string) {
  return (
    href.endsWith('.md') ||
    href.includes('.md#') ||
    href.startsWith('./') ||
    href.startsWith('../')
  );
}

export function transformMarkdownLinks(
  content: string,
  currentCategory: string,
  locale: string,
): string {
  return content
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
      if (!isInternalDocLink(href)) {
        return match;
      }
      const route = resolveRelativeLink(href, currentCategory, locale);
      return `[${label}](${route})`;
    })
    .replace(/^# .+\n\n/, '');
}
