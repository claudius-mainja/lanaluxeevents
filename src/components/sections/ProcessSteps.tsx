import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";

export default async function ProcessSteps() {
  const t = await getTranslations("home.process");
  const steps = [1, 2, 3, 4] as const;

  return (
    <Section tone="white" aria-labelledby="process-heading">
      <div className="max-w-2xl">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 id="process-heading" className="mt-4 font-display text-3xl sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-4 text-navy-300">{t("lead")}</p>
      </div>

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step} className="border-t-2 border-gold/60 pt-5">
            <span className="text-2xs font-semibold uppercase tracking-[0.2em] text-navy-300">
              {t("stepWord")} {step}
            </span>
            <h3 className="mt-3 font-display text-xl text-navy">
              {t(`step${step}Title`)}
            </h3>
            <p className="mt-3 text-sm text-navy-300">{t(`step${step}Body`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
