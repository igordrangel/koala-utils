import type { Locale } from "../models/locale.types";
import { isDocsUrl, isLandingUrl, parseLocaleFromUrl } from "./locale-url";

export const DEFAULT_DOCS_ROUTE_BY_LOCALE: Record<Locale, string> = {
  pt: "/pt/docs/inicio/instalacao",
  en: "/en/docs/getting-started/installation",
};

export function swapLocaleInPath(path: string, target: Locale): string {
  const parts = path.split("/").filter(Boolean);

  if (parts.length === 0) {
    return `/${target}`;
  }

  if (parts[0] === "pt" || parts[0] === "en") {
    parts[0] = target;
  } else {
    parts.unshift(target);
  }

  return `/${parts.join("/")}`;
}

export function resolveLocaleSwitchPath(
  path: string,
  target: Locale,
  alternateRouteByCurrentPath: Record<string, string>,
): string {
  const cleanPath = path.split("?")[0].split("#")[0];

  if (isLandingUrl(cleanPath)) {
    return `/${target}`;
  }

  if (isDocsUrl(cleanPath)) {
    const alternateRoute = alternateRouteByCurrentPath[cleanPath];
    if (alternateRoute) {
      return alternateRoute;
    }
  }

  return swapLocaleInPath(cleanPath, target);
}

export function buildAlternateRouteIndex(
  docs: Array<{ route: string; alternateRoute?: string }>,
): Record<string, string> {
  const index: Record<string, string> = {};

  for (const doc of docs) {
    if (doc.alternateRoute) {
      index[doc.route] = doc.alternateRoute;
    }
  }

  return index;
}

export function parseDocsRoute(
  path: string,
): { locale: Locale; category: string; slug: string } | null {
  const cleanPath = path.split("?")[0].split("#")[0];
  if (!isDocsUrl(cleanPath)) return null;

  const parts = cleanPath.split("/").filter(Boolean);
  const locale = parseLocaleFromUrl(cleanPath);

  return {
    locale,
    category: parts[2] ?? "",
    slug: parts[3] ?? "",
  };
}
