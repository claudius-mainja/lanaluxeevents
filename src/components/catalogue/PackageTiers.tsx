"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CatalogueItem } from "@/content/catalogue";
import { formatPrice } from "@/lib/format";
import { cx } from "@/lib/cn";
import EnquireButton from "@/components/catalogue/EnquireButton";

export interface PackageTier {
  item: CatalogueItem;
  children: number;
}

export default function PackageTiers({ tiers }: { tiers: PackageTier[] }) {
  const t = useTranslations("packages");
  const [selectedId, setSelectedId] = useState(tiers[0]?.item.id ?? "");
  const selected = useMemo(
    () => tiers.find((tier) => tier.item.id === selectedId) ?? tiers[0],
    [tiers, selectedId],
  );

  if (!selected) return null;

  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl">{t("tierHeading")}</h2>
      <p className="mt-3 max-w-2xl text-navy-300">{t("tierLabel")}</p>

      <div role="tablist" aria-label={t("tierHeading")} className="mt-8 flex flex-wrap gap-2">
        {tiers.map((tier) => (
          <button
            key={tier.item.id}
            type="button"
            role="tab"
            aria-selected={tier.item.id === selected.item.id}
            onClick={() => setSelectedId(tier.item.id)}
            className={cx(
              "min-h-12 rounded-full border px-5 text-sm font-medium transition-all duration-300",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-pink",
              tier.item.id === selected.item.id
                ? "bg-deep-pink border-transparent text-white shadow-[0_18px_40px_-22px_rgba(184,11,104,0.9)]"
                : "border-navy/15 bg-white text-navy hover:-translate-y-0.5 hover:border-deep-pink hover:text-deep-pink",
            )}
          >
            {t("forChildren", { count: tier.children })}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-frame border border-line bg-white shadow-[0_40px_80px_-60px_rgba(30,25,94,0.5)]">
        <div className="grid gap-8 rounded-frame bg-white p-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl text-navy">{selected.item.name}</h3>
            <p className="mt-4 text-navy-300">{selected.item.description}</p>
            <h4 className="mt-6 text-sm font-semibold text-navy">{t("includedHeading")}</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-navy-300">
              {selected.item.inclusions.map((inclusion) => (
                <li key={inclusion} className="flex items-start gap-2">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-deep-pink" />
                  {inclusion}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-frame bg-navy p-6">
              <p className="font-display text-3xl text-cream">{formatPrice(selected.item.price)}</p>
              <p className="mt-2 text-sm text-cream/75">
                {t("forChildren", { count: selected.children })}
              </p>
              <div className="mt-6">
                <EnquireButton
                  itemId={selected.item.id}
                  category={selected.item.category}
                  size="lg"
                />
              </div>
            </div>
            <Link
              href="/collection"
              className="group mt-4 inline-flex items-center gap-2 text-sm text-navy transition-colors hover:text-deep-pink"
            >
              {t("browseCollection")}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-2xl text-navy">{t("compareHeading")}</h3>
        <p className="mt-2 text-sm text-navy-300">{t("compareNote")}</p>
        <div className="mt-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-navy/15">
                <th scope="col" className="py-3 pr-4 font-semibold text-navy">
                  {t("tierColumn")}
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold text-navy">
                  {t("includedHeading")}
                </th>
                <th scope="col" className="py-3 text-right font-semibold text-navy">
                  {t("priceColumn")}
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr
                  key={tier.item.id}
                  className="border-b border-line transition-colors hover:bg-canvas-2/70"
                >
                  <td className="py-4 pr-4">
                    <button
                      type="button"
                      onClick={() => setSelectedId(tier.item.id)}
                      className="rounded-sm text-left font-medium text-navy transition-colors hover:text-deep-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-pink"
                    >
                      {tier.item.name}
                    </button>
                  </td>
                  <td className="py-4 pr-4 text-navy-300">
                    {tier.item.inclusions.join(", ")}
                  </td>
                  <td className="py-4 text-right font-medium text-navy">
                    {formatPrice(tier.item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
