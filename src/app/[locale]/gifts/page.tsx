import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import GiftCard from "@/components/catalogue/GiftCard";
import { gifts, giftAddOns } from "@/content/gifts";
import { site } from "@/content/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale: locale as Locale,
    path: "/gifts",
    title: "Gifts and Hampers | Lana Luxe Events",
    description: "Hot air balloon hampers, Ferrero Rocher gifts and student care packages.",
  });
}

export default async function GiftsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const tNav = await getTranslations("nav");

  const enquireAction = (
    <Link
      href="/contact?services=Gifts#quote"
      className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-navy underline decoration-gold decoration-2 underline-offset-4 hover:decoration-navy"
    >
      Enquire
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale as Locale, [
          { name: tNav("home"), path: "/" },
          { name: "Gifts", path: "/gifts" },
        ])}
      />
      <PageHero
        eyebrow="Gifts"
        title="Gifts and Hampers"
        lead="Thoughtful gifts for every occasion."
        secondary={false}
      />

      <Section tone="white" aria-label="Gifts and hampers">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift, index) => (
            <Reveal key={gift.id} delay={Math.min(index * 70, 350)}>
              <GiftCard gift={gift} headingLevel="h2" action={enquireAction} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 rounded-frame border border-line bg-cream p-6 sm:p-8">
          <h2 className="font-display text-2xl text-navy">Add-ons</h2>
          <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {giftAddOns.map((addOn) => (
              <div
                key={addOn.label}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm"
              >
                <dt className="text-navy-300">{addOn.label}</dt>
                <dd className="font-semibold text-navy">{addOn.price}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-3xl text-sm text-navy-300">
            Contact:{" "}
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              {site.whatsapp.display}
            </a>
            . A 50% deposit confirms your order. Please order at least 2 days in
            advance. Prices may vary with preferences and budget.
          </p>
        </div>
      </Section>
    </>
  );
}
