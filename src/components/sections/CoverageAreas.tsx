import { getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { serviceAreas } from "@/content/areas";
import { Link } from "@/i18n/navigation";

export default async function CoverageAreas() {
  const t = await getTranslations("areas");
  const tCommon = await getTranslations("common");

  return (
    <Section tone="cream" aria-labelledby="coverage-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="coverage-heading" className="mt-4 font-display text-3xl sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-navy-300">{t("lead")}</p>
          <p className="mt-4 text-sm text-navy-300">{tCommon("areaConfirmNote")}</p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-frame border border-line bg-white px-5 py-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-deep-pink text-white">
              <MapPin aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg text-navy">
                {serviceAreas.length} {t("listHeading").toLowerCase()}
              </p>
              <p className="text-xs text-navy-300">
                Johannesburg · Pretoria · Surrounds
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button href="/service-areas" variant="outline">
              {t("backToAreas")}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="flex flex-wrap gap-2.5">
            {serviceAreas.map((area) =>
              area.hasPage ? (
                <li key={area.id}>
                  <Link
                    href={`/service-areas/${area.id}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 bg-white px-4 text-sm text-navy transition-colors hover:border-deep-pink hover:text-deep-pink"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-deep-pink"
                    />
                    {area.name}
                  </Link>
                </li>
              ) : (
                <li key={area.id}>
                  <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-canvas-3 px-4 text-sm text-charcoal">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {area.name}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </Section>
  );
}
