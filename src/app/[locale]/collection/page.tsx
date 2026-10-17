import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { catalogue } from "@/content/catalogue";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import CatalogueBrowser from "@/components/catalogue/CatalogueBrowser";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.collection" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/collection",
    title: t("title"),
    description: t("description"),
  });
}

export default async function CollectionPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("collection");
  const tNav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale as Locale, [
          { name: tNav("home"), path: "/" },
          { name: t("eyebrow"), path: "/collection" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        lead={t("lead")}
      />
      <Section tone="white" aria-labelledby="collection-browse-heading">
        <h2
          id="collection-browse-heading"
          className="font-display text-2xl text-navy sm:text-3xl"
        >
          {t("browseHeading")}
        </h2>
        <div className="mt-8">
          <CatalogueBrowser items={catalogue} />
        </div>
      </Section>
    </>
  );
}
