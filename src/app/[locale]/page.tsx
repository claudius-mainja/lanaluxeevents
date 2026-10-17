import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import HeroCollage from "@/components/sections/HeroCollage";
import PhotoMarquee from "@/components/sections/PhotoMarquee";
import StatementBand from "@/components/sections/StatementBand";
import CategoryGrid from "@/components/sections/CategoryGrid";
import SetupShowcase from "@/components/sections/SetupShowcase";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ProofPoints from "@/components/sections/ProofPoints";
import ServiceEntrances from "@/components/sections/ServiceEntrances";
import CoverageAreas from "@/components/sections/CoverageAreas";
import FaqSection from "@/components/sections/FaqSection";
import EventServicesIntro from "@/components/sections/EventServicesIntro";
import EnquirySection from "@/components/sections/EnquirySection";
import Reveal from "@/components/ui/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <JsonLd data={[organizationJsonLd(locale as Locale), websiteJsonLd(locale as Locale)]} />

      <HeroCollage />
      <PhotoMarquee />

      <Reveal>
        <StatementBand />
      </Reveal>

      <Reveal>
        <CategoryGrid />
      </Reveal>

      <Reveal>
        <SetupShowcase />
      </Reveal>

      <Reveal>
        <ProcessSteps />
      </Reveal>

      <Reveal>
        <ProofPoints />
      </Reveal>

      <Reveal>
        <ServiceEntrances />
      </Reveal>

      <Reveal>
        <CoverageAreas />
      </Reveal>

      <FaqSection page="general" />

      <Reveal>
        <EventServicesIntro />
      </Reveal>

      <EnquirySection locale={locale as Locale} />
    </>
  );
}
