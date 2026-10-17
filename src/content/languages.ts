import type { Locale } from "@/i18n/routing";

export interface LanguageMeta {
  code: Locale;
  label: string;
  englishLabel: string;
  /** Translation review status. Only "reviewed" locales are indexed. */
  status: "reviewed" | "draft";
}

/**
 * Language labels use endonyms (the language's own name for itself),
 * as recommended for accessible language selectors. Country flags are not used.
 */
export const languages: LanguageMeta[] = [
  { code: "en", label: "English", englishLabel: "English", status: "reviewed" },
  { code: "af", label: "Afrikaans", englishLabel: "Afrikaans", status: "draft" },
  { code: "zu", label: "isiZulu", englishLabel: "Zulu", status: "draft" },
  { code: "xh", label: "isiXhosa", englishLabel: "Xhosa", status: "draft" },
  { code: "nso", label: "Sepedi", englishLabel: "Northern Sotho", status: "draft" },
  { code: "st", label: "Sesotho", englishLabel: "Southern Sotho", status: "draft" },
  { code: "tn", label: "Setswana", englishLabel: "Tswana", status: "draft" },
  { code: "ss", label: "siSwati", englishLabel: "Swati", status: "draft" },
  { code: "ve", label: "Tshivenda", englishLabel: "Venda", status: "draft" },
  { code: "ts", label: "Xitsonga", englishLabel: "Tsonga", status: "draft" },
  { code: "nr", label: "isiNdebele", englishLabel: "Southern Ndebele", status: "draft" },
];

export const reviewedLocales: Locale[] = languages
  .filter((l) => l.status === "reviewed")
  .map((l) => l.code);

export function getLanguage(code: string): LanguageMeta | undefined {
  return languages.find((l) => l.code === code);
}
