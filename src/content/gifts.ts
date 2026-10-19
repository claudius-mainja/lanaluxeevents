export interface GiftItem {
  id: string;
  name: string;
  priceMinor: number;
  description: string;
}

export const gifts: GiftItem[] = [
  {
    id: "balloon-box-small",
    name: "Balloons + Small Empty Balloon Box",
    priceMinor: 25000,
    description: "Balloons (colours of your choice), small empty balloon box, ribbon with bow.",
  },
  {
    id: "hamper-basic",
    name: "Basic Balloon Hamper",
    priceMinor: 40000,
    description:
      "Small balloon box / Bobo balloon. Snacks inside (customised to suit you). Wafer sticks (100g), toppers / Oreos, chocolate slab (80g), juice / Redbull / cold drink.",
  },
  {
    id: "hamper-medium",
    name: "Medium Balloon Hamper",
    priceMinor: 55000,
    description:
      "Medium balloon box / Bobo balloons. Snacks inside (customised to suit you). Wafer sticks (300g), toppers / Oreos, chocolate slab (150g), juice / Redbull / cold drink x 2.",
  },
  {
    id: "hamper-large",
    name: "Large Balloon Hamper",
    priceMinor: 65000,
    description:
      "Large balloon box / Bobo balloons. Snacks inside (customised to suit you). Wafer sticks (370g), biscuits (200g), assorted chocolate box (125g), juice / Redbull / cold drink x 3.",
  },
  {
    id: "exam-care",
    name: "Exam / Student Care Package",
    priceMinor: 55000,
    description:
      "Medium balloon box. Snacks inside (customised to suit you). Wentos gum (61g), BioPlus sachets x 4, chocolate slab (80g), Red Bull (250ml) x 4, 3 x highlighters, sticky notes, 3 x pens and notebook.",
  },
  {
    id: "ferrero-16",
    name: "Ferrero Rocher Hot Air Balloon - 16",
    priceMinor: 80000,
    description: "16 Ferrero Rochers, beautifully presented.",
  },
  {
    id: "ferrero-24",
    name: "Ferrero Rocher Hot Air Balloon - 24",
    priceMinor: 122300,
    description: "24 Ferrero Rochers, beautifully presented.",
  },
];

/** Ids featured in the home-page gift preview, in display order. */
export const featuredGiftIds = ["hamper-basic", "ferrero-16", "exam-care"] as const;

export const featuredGifts = featuredGiftIds
  .map((id) => gifts.find((gift) => gift.id === id))
  .filter((gift): gift is GiftItem => Boolean(gift));

/** Optional extras shown alongside the gift range. */
export const giftAddOns: { label: string; price: string }[] = [
  { label: "Balloons + small empty balloon box", price: "+R250" },
  { label: "Medium empty balloon box", price: "+R350" },
  { label: "Customised message", price: "+R50" },
  { label: "Confetti", price: "+R5" },
  { label: "Balloons inside", price: "+R15" },
  { label: "Confetti & balloons inside", price: "+R30" },
  { label: "2 x butterflies", price: "+R10" },
  { label: "Blanket", price: "+R100" },
];
