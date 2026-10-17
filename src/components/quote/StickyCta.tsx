"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import Button from "@/components/ui/Button";

/**
 * A single restrained mobile sticky CTA. Hidden on the contact page (where the
 * form lives) and whenever the footer is in view, so it never covers form
 * fields or the footer. Uses safe-area spacing for notched devices.
 */
export default function StickyCta() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (pathname === "/contact" || footerVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <Button href="/contact" size="lg" className="w-full">
        <MessageCircle aria-hidden="true" className="h-4 w-4" />
        {t("getQuote")}
      </Button>
    </div>
  );
}
