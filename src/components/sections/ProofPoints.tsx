import { getTranslations } from "next-intl/server";
import { CalendarCheck, MessageCircle, ShieldCheck } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";

const icons = [CalendarCheck, MessageCircle, ShieldCheck];

export default async function ProofPoints() {
  const t = await getTranslations("home.proof");
  const points = [1, 2, 3] as const;

  return (
    <Section aria-labelledby="proof-heading" tone="navy">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow tone="cream" className="justify-center">
          {t("eyebrow")}
        </Eyebrow>
        <h2 id="proof-heading" className="mt-4 font-display text-3xl text-cream sm:text-4xl">
          {t("heading")}
        </h2>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {points.map((point, index) => {
          const Icon = icons[index]!;
          return (
            <li
              key={point}
              className="rounded-frame border border-white/15 bg-white/5 p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-deep-pink text-white">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-cream">
                {t(`point${point}Title`)}
              </h3>
              <p className="mt-3 text-sm text-cream/75">{t(`point${point}Body`)}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
