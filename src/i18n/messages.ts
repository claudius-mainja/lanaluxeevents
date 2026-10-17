import type { Locale } from "./routing";

type MessageTree = { [key: string]: string | MessageTree };

/**
 * Deep-merges a translated dictionary over the English base so that any
 * untranslated string falls back to English rather than rendering empty.
 * Translation review status is tracked in src/content/languages.ts.
 */
function deepMerge(base: MessageTree, override: MessageTree): MessageTree {
  const result: MessageTree = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key];
    if (
      typeof value === "object" &&
      value !== null &&
      typeof baseValue === "object" &&
      baseValue !== null
    ) {
      result[key] = deepMerge(baseValue, value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

export async function loadMessages(locale: Locale): Promise<MessageTree> {
  const english = (await import("../messages/en.json")).default as MessageTree;
  if (locale === "en") return english;

  try {
    const translated = (await import(`../messages/${locale}.json`))
      .default as MessageTree;
    return deepMerge(english, translated);
  } catch {
    return english;
  }
}
