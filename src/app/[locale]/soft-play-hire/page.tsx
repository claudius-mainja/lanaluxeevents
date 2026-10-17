import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { getItemsByCategory } from "@/content/catalogue";
import {
  JsonLd,
  breadcrumbJsonLd,
  serviceJsonLd,
} from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import IntroSection from "@/components/sections/IntroSection";
import ServiceItems from "@/components/sections/ServiceItems";
import RelatedItems from "@/components/sections/RelatedItems";
import FaqSection from "@/components/sections/FaqSection";
import CtaBand from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.softPlay" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/soft-play-hire",
    title: t("title"),
    description: t("description"),
  });
}

export default async function SoftPlayPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("softPlay");
  const tNav = await getTranslations("nav");
  const item = getItemsByCategory("soft-play")[0];
  const related = item ? item.related : [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale as Locale, [
            { name: tNav("home"), path: "/" },
            { name: t("eyebrow"), path: "/soft-play-hire" },
          ]),
          serviceJsonLd({
            locale: locale as Locale,
            path: "/soft-play-hire",
            name: t("heroTitle"),
            description: t("intro"),
            price: item?.price,
          }),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        imageKey="hero"
      />
      <IntroSection namespace="softPlay" noteKey="spaceNote" tone="blush" />
      <ServiceItems category="soft-play" namespace="softPlay" />
      <RelatedItems ids={related} />
      <FaqSection page="soft-play" heading={t("faqHeading")} />
      <CtaBand />
    </>
  );
}
