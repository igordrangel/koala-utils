import { DEFAULT_LOCALE, isLocale, type Locale } from "../models/locale.types";

export function parseLocaleFromUrl(url: string): Locale {
  const segment = url.split("?")[0].split("#")[0].split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export function isLandingUrl(url: string) {
  const path = url.split("?")[0].split("#")[0];
  return path === "/pt" || path === "/en";
}

export function isDocsUrl(url: string) {
  const path = url.split("?")[0].split("#")[0];
  return /^\/(pt|en)\/docs(\/|$)/.test(path);
}
