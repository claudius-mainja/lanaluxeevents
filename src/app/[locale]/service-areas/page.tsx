import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { serviceAreas } from "@/content/areas";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.areas" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/service-areas",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ServiceAreasPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("areas");
  const tNav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale as Locale, [
          { name: tNav("home"), path: "/" },
          { name: t("eyebrow"), path: "/service-areas" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        lead={t("lead")}
        secondary={false}
      />
      <Section tone="white" aria-labelledby="areas-heading">
        <h2 id="areas-heading" className="font-display text-3xl">
          {t("listHeading")}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) =>
            area.hasPage ? (
              <li key={area.id}>
                <Link
                  href={`/service-areas/${area.id}`}
                  className="flex min-h-24 flex-col justify-between rounded-frame border border-gold/40 bg-canvas-2 p-5 transition-colors hover:border-navy/40"
                >
                  <span className="font-display text-xl text-navy">{area.name}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-navy">
                    {t("itemsHeading")}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ) : (
              <li
                key={area.id}
                className="flex min-h-24 flex-col justify-between rounded-frame border border-gold/30 bg-canvas-2 p-5"
              >
                <span className="font-display text-xl text-navy">{area.name}</span>
                <span className="mt-2 text-sm text-navy-300">{area.blurb}</span>
              </li>
            ),
          )}
        </ul>
      </Section>

      <Section tone="cream">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl text-navy">{t("notListedTitle")}</h2>
          <p className="mt-3 text-navy-300">{t("notListedBody")}</p>
        </div>
        <div className="mt-8 max-w-2xl border-t border-gold/40 pt-6">
          <h3 className="font-display text-xl text-navy">{t("deliveryHeading")}</h3>
          <p className="mt-2 text-sm text-navy-300">{t("deliveryBody")}</p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
