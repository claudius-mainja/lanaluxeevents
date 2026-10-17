import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Heart } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { images } from "@/content/images";

export default async function EventServicesIntro() {
  const t = await getTranslations("home.eventIntro");
  const image = images.weddingTent;

  return (
    <Section aria-labelledby="event-intro-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="event-intro-heading" className="mt-4 font-display text-3xl sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-navy-300">{t("lead")}</p>

          <p className="mt-6 inline-flex items-center gap-3 rounded-frame border border-line bg-canvas-2 px-5 py-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-deep-pink text-white">
              <Heart aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="font-display text-lg text-navy">{t("badge")}</span>
          </p>

          <div className="mt-7">
            <Button href="/services" variant="outline">
              {t("cta")}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="media-card">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
