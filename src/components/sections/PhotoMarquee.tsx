import Image from "next/image";
import { gallery } from "@/content/gallery";

/**
 * Decorative photo ticker, echoing the Square Fish logo marquee. It is purely
 * visual, so the whole strip is hidden from assistive technology — the Gallery
 * section below carries the accessible, described photographs.
 */
export default function PhotoMarquee() {
  const entries = [...gallery, ...gallery];

  return (
    <div className="border-y border-line py-6">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {entries.map((entry, index) => (
            <div
              key={`${entry.id}-${index}`}
              className="mr-4 w-56 shrink-0 sm:w-64"
            >
              <div className="media-card">
                <Image
                  src={entry.src}
                  alt=""
                  width={entry.width}
                  height={entry.height}
                  sizes="256px"
                  className="h-36 w-full object-cover sm:h-40"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
