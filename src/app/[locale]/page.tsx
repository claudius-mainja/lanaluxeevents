import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import HeroCollage from "@/components/sections/HeroCollage";
import PhotoMarquee from "@/components/sections/PhotoMarquee";
import StatementBand from "@/components/sections/StatementBand";
import CategoryGrid from "@/components/sections/CategoryGrid";
import StatsStrip from "@/components/sections/StatsStrip";
import SetupShowcase from "@/components/sections/SetupShowcase";
import PackagesPreview from "@/components/sections/PackagesPreview";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ProofPoints from "@/components/sections/ProofPoints";
import CoverageAreas from "@/components/sections/CoverageAreas";
import FaqSection from "@/components/sections/FaqSection";
import EventServicesIntro from "@/components/sections/EventServicesIntro";
import EnquirySection from "@/components/sections/EnquirySection";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import GiftCard from "@/components/catalogue/GiftCard";
import { featuredGifts } from "@/content/gifts";

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

      <CategoryGrid />

      <Reveal>
        <StatsStrip />
      </Reveal>

      <Reveal>
        <SetupShowcase />
      </Reveal>

      <PackagesPreview />

      <Section tone="blush" aria-labelledby="gifts-heading">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Gifts</Eyebrow>
            <h2 id="gifts-heading" className="mt-4 font-display text-3xl sm:text-4xl">
              Gifts and Hampers
            </h2>
            <p className="mt-4 text-navy-300">
              Thoughtful hampers and hot air balloon gifts.
            </p>
          </div>
          <div className="shrink-0">
            <Button href="/gifts" variant="outline">
              View all gifts
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGifts.map((gift, index) => (
            <Reveal key={gift.id} delay={Math.min(index * 70, 210)}>
              <GiftCard gift={gift} href="/gifts" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Reveal>
        <ProcessSteps />
      </Reveal>

      <Reveal>
        <ProofPoints />
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
