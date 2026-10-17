"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cx } from "@/lib/cn";
import type { RevealDirection } from "@/lib/motion";

/**
 * Shared scroll-reveal primitive. Fades and translates content as it enters
 * the viewport using transform/opacity only.
 *
 * Robustness: it never hides content from assistive technology or crawlers.
 * It falls back to visible when reduced motion is requested, when the
 * observer is unavailable, or when scripting is disabled (handled in CSS via
 * `@media (scripting: none)`).
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds. */
  delay?: number;
  direction?: RevealDirection;
  as?: "div" | "li" | "section" | "article" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style =
    delay > 0
      ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
      : undefined;

  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      data-direction={direction}
      style={style}
      className={cx("reveal", className)}
    >
      {children}
    </Tag>
  );
}
