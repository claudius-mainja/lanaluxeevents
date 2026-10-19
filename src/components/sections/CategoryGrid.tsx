import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { images, type ImageKey } from "@/content/images";import {
  categories,
  categoryLabelKey,
  type CategoryId,
} from "@/content/catalogue";

const cardImages: Record<CategoryId, ImageKey> = {
  "soft-play": "hero",
  "jumping-castles": "whiteDomeCastle",
  "party-fun": "stockCandyCart",
  packages: "kidsCombo",
  "bubble-house": "bubbleHouse",
  "nursery-decor": "babyShower",
};

export default async function CategoryGrid() {
  const t = await getTranslations("home.categoryGrid");
  const tCat = await getTranslations("categories");

  const cards = categories.map((category) => {
    const image = images[cardImages[category.id]];
    return {
      id: category.id,
      href: category.href ?? "/collection",
      label: tCat(categoryLabelKey(category.id)),
      lead: t(categoryLabelKey(category.id)),
      image,
    };
  });

  return (
    <Section aria-labelledby="category-grid-heading">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center">{t("eyebrow")}</Eyebrow>
        <h2
          id="category-grid-heading"
          className="mt-4 font-display text-3xl text-ink sm:text-4xl"
        >
          {t("heading")}
        </h2>
        <p className="mt-4 text-ink-soft">{t("lead")}</p>
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Reveal as="li" key={card.id} delay={Math.min(index * 70, 350)}>
            <Link
              href={card.href}
              className="group relative block overflow-hidden rounded-frame border border-line bg-canvas-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image.src}
                  alt={card.image.alt || card.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy/65"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-cream">{card.label}</h3>
                <p className="mt-2 text-sm text-cream/85">{card.lead}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cream">
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
