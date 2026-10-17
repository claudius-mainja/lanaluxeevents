import { cx } from "@/lib/cn";

export default function Eyebrow({
  children,
  className,
  tone = "navy",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "navy" | "gold" | "cream";
}) {
  const toneClass =
    tone === "gold"
      ? "text-gold-dark"
      : tone === "cream"
        ? "text-cream/80"
        : "text-navy-300";

  return (
    <p
      className={cx(
        "flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.22em]",
        toneClass,
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
      {children}
    </p>
  );
}
