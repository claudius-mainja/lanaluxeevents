import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { images } from "@/content/images";

/**
 * Landing-page hero. Full-bleed photography sits beneath a uniform solid
 * primary-colour overlay so the image stays visible while the copy reads
 * clearly. Centred copy leads with an invitation, a promise and two CTAs.
 */
export default async function HeroCollage() {
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");
  const hero = images.hero;

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-700"
      aria-labelledby="hero-heading"
    >
      <Image
        src={hero.src}
        alt={t("heroAlt")}
        fill
        priority
        sizes="100vw"
        className="hero-image object-cover"
      />

      {/* Solid primary-colour overlay keeps the photograph visible. */}
      <div aria-hidden="true" className="absolute inset-0 bg-deep-pink/80" />

      <div className="container-content relative py-24 text-center lg:py-32">
        <div className="hero-seq mx-auto max-w-4xl">
          <Eyebrow tone="cream" className="justify-center">
            {t("eyebrow")}
          </Eyebrow>

          <h1
            id="hero-heading"
            className="mt-6 font-display text-4xl leading-[1.03] text-cream sm:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg text-cream/90">
            {t("lead")}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg" variant="light">
              {tc("getQuote")}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button href="/collection" size="lg" variant="outlineDark">
              {tc("browseHire")}
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cream/90">
            <li className="inline-flex items-center gap-2">{t("badge1")}</li>
            <li className="inline-flex items-center gap-2">{t("badge2")}</li>
            <li className="inline-flex items-center gap-2">{t("badge3")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
