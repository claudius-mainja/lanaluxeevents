import { getTranslations } from "next-intl/server";
import { getItemsByCategory, type CategoryId } from "@/content/catalogue";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import ItemDetails from "@/components/catalogue/ItemDetails";

export default async function ServiceItems({
  category,
  namespace,
}: {
  category: CategoryId;
  namespace: string;
}) {
  const t = await getTranslations(namespace);
  const items = getItemsByCategory(category);

  return (
    <Section tone="white" aria-labelledby="service-items-heading">
      <div className="max-w-2xl">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 id="service-items-heading" className="mt-4 font-display text-3xl sm:text-4xl">
          {t("itemsHeading")}
        </h2>
      </div>
      <div className="mt-10">
        {items.map((item, index) => (
          <ItemDetails
            key={item.id}
            item={item}
            imageSide={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </Section>
  );
}
