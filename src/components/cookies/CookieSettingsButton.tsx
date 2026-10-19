"use client";

import { useTranslations } from "next-intl";
import { requestConsentBanner } from "@/lib/consent";

/**
 * Footer "Cookie settings" control. Re-opens the consent banner so the
 * visitor can review or change their analytics choice at any time.
 */
export default function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations("nav");

  return (
    <button
      type="button"
      onClick={requestConsentBanner}
      className={
        className ??
        "cursor-pointer text-left underline-offset-4 transition-colors hover:text-cream hover:underline"
      }
    >
      {t("cookieSettings")}
    </button>
  );
}
