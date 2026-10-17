export type FaqPage =
  | "general"
  | "soft-play"
  | "jumping-castles"
  | "party-fun"
  | "packages"
  | "bubble-house"
  | "contact";

export interface Faq {
  /** Message key under `faqs.items.<id>` for `.q` and `.a`. */
  id: string;
  pages: FaqPage[];
}

export const faqs: Faq[] = [
  { id: "how-enquiry", pages: ["general"] },
  { id: "is-it-booked", pages: ["general", "contact"] },
  {
    id: "delivery",
    pages: ["general", "contact", "soft-play", "jumping-castles", "party-fun", "packages", "bubble-house"],
  },
  { id: "price-basis", pages: ["general", "packages"] },
  { id: "combo-contents", pages: ["packages"] },
  { id: "booking-lead-time", pages: ["general", "contact", "packages"] },
  { id: "delivery-cost", pages: ["general", "contact"] },
  { id: "payment", pages: ["general", "contact"] },
  { id: "power-access", pages: ["soft-play", "jumping-castles", "packages"] },
  { id: "space", pages: ["soft-play", "jumping-castles", "packages"] },
  { id: "age-suitability", pages: ["general", "soft-play", "jumping-castles"] },
  { id: "weather", pages: ["general", "jumping-castles", "soft-play"] },
  { id: "setup", pages: ["soft-play", "jumping-castles", "party-fun"] },
  { id: "day-of", pages: ["general", "contact"] },
  { id: "suburb", pages: ["general", "contact"] },
  { id: "own-equipment", pages: ["general"] },
  { id: "languages", pages: ["general", "contact"] },
];

export function getFaqsFor(page: FaqPage | "all"): Faq[] {
  if (page === "all") return faqs;
  return faqs.filter((faq) => faq.pages.includes(page));
}
