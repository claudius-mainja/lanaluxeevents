"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CatalogueItem } from "@/content/catalogue";
import { categoryLabelKey } from "@/content/catalogue";
import { formatPrice } from "@/lib/format";
import { track } from "@/lib/analytics";

const gridSizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px";

export default function ItemCard({
  item,
  sizes = gridSizes,
}: {
  item: CatalogueItem;
  sizes?: string;
}) {
  const t = useTranslations("common");
  const tCat = useTranslations("categories");
  const image = item.images[0];
  const href = `/contact?item=${encodeURIComponent(item.id)}#quote`;

  function handleSelect() {
    track("select_hire_item", { item_id: item.id, category: item.category });
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-frame border border-line bg-white surface-raised">
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-canvas-3">
          <Image
            src={image}
            alt={item.name}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="border-b border-gold/30 px-6 pt-6">
          <span aria-hidden="true" className="block h-px w-12 bg-gold" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="text-2xs font-semibold uppercase tracking-[0.2em] text-navy-300">
          {tCat(categoryLabelKey(item.category))}
        </p>
        <h3 className="mt-2 font-display text-xl text-navy">{item.name}</h3>
        <p className="mt-3 flex-1 text-sm text-navy-300">{item.summary}</p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-gold/30 pt-4">
          <p className="font-display text-2xl text-navy">
            {formatPrice(item.price)}
          </p>
          <Link
            href={href}
            onClick={handleSelect}
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-navy underline decoration-gold decoration-2 underline-offset-4 hover:decoration-navy"
          >
            {t("enquire")}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
