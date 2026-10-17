"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/quote";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cn";

export default function ServiceEnquire({
  serviceId,
  serviceName,
  size = "md",
}: {
  serviceId: string;
  serviceName: string;
  size?: "md" | "lg";
}) {
  const t = useTranslations("common");
  const message = `Hi Lana Luxe Events, I'd like to enquire about ${serviceName} (ref: ${serviceId}). Please send me a tailored quote.`;
  const href = buildWhatsAppUrl(site.whatsapp.number, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("select_hire_item", { item_id: serviceId, category: "event-services" });
        track("whatsapp_handoff", { item_id: serviceId, category: "event-services" });
      }}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full bg-deep-pink font-medium text-white transition-colors hover:bg-deep-pink-hover",
        size === "lg" ? "min-h-12 px-7 py-3 text-base" : "min-h-11 px-5 py-2.5 text-sm",
      )}
    >
      {t("enquire")}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
