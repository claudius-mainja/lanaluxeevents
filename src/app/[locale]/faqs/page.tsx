import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import FaqSection from "@/components/sections/FaqSection";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.faqs" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/faqs",
    title: t("title"),
    description: t("description"),
  });
}

export default async function FaqsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("faqs");
  const tNav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale as Locale, [
          { name: tNav("home"), path: "/" },
          { name: t("eyebrow"), path: "/faqs" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("heading")} lead={t("lead")} secondary={false} />
      <FaqSection page="all" />
      <Section tone="white" spacing="compact">
        <div className="rounded-frame border border-gold/40 bg-canvas-2 p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl text-navy sm:text-3xl">{t("ctaHeading")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-300">{t("ctaBody")}</p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" size="lg">
              {tNav("contact")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
