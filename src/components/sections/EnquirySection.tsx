import { getTranslations } from "next-intl/server";
import { catalogue } from "@/content/catalogue";
import { getLanguage } from "@/content/languages";
import type { Locale } from "@/i18n/routing";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import QuoteForm, { type SelectableItem } from "@/components/quote/QuoteForm";

/**
 * Homepage enquiry block. Reuses the shared QuoteForm so the enquiry flow and
 * the WhatsApp handoff behave exactly as they do on the contact page.
 */
export default async function EnquirySection({ locale }: { locale: Locale }) {
  const t = await getTranslations("contact");

  const items: SelectableItem[] = catalogue
    .slice()
    .sort((a, b) => a.category.localeCompare(b.category))
    .map((entry) => ({ id: entry.id, name: entry.name, category: entry.category }));

  const localeLabel = getLanguage(locale)?.label ?? "English";

  return (
    <Section
      id="quote"
      aria-labelledby="home-quote-heading"
      tone="navy"
    >
      <div>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="cream" className="justify-center">
            {t("eyebrow")}
          </Eyebrow>
          <h2
            id="home-quote-heading"
            className="mt-4 font-display text-3xl text-cream sm:text-4xl"
          >
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream/80">{t("lead")}</p>
        </div>

        <div className="mt-10 rounded-frame bg-white p-6 shadow-2xl sm:p-10">
          <QuoteForm items={items} initialItemId="" localeLabel={localeLabel} />
        </div>
      </div>
    </Section>
  );
}
