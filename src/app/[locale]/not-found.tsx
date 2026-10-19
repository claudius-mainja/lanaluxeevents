import { getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.notFound" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/404",
    title: t("title"),
    description: t("description"),
  });
}

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Section tone="cream">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="mt-5 font-display text-4xl text-navy sm:text-5xl">{t("heading")}</h1>
        <p className="mt-5 text-lg text-navy-300">{t("lead")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/collection">{t("hire")}</Button>
          <Button href="/service-areas" variant="outline">
            {t("areas")}
          </Button>
          <Button href="/contact" variant="outline">
            {t("contact")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
