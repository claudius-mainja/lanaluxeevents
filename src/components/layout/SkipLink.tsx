import { getTranslations } from "next-intl/server";

export default async function SkipLink() {
  const t = await getTranslations("common");
  return (
    <a href="#main" className="skip-link">
      {t("skipToContent")}
    </a>
  );
}
