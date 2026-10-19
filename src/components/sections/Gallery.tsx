"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  gallery as allEntries,
  getGalleryCategories,
  type GalleryCategory,
} from "@/content/gallery";
import { categoryLabelKey } from "@/content/catalogue";
import { cx } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";

export default function Gallery({ limit }: { limit?: number }) {
  const t = useTranslations("gallery");
  const tCat = useTranslations("categories");
  const tNav = useTranslations("nav");

  const categories = useMemo(() => getGalleryCategories(), []);
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const entries = useMemo(() => {
    const filtered =
      category === "all"
        ? allEntries
        : allEntries.filter((entry) => entry.category === category);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [category, limit]);

  const label = useCallback(
    (cat: GalleryCategory) =>
      cat === "event-services" ? tNav("eventServices") : tCat(categoryLabelKey(cat)),
    [tCat, tNav],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((current) => (current === null ? null : (current + 1) % entries.length)),
    [entries.length],
  );
  const previous = useCallback(
    () =>
      setOpenIndex((current) =>
        current === null ? null : (current - 1 + entries.length) % entries.length,
      ),
    [entries.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, next, previous]);

  const active = openIndex === null ? null : entries[openIndex] ?? null;

  return (
    <div>
      {!limit ? (
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={cx(
              "min-h-11 rounded-full border px-5 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-pink",
              category === "all"
                ? "border-transparent bg-deep-pink text-white"
                : "border-navy/15 bg-white text-navy hover:-translate-y-0.5 hover:border-deep-pink hover:text-deep-pink",
            )}
          >
            {t("all")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cx(
                "min-h-11 rounded-full border px-5 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-pink",
                category === cat
                  ? "border-transparent bg-deep-pink text-white"
                  : "border-navy/15 bg-white text-navy hover:-translate-y-0.5 hover:border-deep-pink hover:text-deep-pink",
              )}
            >
              {label(cat)}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, index) => (
          <Reveal
            as="li"
            key={entry.id}
            delay={(index % 3) * 60}
            className={cx(index % 5 === 0 && "sm:col-span-2")}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full overflow-hidden rounded-frame bg-canvas-3 text-left shadow-[0_30px_70px_-50px_rgba(30,25,94,0.7)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-pink"
              aria-label={`${t("openImage")}: ${entry.alt}`}
            >
              <Image
                src={entry.src}
                alt=""
                width={entry.width}
                height={entry.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className={cx(
                  "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
                  index % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/3]",
                )}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-navy-700/35 transition-colors duration-300 group-hover:bg-navy-700/20"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4 text-xs font-medium text-cream">
                <span className="rounded-full bg-navy-700/70 px-3 py-1">
                  {label(entry.category)}
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-deep-pink text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand aria-hidden="true" className="h-4 w-4" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Dialog.Root open={active !== null} onOpenChange={(open) => !open && close()}>
        <Dialog.Portal>
          <Dialog.Overlay className="lle-overlay fixed inset-0 z-50 bg-navy-700/90" />
          <Dialog.Content className="lle-dialog fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
            <Dialog.Title className="sr-only">{active?.alt ?? t("heading")}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {active ? `${label(active.category)} · ${active.alt}` : ""}
            </Dialog.Description>

            <div className="absolute right-4 top-4 flex items-center gap-2">
              <span className="rounded-full glass-dark px-3 py-1 text-xs text-cream">
                {t("viewer.counter", {
                  current: (openIndex ?? 0) + 1,
                  total: entries.length,
                })}
              </span>
              <Dialog.Close
                className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-dark text-cream transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </Dialog.Close>
            </div>

            {active ? (
              <figure className="flex max-h-[80vh] w-full max-w-4xl flex-col items-center">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={active.width}
                  height={active.height}
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="max-h-[70vh] w-auto rounded-frame object-contain shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)]"
                />
                <figcaption className="mt-4 flex flex-col items-center gap-2 text-center text-sm text-cream/90">
                  <span>{active.alt}</span>
                  {active.itemId ? (
                    <Link
                      href={`/contact?item=${encodeURIComponent(active.itemId)}#quote`}
                      className="inline-flex min-h-11 items-center gap-1 text-gold underline underline-offset-4"
                    >
                      {t("relatedLink")}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  ) : null}
                </figcaption>
              </figure>
            ) : null}

            <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-4">
              <button
                type="button"
                onClick={previous}
                aria-label={t("viewer.previous")}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full glass-dark text-cream transition-colors hover:bg-cream/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                <ChevronLeft aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4">
              <button
                type="button"
                onClick={next}
                aria-label={t("viewer.next")}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full glass-dark text-cream transition-colors hover:bg-cream/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                <ChevronRight aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
