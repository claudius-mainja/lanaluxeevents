import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { getItemsByCategory } from "@/content/catalogue";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import IntroSection from "@/components/sections/IntroSection";
import PackageTiers, { type PackageTier } from "@/components/catalogue/PackageTiers";
import FaqSection from "@/components/sections/FaqSection";
import CtaBand from "@/components/sections/CtaBand";
import Section from "@/components/ui/Section";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.packages" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/party-hire-packages",
    title: t("title"),
    description: t("description"),
  });
}

function childrenFromId(id: string): number {
  const match = /-(\d+)$/.exec(id);
  return match ? Number(match[1]) : 0;
}

export default async function PackagesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("packages");
  const tNav = await getTranslations("nav");
  const items = getItemsByCategory("packages");
  const tiers: PackageTier[] = items
    .map((item) => ({ item, children: childrenFromId(item.id) }))
    .sort((a, b) => a.children - b.children);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale as Locale, [
            { name: tNav("home"), path: "/" },
            { name: t("eyebrow"), path: "/party-hire-packages" },
          ]),
          itemListJsonLd({
            locale: locale as Locale,
            path: "/party-hire-packages",
            items: tiers.map((tier) => ({
              name: tier.item.name,
              price: tier.item.price,
            })),
          }),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        imageKey="kidsCombo"
      />
      <IntroSection namespace="packages" headingKey="introHeading" />
      <Section tone="white">
        <PackageTiers tiers={tiers} />
      </Section>
      <FaqSection page="packages" heading={t("tierHeading")} />
      <CtaBand />
    </>
  );
}
