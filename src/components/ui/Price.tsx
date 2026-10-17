import type { ItemPrice } from "@/content/catalogue";
import { formatPrice } from "@/lib/format";
import { cx } from "@/lib/cn";

export default function Price({
  price,
  className,
  note,
}: {
  price: ItemPrice;
  className?: string;
  note?: string;
}) {
  return (
    <p className={cx("flex flex-col", className)}>
      <span className="font-display text-2xl text-navy">
        {formatPrice(price)}
      </span>
      {note ? (
        <span className="mt-1 text-2xs uppercase tracking-widest text-navy-300">
          {note}
        </span>
      ) : null}
    </p>
  );
}
