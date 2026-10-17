import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
  });
}

const values = ["value1", "value2", "value3"] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale as Locale, [
          { name: tNav("home"), path: "/" },
          { name: t("eyebrow"), path: "/about" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        imageKey="balloonDecor"
      />

      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl">{t("approachHeading")}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg text-navy-300">{t("approachBody")}</p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl text-navy">{t("servicesHeading")}</h2>
            <p className="mt-4 text-navy-300">{t("servicesBody")}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy">{t("areasHeading")}</h2>
            <p className="mt-4 text-navy-300">{t("areasBody")}</p>
          </div>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="values-heading">
        <h2 id="values-heading" className="font-display text-3xl">
          {t("valuesHeading")}
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <li key={value} className="border-t border-gold/50 pt-6">
              <h3 className="font-display text-xl text-navy">{t(`${value}Title`)}</h3>
              <p className="mt-3 text-sm text-navy-300">{t(`${value}Body`)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
