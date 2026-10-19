import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getItemsByCategory } from "@/content/catalogue";
import { formatPrice } from "@/lib/format";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

function childrenFromId(id: string): number {
  const match = /-(\d+)$/.exec(id);
  return match ? Number(match[1]) : 0;
}

/**
 * Compact, price-led preview of the Kids Party Combo tiers. Presented as a
 * list rather than another card grid so the homepage journey stays varied.
 */
export default async function PackagesPreview() {
  const t = await getTranslations("home.packages");
  const tPkg = await getTranslations("packages");

  const tiers = getItemsByCategory("packages")
    .map((item) => ({ item, children: childrenFromId(item.id) }))
    .sort((a, b) => a.children - b.children);

  if (tiers.length === 0) return null;

  return (
    <Section tone="cream" aria-labelledby="packages-preview-heading">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2
            id="packages-preview-heading"
            className="mt-4 font-display text-3xl sm:text-4xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 text-navy-300">{t("lead")}</p>
        </div>
        <div className="shrink-0">
          <Button href="/party-hire-packages" variant="outline">
            {t("cta")}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
      </Reveal>

      <ul className="mt-10 divide-y divide-line overflow-hidden rounded-frame border border-line bg-white">
        {tiers.map((tier, index) => (
          <Reveal as="li" key={tier.item.id} delay={Math.min(index * 55, 275)}>
            <Link
              href="/party-hire-packages"
              className="group flex flex-col gap-2 px-6 py-5 transition-colors hover:bg-canvas-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span>
                <span className="font-display text-xl text-navy">
                  {tier.item.name}
                </span>
                <span className="mt-1 block text-sm text-navy-300">
                  {tPkg("forChildren", { count: tier.children })}
                </span>
              </span>
              <span className="flex items-center gap-3">
                <span className="font-display text-2xl text-navy">
                  {formatPrice(tier.item.price)}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-deep-pink motion-safe:duration-200 motion-safe:group-hover:translate-x-1 motion-safe:transition-transform"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
