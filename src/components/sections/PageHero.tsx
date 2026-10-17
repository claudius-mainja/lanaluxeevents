import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import HeroSequence from "@/components/ui/HeroSequence";
import { images, type ImageKey } from "@/content/images";

/**
 * Shared page hero used by every page except the landing page. Full-bleed
 * photography sits beneath a uniform solid-colour overlay so the copy stays
 * legible, with centred copy and two calls to action.
 */
export default async function PageHero({
  eyebrow,
  title,
  lead,
  imageKey = "hero",
  imagePriority = false,
  secondary = { href: "/collection", label: null },
}: {
  eyebrow: string;
  title: string;
  lead: string;
  imageKey?: ImageKey;
  imageAlt?: string;
  imagePriority?: boolean;
  secondary?: { href: string; label: string | null } | false;
}) {
  const t = await getTranslations("common");
  const image = images[imageKey];
  const showSecondary = secondary !== false;
  const secondaryLink = secondary
    ? secondary
    : { href: "/collection", label: null };

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-700"
      aria-labelledby="page-hero-heading"
    >
      {image ? (
        <Image
          src={image.src}
          alt=""
          aria-hidden
          fill
          priority={imagePriority}
          sizes="100vw"
          className="pointer-events-none object-cover hero-image"
        />
      ) : null}

      {/* Uniform solid overlay keeps the photograph visible but readable. */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy-700/80" />

      <div className="container-content relative py-20 text-center lg:py-28">
        <HeroSequence className="mx-auto max-w-3xl">
          <Eyebrow tone="cream" className="justify-center">
            {eyebrow}
          </Eyebrow>
          <h1
            id="page-hero-heading"
            className="mt-6 font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/90">{lead}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg" variant="book">
              {t("getQuote")}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            {showSecondary ? (
              <Button href={secondaryLink.href} size="lg" variant="outlineDark">
                {secondaryLink.label ?? t("browseHire")}
              </Button>
            ) : null}
          </div>
        </HeroSequence>
      </div>
    </section>
  );
}
