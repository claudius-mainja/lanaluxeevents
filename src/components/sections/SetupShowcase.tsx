"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { getFeaturedItems } from "@/content/catalogue";
import ItemCard from "@/components/catalogue/ItemCard";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

export default function SetupShowcase() {
  const t = useTranslations("home.showcase");
  const tCommon = useTranslations("common");
  const items = getFeaturedItems();
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <Section
      aria-labelledby="showcase-heading"
      tone="pink"
    >
      <div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="cream">{t("eyebrow")}</Eyebrow>
            <h2
              id="showcase-heading"
              className="mt-4 font-display text-3xl text-cream sm:text-4xl"
            >
              {t("heading")}
            </h2>
            <p className="mt-4 text-cream/85">{t("lead")}</p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={tCommon("previous")}
              aria-controls="showcase-track"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-white/10"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={tCommon("next")}
              aria-controls="showcase-track"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-white/10"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <ul
          id="showcase-track"
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li
              key={item.id}
              className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%] xl:w-[23.5%]"
            >
              <ItemCard
                item={item}
                sizes="(max-width: 639px) 85vw, (max-width: 1023px) 48vw, 400px"
              />
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Button
            href="/collection"
            variant="light"
            size="lg"
            className="border-transparent"
          >
            {t("cta")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
