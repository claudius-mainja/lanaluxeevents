import Image from "next/image";
import { cx } from "@/lib/cn";

/**
 * Brand logo lockup built from the supplied transparent logo artwork.
 * Sized by height so the emblem and wordmark read clearly in both the light
 * header and the dark footer. `onDark` is retained for API compatibility.
 */
export default function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Image
      src={onDark ? "/brand/logo-on-dark.png" : "/brand/logo.png"}
      alt="Lana Luxe Events"
      width={640}
      height={401}
      priority
      sizes="(max-width: 1023px) 100px, 116px"
      className={cx("h-14 w-auto lg:h-16", className)}
    />
  );
}
