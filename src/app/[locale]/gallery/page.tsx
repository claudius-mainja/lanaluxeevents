import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/content/images";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
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
  const tCommon = await getTranslations("common");

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
        imageKey="babyShower"
      />

      <Section tone="cream">
        <Reveal>
          <figure className="overflow-hidden rounded-frame border border-line bg-white surface-raised">
            <div className="relative aspect-[16/9]">
              <Image
                src={images.weddingTent.src}
                alt={images.weddingTent.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover reveal-img"
              />
            </div>
            <figcaption className="flex flex-col gap-4 border-t border-line p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm text-navy-300">{images.weddingTent.alt}</p>
              <Button href="/services" variant="outline">
                {tCommon("enquireNow")}
              </Button>
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <Section tone="white" aria-labelledby="gallery-browse-heading">
        <h2 id="gallery-browse-heading" className="font-display text-3xl">
          {t("browseHeading")}
        </h2>
        <div className="mt-8">
          <Gallery />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
