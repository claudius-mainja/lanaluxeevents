import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background treatment. */
  tone?: "default" | "cream" | "navy" | "white" | "blush" | "lavender" | "aqua" | "pink";
  as?: ElementType;
  id?: string;
  /** Vertical spacing scale. */
  spacing?: "default" | "compact" | "none";
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

const toneClasses = {
  default: "",
  cream: "bg-canvas-2",
  white: "bg-canvas",
  navy: "bg-navy text-cream",
  blush: "bg-blush",
  lavender: "bg-lavender",
  aqua: "bg-aqua",
  pink: "bg-deep-pink text-cream",
};

const spacingClasses = {
  default: "py-[var(--spacing-section)]",
  compact: "py-12 sm:py-16",
  none: "",
};

export default function Section({
  children,
  className,
  tone = "default",
  as: Tag = "section",
  id,
  spacing = "default",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cx(toneClasses[tone], spacingClasses[spacing], className)}
      {...rest}
    >
      <div className="container-content">{children}</div>
    </Tag>
  );
}
