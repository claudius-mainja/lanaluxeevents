import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { CatalogueItem } from "@/content/catalogue";
import { categoryLabelKey } from "@/content/catalogue";
import { formatPrice } from "@/lib/format";
import { cx } from "@/lib/cn";
import EnquireButton from "./EnquireButton";

/**
 * Rich, linkable item section. Anchored by the item id so service pages and
 * the collection can deep-link to a specific hire (preserving legacy anchors).
 */
export default async function ItemDetails({
  item,
  imageSide = "left",
}: {
  item: CatalogueItem;
  imageSide?: "left" | "right";
}) {
  const t = await getTranslations("common");
  const tCat = await getTranslations("categories");
  const image = item.images[0];

  return (
    <article
      id={item.slug}
      className="scroll-mt-24 border-t border-gold/40 py-10 first:border-t-0 first:pt-0"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {image ? (
          <div
            className={cx(
              "lg:col-span-5",
              imageSide === "right" ? "lg:order-2" : "lg:order-1",
            )}
          >
            <div className="overflow-hidden rounded-frame bg-canvas-3">
              <Image
                src={image}
                alt={item.name}
                width={1080}
                height={810}
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className={cx(image ? "lg:col-span-7" : "lg:col-span-12")}>
          <p className="text-2xs font-semibold uppercase tracking-[0.2em] text-navy-300">
            {tCat(categoryLabelKey(item.category))}
          </p>
          <h3 className="mt-2 font-display text-2xl text-navy sm:text-3xl">
            {item.name}
          </h3>
          <p className="mt-4 text-navy-300">{item.description}</p>

          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-navy">{t("includedHeading")}</h4>
              <ul className="mt-3 space-y-2 text-sm text-navy-300">
                {item.inclusions.map((inclusion) => (
                  <li key={inclusion} className="flex items-baseline gap-2">
                    <span aria-hidden="true" className="text-gold">—</span>
                    {inclusion}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-navy">{t("requirementsHeading")}</h4>
              {item.requirements.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-navy-300">
                  {item.requirements.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-navy-300">{t("requirementsNote")}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gold/40 pt-6">
            <p className="font-display text-3xl text-navy">{formatPrice(item.price)}</p>
            <EnquireButton itemId={item.id} category={item.category} size="lg" />
          </div>
          <p className="mt-3 text-xs text-navy-300">{t("availabilityNote")}</p>
        </div>
      </div>
    </article>
  );
}
