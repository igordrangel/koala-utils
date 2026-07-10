export const SITE_URL = "https://utils.koalarx.com";
export const SITE_NAME = "@koalarx/utils";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.svg`;

export function absoluteSiteUrl(path: string) {
  if (!path || path === "/") return SITE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
