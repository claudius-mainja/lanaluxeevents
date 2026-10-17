import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";

export default async function IntroSection({
  namespace,
  noteKey,
  eyebrowKey = "eyebrow",
  headingKey,
  tone = "cream",
}: {
  namespace: string;
  noteKey?: string;
  eyebrowKey?: string;
  headingKey?: string;
  tone?: "default" | "cream" | "white" | "blush" | "lavender" | "aqua";
}) {
  const t = await getTranslations(namespace);

  return (
    <Section tone={tone} aria-labelledby="intro-heading">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>{t(eyebrowKey)}</Eyebrow>
          <h2 id="intro-heading" className="mt-4 font-display text-3xl sm:text-4xl">
            {headingKey ? t(headingKey) : t("introHeading")}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg text-navy-300">{t("intro")}</p>
          {noteKey ? (
            <p className="mt-5 border-l-2 border-gold pl-5 text-sm text-navy-300">
              {t(noteKey)}
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
