import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import { getFaqsFor, type FaqPage } from "@/content/faqs";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { JsonLd, faqJsonLd } from "@/components/seo/JsonLd";

/**
 * Renders FAQs as an accessible, progressively-enhanced accordion using native
 * <details>/<summary>. No JavaScript is required and the answer text is always
 * present in the rendered document.
 */
export default async function FaqSection({
  page,
  heading,
  eyebrow = "FAQs",
}: {
  page: FaqPage | "all";
  heading?: string;
  eyebrow?: string;
}) {
  const t = await getTranslations("faqs");
  const entries = getFaqsFor(page).map((faq) => ({
    id: faq.id,
    question: t(`items.${faq.id}.q`),
    answer: t(`items.${faq.id}.a`),
  }));

  if (entries.length === 0) return null;

  return (
    <Section tone="cream" aria-labelledby="faq-heading">
      <JsonLd
        data={faqJsonLd(
          entries.map((entry) => ({ question: entry.question, answer: entry.answer })),
        )}
      />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="faq-heading" className="mt-4 font-display text-3xl">
            {heading ?? t("heading")}
          </h2>
          <p className="mt-4 text-sm text-navy-300">{t("lead")}</p>
        </div>

        <ul className="space-y-3">
          {entries.map((entry, index) => (
            <Reveal as="li" key={entry.id} delay={Math.min(index * 55, 330)}>
              <details className="faq-item group overflow-hidden rounded-frame border border-line bg-white transition-colors open:border-transparent open:shadow-[0_30px_70px_-55px_rgba(30,25,94,0.6)]">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg text-navy transition-colors hover:text-deep-pink sm:px-6 [&::-webkit-details-marker]:hidden">
                  {entry.question}
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-deep-pink group-open:text-white">
                    <Plus aria-hidden="true" className="h-4 w-4" />
                  </span>
                </summary>
                <p className="faq-answer px-5 pb-5 pr-12 text-sm leading-relaxed text-navy-300 sm:px-6">
                  {entry.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
