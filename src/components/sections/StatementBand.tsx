import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";

export default async function StatementBand() {
  const t = await getTranslations("home.statement");

  return (
    <Section spacing="compact" aria-labelledby="statement-heading">
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow className="justify-center">{t("eyebrow")}</Eyebrow>
        <h2
          id="statement-heading"
          className="mt-6 font-display text-3xl leading-[1.12] text-ink sm:text-4xl lg:text-5xl"
        >
          {t("heading")}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-soft">
          {t("lead")}
        </p>
      </div>
    </Section>
  );
}
