"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cx } from "@/lib/cn";

/**
 * Load-time hero entrance. Sets `data-ready` on the next frame so the CSS
 * `.hero-seq` transition runs once, staggering direct descendants marked with
 * `data-seq` (their order is supplied by a `--seq` index).
 *
 * If scripting is unavailable the CSS shows everything by default, and reduced
 * motion is honoured globally, so the hero is never left hidden.
 */
export default function HeroSequence({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div data-ready={ready} className={cx("hero-seq", className)}>
      {children}
    </div>
  );
}
