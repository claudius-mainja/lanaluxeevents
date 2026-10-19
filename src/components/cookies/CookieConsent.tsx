"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import { storeConsent, useConsentChoice, useConsentOpenRequests } from "@/lib/consent";

/**
 * Analytics cookie banner. Shown at the end of <body> (after the skip link)
 * so the skip link stays the first tab stop. Appears on first visit when no
 * choice is stored, and can be re-opened from the footer "Cookie settings".
 */
export default function CookieConsent() {
  const t = useTranslations("cookies.consent");
  const consent = useConsentChoice();
  const openRequests = useConsentOpenRequests();
  const [dismissedAt, setDismissedAt] = useState(-1);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const reopened = openRequests > 0 && openRequests > dismissedAt;
  const show = consent === null || reopened;

  useEffect(() => {
    if (reopened) headingRef.current?.focus();
  }, [reopened, openRequests]);

  if (!show) return null;

  const choose = (choice: "accepted" | "declined") => {
    storeConsent(choice);
    setDismissedAt(openRequests);
  };

  return (
    <div
      role="dialog"
      aria-label={t("label")}
      className="lle-slide-up fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-700 text-cream shadow-[0_-8px_30px_rgba(10,17,42,0.35)]"
    >
      <div className="container-content flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="max-w-2xl">
          <h2
            ref={headingRef}
            tabIndex={reopened ? -1 : undefined}
            className="font-display text-xl text-cream focus:outline-none"
          >
            {t("heading")}
          </h2>
          <p className="mt-2 text-sm text-cream/75">
            {t("body")}{" "}
            <Link
              href="/cookies"
              className="underline underline-offset-4 hover:text-cream"
            >
              {t("policyLink")}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button variant="outlineDark" onClick={() => choose("declined")}>
            {t("decline")}
          </Button>
          <Button variant="primary" onClick={() => choose("accepted")}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
