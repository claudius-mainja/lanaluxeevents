import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { GiftItem } from "@/content/gifts";
import { formatPrice } from "@/lib/format";
import { cx } from "@/lib/cn";

const cardBase =
  "group flex h-full flex-col rounded-frame border border-line bg-white surface-raised p-6 sm:p-7";

/**
 * Image-less gift card: a gold rule, the gift name, what it contains and a
 * price-led footer. Two shapes are supported so the home preview and the
 * full range stay visually identical:
 * - `href`   whole card links through to the full range (home preview)
 * - `action` footer link on the right (the gifts page "Enquire" link)
 */
export default function GiftCard({
  gift,
  href,
  action,
  headingLevel = "h3",
}: {
  gift: GiftItem;
  /** When set, the whole card becomes a link to this destination. */
  href?: string;
  /** Footer content for the right-hand side when the card is not a link. */
  action?: ReactNode;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const price = formatPrice({
    type: "fixed",
    amountMinor: gift.priceMinor,
    currency: "ZAR",
  });

  const content = (
    <>
      <span aria-hidden="true" className="block h-px w-12 bg-gold" />
      <Heading className="mt-5 font-display text-xl leading-snug text-navy">
        {gift.name}
      </Heading>
      <p className="mt-3 flex-1 text-sm text-navy-300">{gift.description}</p>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-gold/30 pt-4">
        <p className="font-display text-2xl text-navy">{price}</p>
        {href ? (
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 text-deep-pink transition-transform group-hover:translate-x-1"
          />
        ) : (
          action
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cx(
          cardBase,
          "hover:-translate-y-1 motion-safe:duration-300 motion-safe:transition-[transform,border-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-pink",
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={cx(
        cardBase,
        "hover:-translate-y-1 hover:border-gold/40 motion-safe:duration-300 motion-safe:transition-[transform,border-color,box-shadow]",
      )}
    >
      {content}
    </article>
  );
}
