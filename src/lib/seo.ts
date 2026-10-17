import type { Metadata } from "next";
import { siteUrl } from "@/content/site";
import { reviewedLocales } from "@/content/languages";
import { defaultLocale, type Locale } from "@/i18n/routing";

/** Builds the locale-aware path for a canonical route. English stays at root. */
export function canonicalPath(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path;
  if (locale === defaultLocale) return suffix || "/";
  return `/${locale}${suffix}`;
}

export function absoluteUrl(locale: Locale, path: string): string {
  const cp = canonicalPath(locale, path);
  return `${siteUrl}${cp === "/" ? "/" : cp}`;
}

/**
 * Alternates intentionally include only reviewed locales. Draft translations
 * are marked noindex and are not offered as hreflang alternates.
 */
export function buildAlternates(
  locale: Locale,
  path: string,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of reviewedLocales) {
    languages[l] = absoluteUrl(l, path);
  }
  languages["x-default"] = absoluteUrl(defaultLocale, path);

  return {
    canonical: absoluteUrl(locale, path),
    languages,
  };
}

export function robotsForLocale(locale: Locale): Metadata["robots"] {
  if (process.env.NEXT_PUBLIC_NOINDEX === "true") {
    return { index: false, follow: false };
  }
  if (!reviewedLocales.includes(locale)) {
    return { index: false, follow: true };
  }
  return undefined;
}

const defaultOgImage = "/images/hero-356dc1e4.jpg";

export interface PageMetadataInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  ogImage = defaultOgImage,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(locale, path);
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    robots: robotsForLocale(locale),
    openGraph: {
      type: "website",
      siteName: "Lana Luxe Events",
      title,
      description,
      url,
      locale,
      images: [
        {
          url: ogImage,
          width: 1080,
          height: 1408,
          alt: "Lana Luxe Events party hire setup",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
