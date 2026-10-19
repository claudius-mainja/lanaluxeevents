"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cn";

/**
 * Animates a number from 0 to its final value when scrolled into view.
 * Server-rendered HTML always contains the final value, so crawlers and
 * assistive technology see the real number; the animation is skipped when
 * reduced motion is requested.
 */
export default function CountUp({
  value,
  prefix = "",
  duration = 900,
  className,
}: {
  value: number;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => format(value, prefix));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - 2 ** (-10 * t);
            setDisplay(format(t < 1 ? Math.round(value * eased) : value, prefix));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, prefix, duration]);

  return (
    <span ref={ref} className={cx(className)}>
      {display}
    </span>
  );
}

function format(n: number, prefix: string) {
  return `${prefix}${n.toLocaleString("en-US")}`;
}
