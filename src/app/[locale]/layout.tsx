import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { assertValidContent } from "@/content/validate";
import { dmSerif, manrope } from "@/lib/fonts";
import { site } from "@/content/site";
import { robotsForLocale } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import AccessibilityBoot from "@/components/layout/AccessibilityBoot";
import StickyCta from "@/components/quote/StickyCta";
import Analytics from "@/components/Analytics";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#FEFEFE",
  width: "device-width",
  initialScale: 1,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(site.url),
    applicationName: site.brand,
    title: {
      default: "Lana Luxe Events | Soft Play & Party Hire Johannesburg",
      template: "%s",
    },
    formatDetection: { telephone: true, address: false, email: true },
    openGraph: {
      type: "website",
      siteName: site.brand,
      locale: "en_ZA",
      url: site.url,
      images: [
        {
          url: "/og/lana-luxe-events.png",
          width: 1200,
          height: 630,
          alt: `${site.brand} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og/lana-luxe-events.png"],
    },
    robots: hasLocale(routing.locales, locale)
      ? robotsForLocale(locale as Locale)
      : { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  assertValidContent();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${dmSerif.variable} ${manrope.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <AccessibilityBoot />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <StickyCta />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
