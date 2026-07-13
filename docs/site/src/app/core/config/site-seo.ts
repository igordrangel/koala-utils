export const SITE_URL = "https://utils.koalarx.com";
export const SITE_NAME = "@koalarx/utils";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.svg`;

/**
 * Absolute URL for the docs site.
 * Page paths get a trailing slash (GitHub Pages serves dirs as `/en/`, not `/en`).
 * File paths (e.g. `.md`, `.txt`) keep their exact path.
 */
export function absoluteSiteUrl(path: string) {
  if (!path || path === "/") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (/\.[a-z0-9]+$/i.test(normalized)) {
    return `${SITE_URL}${normalized}`;
  }
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${SITE_URL}${withSlash}`;
}
