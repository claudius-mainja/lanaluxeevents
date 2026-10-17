import { defineRouting } from "next-intl/routing";

/**
 * All eleven official South African written/spoken languages.
 * English is the default and is served from the root (localePrefix: "as-needed").
 */
export const locales = [
  "en",
  "af",
  "zu",
  "xh",
  "nso",
  "st",
  "tn",
  "ss",
  "ve",
  "ts",
  "nr",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
