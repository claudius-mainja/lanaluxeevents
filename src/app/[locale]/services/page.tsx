import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Gem, HeartHandshake, Sparkles } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import {
  weddingAddons,
  weddingOfferings,
  weddingPackages,
  weddingRetaierNote,
  weddingSteps,
  weddingStyleGallery,
} from "@/content/wedding";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/services",
    title: t("title"),
    description: t("description"),
  });
}

const offeringIcons = [Gem, HeartHandshake, Sparkles];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale as Locale, [
            { name: tNav("eventServices"), path: "/services" },
          ]),
          serviceJsonLd({
            locale: locale as Locale,
            path: "/services",
            name: "Wedding Décor & Planning",
            description:
              "Luxury wedding décor, styling and planning across Johannesburg and Pretoria — tent draping, monogram backdrops, florals and full or partial coordination.",
          }),
        ]}
      />

      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        imageKey="weddingDecor"
      />

      {/* Signature investment packages */}
      <Section tone="white" aria-labelledby="wedding-packages-heading">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{t("packagesEyebrow")}</Eyebrow>
          <h2
            id="wedding-packages-heading"
            className="mt-4 font-display text-3xl sm:text-4xl"
          >
            {t("packagesHeading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-300">{t("packagesLead")}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {weddingPackages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 80}>
              <article className="flex h-full flex-col overflow-hidden rounded-frame border border-line bg-white surface-raised">
                <span aria-hidden="true" className="h-1 w-full bg-deep-pink" />
                <div className="flex h-full flex-col p-8">
                  <p className="font-display text-lg italic text-deep-pink">{pkg.subtitle}</p>
                  <h3 className="mt-3 font-display text-2xl text-navy">{pkg.name}</h3>
                  <p className="mt-3 font-display text-3xl text-navy">{pkg.price}</p>
                  <p className="mt-3 text-sm text-navy-300">{pkg.best}</p>
                  <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                    {pkg.features.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-navy-300">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-deep-pink"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      href={`/contact?services=${encodeURIComponent(
                        `${pkg.name} — wedding planning package`,
                      )}#quote`}
                      variant="book"
                      className="w-full"
                    >
                      {t("inquirePackage")}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Optional add-ons */}
        <div className="mt-12 rounded-frame border border-line bg-canvas-2 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>{t("addonsEyebrow")}</Eyebrow>
              <h3 className="mt-3 font-display text-2xl text-navy">{t("addonsHeading")}</h3>
            </div>
            <Button
              href={`${site.whatsapp.href}?text=${encodeURIComponent(
                "Hello Lana Luxe Events, I would like to add optional coordination services to my wedding booking. Please share details.",
              )}`}
              external
              variant="outline"
            >
              {t("addonsCta")}
            </Button>
          </div>
          <dl className="mt-6 divide-y divide-line">
            {weddingAddons.map((addon) => (
              <div key={addon.item} className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-navy-300">{addon.item}</dt>
                <dd className="font-display text-lg text-navy">{addon.price}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-navy-300">{weddingRetaierNote}</p>
        </div>
      </Section>

      {/* Signature wedding offerings */}
      <Section tone="cream" aria-labelledby="wedding-offer-heading">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{t("offerEyebrow")}</Eyebrow>
          <h2 id="wedding-offer-heading" className="mt-4 font-display text-3xl sm:text-4xl">
            {t("offerHeading")}
          </h2>
          <p className="mx-auto mt-4 text-navy-300">{t("offerLead")}</p>
        </div>

        <ul className="mt-16 space-y-16">
          {weddingOfferings.map((offering, index) => {
            const Icon = offeringIcons[index % offeringIcons.length]!;
            const reversed = index % 2 === 1;
            return (
              <li key={offering.id}>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={reversed ? "lg:order-2" : undefined}>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-deep-pink text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl text-navy sm:text-4xl">
                      {offering.title}
                    </h3>
                    <p className="mt-4 text-navy-300">{offering.blurb}</p>
                    <ul className="mt-6 space-y-3">
                      {offering.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-sm text-navy-300">
                          <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-deep-pink" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button
                        href={`${site.whatsapp.href}?text=${encodeURIComponent(
                          `Hello Lana Luxe Events, I would like to enquire about ${offering.title}. Please share availability and pricing.`,
                        )}`}
                        external
                        variant="outline"
                      >
                        {tCommon("enquireNow")}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-frame ${
                      reversed ? "lg:order-1" : ""
                    }`}
                  >
                    <Image
                      src={offering.image}
                      alt={offering.imageAlt}
                      width={1600}
                      height={1200}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Recent wedding styling gallery */}
      <Section tone="white" aria-labelledby="wedding-gallery-heading">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{t("styleEyebrow")}</Eyebrow>
          <h2 id="wedding-gallery-heading" className="mt-4 font-display text-3xl sm:text-4xl">
            {t("styleHeading")}
          </h2>
          <p className="mx-auto mt-4 text-navy-300">{t("styleLead")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {weddingStyleGallery.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <figure className="overflow-hidden rounded-frame border border-line bg-canvas-2">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={1600}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="font-display text-xl text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-navy-300">{item.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How we plan, step by step */}
      <Section tone="navy" aria-labelledby="wedding-steps-heading">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="cream" className="justify-center">
            {t("stepsEyebrow")}
          </Eyebrow>
          <h2 id="wedding-steps-heading" className="mt-4 font-display text-3xl text-cream sm:text-4xl">
            {t("stepsHeading")}
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {weddingSteps.map((step, index) => (
            <Reveal key={step.step} delay={index * 80}>
              <li className="h-full rounded-frame border border-white/15 bg-white/5 p-8">
                <span className="font-display text-4xl text-hot-pink">{step.step}</span>
                <h3 className="mt-4 font-display text-xl text-cream">{step.title}</h3>
                <p className="mt-3 text-sm text-cream/75">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Closing CTA */}
      <Section tone="white" spacing="compact" aria-labelledby="wedding-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="wedding-cta-heading" className="font-display text-3xl text-navy sm:text-4xl">
            {t("ctaHeading")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-300">{t("ctaBody")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact?event=Wedding&focus=wedding#quote" size="lg" variant="book">
              {t("ctaSubmit")}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button
              href={`${site.whatsapp.href}?text=${encodeURIComponent(
                "Hello Lana Luxe Events, I would like to enquire about wedding décor and planning. Please share availability and pricing.",
              )}`}
              external
              size="lg"
              variant="outline"
            >
              {tCommon("whatsappNow")}
            </Button>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-navy-300">{t("travelNote")}</p>
        </div>
      </Section>
    </>
  );
}
