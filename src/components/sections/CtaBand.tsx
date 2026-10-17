import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default async function CtaBand({
  headingKey = "footerCta.heading",
  leadKey = "footerCta.lead",
  namespace = "home",
}: {
  headingKey?: string;
  leadKey?: string;
  namespace?: string;
}) {
  const t = await getTranslations(namespace);
  const tCommon = await getTranslations("common");

  return (
    <Section tone="navy" spacing="compact" aria-labelledby="cta-heading">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <h2 id="cta-heading" className="font-display text-3xl text-cream sm:text-4xl">
            {t(headingKey)}
          </h2>
          <p className="mt-4 text-cream/80">{t(leadKey)}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" variant="book" size="lg">
            {tCommon("getQuote")}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button
            href="/collection"
            size="lg"
            className="border border-cream/40 bg-transparent text-cream transition-colors hover:bg-cream/10"
          >
            {tCommon("browseHire")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
