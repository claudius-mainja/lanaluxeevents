import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/sections/CtaBand";
import CookieSettingsButton from "@/components/cookies/CookieSettingsButton";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cookies" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/cookies",
    title: t("title"),
    description: t("description"),
  });
}

const sections = [
  { h: "essentialHeading", b: "essentialBody" },
  { h: "analyticsHeading", b: "analyticsBody" },
  { h: "choicesHeading", b: "choicesBody" },
  { h: "contactHeading", b: "contactBody" },
] as const;

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("cookies");
  const tNav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale as Locale, [
          { name: tNav("home"), path: "/" },
          { name: t("eyebrow"), path: "/cookies" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        lead={t("lead")}
        secondary={false}
      />
      <Section tone="white">
        <div className="max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.h}>
              <h2 className="font-display text-2xl text-navy">{t(section.h)}</h2>
              <p className="mt-3 text-navy-300">{t(section.b)}</p>
            </div>
          ))}
          <p className="border-t border-gold/40 pt-6 text-sm text-navy-300">
            {t("policyNote")}
          </p>
          <p>
            <CookieSettingsButton className="cursor-pointer text-sm font-medium text-navy underline decoration-deep-pink decoration-2 underline-offset-4 transition-colors hover:text-deep-pink" />
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
