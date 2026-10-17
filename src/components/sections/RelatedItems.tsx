import { getTranslations } from "next-intl/server";
import { getItem } from "@/content/catalogue";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import ItemGrid from "@/components/sections/ItemGrid";

export default async function RelatedItems({ ids }: { ids: string[] }) {
  const t = await getTranslations("common");
  const items = ids
    .map((id) => getItem(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (items.length === 0) return null;

  return (
    <Section tone="cream" aria-labelledby="related-heading">
      <Eyebrow>{t("relatedEyebrow")}</Eyebrow>
      <h2 id="related-heading" className="mt-4 font-display text-3xl">
        {t("relatedHeading")}
      </h2>
      <div className="mt-10">
        <ItemGrid items={items} />
      </div>
    </Section>
  );
}
