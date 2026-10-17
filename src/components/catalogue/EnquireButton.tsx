"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";
import Button from "@/components/ui/Button";

export default function EnquireButton({
  itemId,
  category,
  size = "md",
  className,
}: {
  itemId: string;
  category?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const t = useTranslations("common");
  const href = `/contact?item=${encodeURIComponent(itemId)}#quote`;

  return (
    <Button
      href={href}
      size={size}
      onClick={() => track("select_hire_item", { item_id: itemId, category })}
      className={className}
    >
      {t("enquire")}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Button>
  );
}
