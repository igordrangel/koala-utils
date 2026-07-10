export type Locale = "pt";

export const SUPPORTED_LOCALES: Locale[] = ["pt"];

export const DEFAULT_LOCALE: Locale = "pt";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "pt";
}
