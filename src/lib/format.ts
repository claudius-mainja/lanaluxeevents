import type { ItemPrice } from "@/content/catalogue";

/** Formats a minor-unit (cents) amount as "R2,000". */
export function formatZAR(minor: number): string {
  const amount = Math.round(minor / 100);
  return `R${amount.toLocaleString("en-US")}`;
}

/** Formats any approved price shape into a display string. */
export function formatPrice(price: ItemPrice): string {
  switch (price.type) {
    case "fixed":
      return formatZAR(price.amountMinor ?? 0);
    case "range":
      return `${formatZAR(price.minMinor ?? 0)}–${formatZAR(price.maxMinor ?? 0)}`;
    case "per-hour":
      return `${formatZAR(price.amountMinor ?? 0)} / hour${price.qualifier ? ` ${price.qualifier}` : ""}`;
    case "per-km":
      return `R${((price.amountMinor ?? 0) / 100).toFixed(2)} / km${price.qualifier ? ` ${price.qualifier}` : ""}`;
  }
}

/**
 * Formats a "yyyy-mm-dd" date string as a South African friendly date
 * without shifting the day through timezone conversion.
 */
export function formatEventDate(isoDate: string, locale = "en-ZA"): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Today's date in South Africa (Africa/Johannesburg) as "yyyy-mm-dd". */
export function todayInSouthAfrica(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return parts;
}

/** Returns true when an ISO date string is a valid, future (or today) date. */
export function isSelectableDate(isoDate: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return false;
  const [year, month, day] = isoDate.split("-").map(Number) as [number, number, number];
  const selected = Date.UTC(year, month - 1, day);
  const today = todayInSouthAfrica();
  const [ty, tm, td] = today.split("-").map(Number) as [number, number, number];
  return selected >= Date.UTC(ty, tm - 1, td);
}
