import type { MetadataRoute } from "next";
import { reviewedLocales } from "@/content/languages";
import { serviceAreas } from "@/content/areas";
import { absoluteUrl } from "@/lib/seo";
import { defaultLocale, type Locale } from "@/i18n/routing";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/collection", priority: 0.9, changeFrequency: "weekly" },
  { path: "/soft-play-hire", priority: 0.9, changeFrequency: "monthly" },
  { path: "/jumping-castle-hire", priority: 0.9, changeFrequency: "monthly" },
  { path: "/party-fun-hire", priority: 0.8, changeFrequency: "monthly" },
  { path: "/party-hire-packages", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bubble-house-hire", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/services", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service-areas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/hire-terms", priority: 0.2, changeFrequency: "yearly" },
  ...serviceAreas
    .filter((area) => area.hasPage)
    .map((area) => ({
      path: `/service-areas/${area.id}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.NEXT_PUBLIC_NOINDEX === "true") return [];

  const lastModified = new Date();

  return routes.flatMap((route) =>
    reviewedLocales.map((locale) => ({
      url: absoluteUrl(locale as Locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            reviewedLocales.map((l) => [l, absoluteUrl(l as Locale, route.path)]),
          ),
          "x-default": absoluteUrl(defaultLocale, route.path),
        },
      },
    })),
  );
}
