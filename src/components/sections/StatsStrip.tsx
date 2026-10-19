import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import CountUp from "@/components/ui/CountUp";
import { catalogue } from "@/content/catalogue";
import { serviceAreas } from "@/content/areas";

export default async function StatsStrip() {
  const t = await getTranslations("home.stats");

  const fromMinor = Math.min(
    ...catalogue.map((item) => item.price.amountMinor ?? Number.POSITIVE_INFINITY),
  );

  const stats = [
    { value: catalogue.length, prefix: "", label: t("options") },
    { value: serviceAreas.length, prefix: "", label: t("areas") },
    { value: Math.round(fromMinor / 100), prefix: "R", label: t("fromLabel") },
  ];

  return (
    <Section spacing="compact" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        {t("heading")}
      </h2>
      <dl className="grid gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-t border-line pt-5 text-center sm:text-left"
          >
            <dt className="text-2xs font-semibold uppercase tracking-[0.2em] text-muted">
              {stat.label}
            </dt>
            <dd className="mt-2 font-display text-4xl text-ink sm:text-5xl">
              <CountUp value={stat.value} prefix={stat.prefix} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-center text-sm text-muted sm:text-left">
        {t("note")}
      </p>
    </Section>
  );
}
