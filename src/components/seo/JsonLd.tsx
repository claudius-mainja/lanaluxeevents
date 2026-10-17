import { site, socialLinks } from "@/content/site";
import { serviceAreas } from "@/content/areas";
import { languages } from "@/content/languages";
import { absoluteUrl } from "@/lib/seo";
import { formatPrice } from "@/lib/format";
import type { ItemPrice } from "@/content/catalogue";
import type { Locale } from "@/i18n/routing";

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(locale: Locale): Json {
  const sameAs = socialLinks.map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.brand,
    url: absoluteUrl(locale, "/"),
    description: site.tagline,
    areaServed: serviceAreas.map((a) => ({ "@type": "Place", name: a.name })),
    knowsLanguage: languages.map((l) => l.label),
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone.display,
        email: site.email.display,
        url: site.whatsapp.href,
        areaServed: "ZA",
        availableLanguage: languages.map((l) => l.englishLabel),
      },
    ],
  };
}

export function websiteJsonLd(locale: Locale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.brand,
    url: absoluteUrl(locale, "/"),
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function serviceJsonLd({
  locale,
  path,
  name,
  description,
  price,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  price?: ItemPrice;
}): Json {
  const offer =
    price && price.currency === "ZAR"
      ? {
          "@type": "Offer",
          priceCurrency: "ZAR",
          price:
            price.type === "fixed" || price.type === "per-hour" || price.type === "per-km"
              ? (price.amountMinor ?? 0) / 100
              : (price.minMinor ?? 0) / 100,
          ...(price.type === "range"
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: (price.minMinor ?? 0) / 100,
                  maxPrice: (price.maxMinor ?? 0) / 100,
                  priceCurrency: "ZAR",
                },
              }
            : {}),
          availability: "https://schema.org/InStock",
          url: absoluteUrl(locale, path),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: serviceAreas.map((a) => ({ "@type": "Place", name: a.name })),
    url: absoluteUrl(locale, path),
    ...(offer ? { offers: offer } : {}),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  crumbs: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.path),
    })),
  };
}

export function itemListJsonLd({
  locale,
  path,
  items,
}: {
  locale: Locale;
  path: string;
  items: { name: string; price: ItemPrice }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: absoluteUrl(locale, path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => {
      const minor = item.price.amountMinor ?? item.price.minMinor ?? 0;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: {
          "@type": "Product",
          name: item.name,
          offers: {
            "@type": "Offer",
            priceCurrency: "ZAR",
            price: minor / 100,
            availability: "https://schema.org/InStock",
          },
        },
      };
    }),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function howToJsonLd({
  name,
  description,
  steps,
}: {
  locale?: Locale;
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime: "PT5M",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export { formatPrice };
