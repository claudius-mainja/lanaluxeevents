import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { catalogue } from "@/content/catalogue";
import { getLanguage } from "@/content/languages";
import { site } from "@/content/site";
import { JsonLd, breadcrumbJsonLd, howToJsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import FaqSection from "@/components/sections/FaqSection";
import QuoteForm, { type SelectableItem } from "@/components/quote/QuoteForm";
import CallLink from "@/components/contact/CallLink";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ item?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const { item: requestedItem } = await searchParams;

  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const items: SelectableItem[] = catalogue
    .slice()
    .sort((a, b) => a.category.localeCompare(b.category))
    .map((entry) => ({ id: entry.id, name: entry.name, category: entry.category }));

  const initialItemId =
    requestedItem && catalogue.some((entry) => entry.id === requestedItem)
      ? requestedItem
      : "";
  const localeLabel = getLanguage(locale)?.label ?? "English";

  const nextSteps = [t("next1"), t("next2"), t("next3"), t("next4")];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale as Locale, [
            { name: tNav("home"), path: "/" },
            { name: t("eyebrow"), path: "/contact" },
          ]),
          howToJsonLd({
            name: t("nextHeading"),
            description: t("lead"),
            steps: nextSteps.map((step) => ({ name: step, text: step })),
          }),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        lead={t("lead")}
        imageKey="kidsCombo"
      />

      <Section tone="white" spacing="default" id="quote">
        <div className="mt-0">
          <QuoteForm items={items} initialItemId={initialItemId} localeLabel={localeLabel} />
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl text-navy">{t("contactHeading")}</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MessageCircle aria-hidden="true" className="mt-0.5 h-5 w-5 text-gold-dark" />
                <a
                  href={site.whatsapp.href}
                  className="text-navy underline decoration-gold decoration-2 underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tCommon("whatsapp")}: {site.whatsapp.display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 text-gold-dark" />
                <CallLink
                  href={site.phone.href}
                  className="text-navy underline decoration-gold decoration-2 underline-offset-4"
                >
                  {tCommon("call")}: {site.phone.display}
                </CallLink>
              </li>
              <li className="flex items-start gap-3">
                <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 text-gold-dark" />
                <a
                  href={site.email.href}
                  className="text-navy underline decoration-gold decoration-2 underline-offset-4"
                >
                  {tCommon("email")}: {site.email.display}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-navy-300">{t("whatsappNote")}</p>
            <p className="mt-4 text-sm text-navy-300">{t("responseNote")}</p>
            <p className="mt-6 flex items-start gap-3 text-sm text-navy-300">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 text-gold-dark" />
              {t("areasHeading")} —{" "}
              <Link
                href="/service-areas"
                className="text-navy underline decoration-gold decoration-2 underline-offset-4"
              >
                {tNav("serviceAreas")}
              </Link>
            </p>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl text-navy">{t("nextHeading")}</h2>
            <ol className="mt-6 space-y-4">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold font-display text-sm text-navy">
                    {index + 1}
                  </span>
                  <span className="text-sm text-navy-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <FaqSection page="contact" />
    </>
  );
}
