import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { getArea, serviceAreas } from "@/content/areas";
import { getFeaturedItems } from "@/content/catalogue";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import ItemGrid from "@/components/sections/ItemGrid";
import CtaBand from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: string; area: string }> };

export function generateStaticParams() {
  return serviceAreas
    .filter((area) => area.hasPage)
    .map((area) => ({ area: area.id }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, area: areaId } = await params;
  const area = getArea(areaId);
  if (!area) return {};
  const t = await getTranslations({ locale, namespace: "areas" });
  return buildMetadata({
    locale: locale as Locale,
    path: `/service-areas/${area.id}`,
    title: `${t("heading")} — ${area.name}`,
    description: area.blurb,
  });
}

export default async function AreaPage({ params }: Props) {
  const { locale, area: areaId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const area = getArea(areaId);
  if (!area || !area.hasPage) notFound();

  const t = await getTranslations("areas");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const items = getFeaturedItems();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale as Locale, [
            { name: tNav("home"), path: "/" },
            { name: t("heading"), path: "/service-areas" },
            { name: area.name, path: `/service-areas/${area.id}` },
          ]),
          serviceJsonLd({
            locale: locale as Locale,
            path: `/service-areas/${area.id}`,
            name: `${t("heading")} — ${area.name}`,
            description: area.blurb,
          }),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={area.name}
        lead={area.blurb}
        secondary={false}
      />

      <Section tone="white" aria-labelledby="area-items-heading">
        <h2 id="area-items-heading" className="font-display text-3xl">
          {t("itemsHeading")}
        </h2>
        <p className="mt-3 max-w-2xl border-l-2 border-gold pl-5 text-sm text-navy-300">
          {tCommon("areaConfirmNote")}
        </p>
        <div className="mt-10">
          <ItemGrid items={items} />
        </div>
        <div className="mt-8">
          <Link
            href="/service-areas"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-navy underline decoration-gold decoration-2 underline-offset-4"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {t("backToAreas")}
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
