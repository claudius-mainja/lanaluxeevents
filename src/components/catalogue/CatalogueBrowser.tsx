"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CatalogueItem, CategoryId } from "@/content/catalogue";
import { categories, categoryLabelKey } from "@/content/catalogue";
import { cx } from "@/lib/cn";
import Button from "@/components/ui/Button";
import ItemCard from "./ItemCard";

export default function CatalogueBrowser({
  items,
  showCats,
  requireQuery = false,
}: {
  items: CatalogueItem[];
  showCats?: CategoryId[];
  /** When true, results stay hidden until a search term or filter is applied. */
  requireQuery?: boolean;
}) {
  const t = useTranslations("collection");
  const tCat = useTranslations("categories");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const allCats = useMemo(() => categories.filter((c) => items.some((i) => i.category === c.id)), [items]);
  const usedCategories = useMemo(
    () => (showCats ? categories.filter((c) => showCats.includes(c.id)) : allCats),
    [allCats, showCats],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        item.name,
        item.variantName,
        item.summary,
        tCat(categoryLabelKey(item.category)),
        item.category,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, category, tCat]);

  const isFiltered = query.trim() !== "" || category !== "all";
  const showResults = !requireQuery || isFiltered;

  function reset() {
    setQuery("");
    setCategory("all");
  }

  return (
    <div className="rounded-frame border border-line bg-canvas-2 p-6 sm:p-8">
      <div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-sm">
            <label htmlFor="catalogue-search" className="text-sm font-medium text-navy">
              {t("searchLabel")}
            </label>
            <div className="group relative mt-2">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300 transition-colors group-focus-within:text-deep-pink"
              />
              <input
                id="catalogue-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchPlaceholder")}
                className="min-h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm text-navy shadow-[0_20px_50px_-40px_rgba(30,25,94,0.6)] transition placeholder:text-navy-300/70 focus:border-deep-pink focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-deep-pink)_30%,transparent)]"
              />
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-navy">{t("filterLabel")}</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                aria-pressed={category === "all"}
                className={cx(
                  "min-h-11 rounded-full border px-4 text-sm transition-all duration-200",
                  category === "all"
                    ? "border-transparent bg-deep-pink text-white"
                    : "border-navy/15 bg-white/70 text-navy hover:border-deep-pink/60 hover:text-deep-pink",
                )}
              >
                {t("all")}
              </button>
              {usedCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  aria-pressed={category === c.id}
                  className={cx(
                    "min-h-11 rounded-full border px-4 text-sm transition-all duration-200",
                    category === c.id
                      ? "border-transparent bg-deep-pink text-white"
                      : "border-navy/15 bg-white/70 text-navy hover:border-deep-pink/60 hover:text-deep-pink",
                  )}
                >
                  {tCat(categoryLabelKey(c.id))}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showResults ? (
          <div className="mt-6 flex items-center justify-between gap-4">
            <p aria-live="polite" className="text-sm text-navy-300">
              {t("resultsCount", { count: filtered.length })}
            </p>
            {isFiltered ? (
              <Button variant="ghost" onClick={reset}>
                <X aria-hidden="true" className="h-4 w-4" />
                {t("resetFilters")}
              </Button>
            ) : null}
          </div>
        ) : null}

        {!showResults ? (
          <div className="mt-8 flex flex-col items-center rounded-frame border border-dashed border-navy/20 bg-white/60 px-6 py-14 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-deep-pink text-white">
              <Sparkles aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-2xl text-navy">{t("liveEmptyTitle")}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-navy-300">
              {t("liveEmptyBody")}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-frame border border-line bg-white p-8 text-center">
            <h3 className="font-display text-2xl text-navy">{t("noResultsTitle")}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-navy-300">
              {t("noResultsBody")}
            </p>
            <Button onClick={reset} className="mt-6">
              {t("resetFilters")}
            </Button>
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li key={item.id}>
                <ItemCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
