import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import Gallery from "@/components/sections/Gallery";
import CtaBand from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.gallery" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/gallery",
    title: t("title"),
    description: t("description"),
  });
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("gallery");
  const tNav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale as Locale, [
          { name: tNav("home"), path: "/" },
          { name: t("eyebrow"), path: "/gallery" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        lead={t("lead")}
      />
      <Section tone="white">
        <Gallery />
      </Section>
      <CtaBand />
    </>
  );
}
