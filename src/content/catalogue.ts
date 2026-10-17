export type CategoryId =
  | "soft-play"
  | "jumping-castles"
  | "party-fun"
  | "packages"
  | "bubble-house"
  | "nursery-decor";

export interface Category {
  id: CategoryId;
  /** Message key under the `categories` namespace for the public label. */
  labelKey: string;
  /** Stable URL for the primary category landing page, when one exists. */
  href: string | null;
  /** Whether this category has a dedicated primary landing page. */
  primary: boolean;
}

export const categories: Category[] = [
  { id: "soft-play", labelKey: "softPlay", href: "/soft-play-hire", primary: true },
  { id: "jumping-castles", labelKey: "jumpingCastles", href: "/jumping-castle-hire", primary: true },
  { id: "party-fun", labelKey: "partyFun", href: "/party-fun-hire", primary: true },
  { id: "packages", labelKey: "packages", href: "/party-hire-packages", primary: false },
  { id: "bubble-house", labelKey: "bubbleHouse", href: "/bubble-house-hire", primary: false },
  { id: "nursery-decor", labelKey: "nurseryDecor", href: null, primary: false },
];

/** Resolve the `categories` message key for a category id. */
export function categoryLabelKey(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.labelKey ?? id;
}

export type PriceType = "fixed" | "range" | "per-hour" | "per-km";

export interface ItemPrice {
  type: PriceType;
  /** Price in minor units (cents). */
  amountMinor?: number;
  minMinor?: number;
  maxMinor?: number;
  currency: "ZAR";
  /** Optional short qualifier shown next to the price, e.g. "per coordinator". */
  qualifier?: string;
}

export interface CatalogueItem {
  /** Stable catalogue ID — used in enquiry messages and analytics. */
  id: string;
  slug: string;
  category: CategoryId;
  /** Public-facing title. */
  name: string;
  /** Original published variant name, retained for the team's reference. */
  variantName: string;
  summary: string;
  description: string;
  price: ItemPrice;
  inclusions: string[];
  /**
   * Practical requirements (space, power, access). Left empty where the
   * information has not been verified rather than inventing a value.
   */
  requirements: string[];
  images: string[];
  related: string[];
  /** Whether the item is highlighted on the homepage and category pages. */
  featured: boolean;
  /** Set when the item is offered by arrangement or is subcontracted. */
  availability?: "in-house" | "by-arrangement" | "supplier";
}

/**
 * Approved hire catalogue. Prices are the published, approved ZAR amounts.
 * Inclusion wording describes only what the item name and supplied facts
 * support. Full inclusions, space and power requirements are confirmed with
 * every quote (see src/content/handoff.md).
 */
export const catalogue: CatalogueItem[] = [
  // ---------------------------------------------------------------- Soft Play
  {
    id: "soft-play-all-white-package",
    slug: "all-white-soft-play-package",
    category: "soft-play",
    name: "All-White Soft Play Package",
    variantName: "All-White Soft Play Package",
    summary:
      "A clean, all-white soft play setup that suits bright, modern children's parties.",
    description:
      "The all-white soft play package brings a soft, coordinated play area to your venue. The pale palette keeps the space bright and photographs beautifully, and it works in a lounge, a hall or under a marquee. Choose this option when you want the play area to match a soft, neutral celebration.",
    price: { type: "fixed", amountMinor: 200000, currency: "ZAR" },
    inclusions: [
      "The all-white soft play equipment set",
      "Setup of the soft play area for your event",
    ],
    requirements: [],
    images: ["/images/hero-356dc1e4.jpg"],
    related: ["kids-party-combo-10", "kids-party-combo-15", "jumping-castle"],
    featured: true,
  },

  // --------------------------------------------------------- Jumping Castles
  {
    id: "jumping-castle",
    slug: "jumping-castle",
    category: "jumping-castles",
    name: "Jumping Castle",
    variantName: "Jumping Castle",
    summary: "A classic jumping castle for hours of active play at your celebration.",
    description:
      "The standard jumping castle is the dependable centrepiece for a children's party. It gives children room to bounce and burn off energy while the rest of the celebration carries on around it. Tell us your date and suburb and we will confirm availability for your area.",
    price: { type: "fixed", amountMinor: 150000, currency: "ZAR" },
    inclusions: ["The jumping castle for your event"],
    requirements: [],
    images: ["/images/stock-jumping-castle.jpg"],
    related: ["white-dome-jumping-castle", "jumping-castle-table-chairs", "kids-party-combo-15"],
    featured: true,
  },
  {
    id: "bounce-house-only",
    slug: "bounce-house-only",
    category: "jumping-castles",
    name: "Bounce House Only",
    variantName: "Bounce House Only",
    summary: "The bounce house on its own, without the extra add-ons.",
    description:
      "Choose the bounce house on its own when you already have your own tables, chairs and décor in place. It keeps the focus on the inflatable while you handle the rest of the setup. This is a different product from the combined castle-and-furniture option.",
    price: { type: "fixed", amountMinor: 250000, currency: "ZAR" },
    inclusions: ["The bounce house for your event"],
    requirements: [],
    images: ["/images/stock-bounce-house-only.jpg"],
    related: ["jumping-castle", "jumping-castle-table-chairs"],
    featured: false,
  },
  {
    id: "jumping-castle-table-chairs",
    slug: "jumping-castle-table-chairs",
    category: "jumping-castles",
    name: "Jumping Castle + Table & 10 Chairs",
    variantName: "Jumping Castle + Table & 10 Chairs",
    summary:
      "A jumping castle paired with a table and ten chairs so children can bounce and then sit to eat.",
    description:
      "This combination adds a table and ten chairs to the jumping castle, so the party has a place to play and a place to gather. It is a practical choice when you want the play and the party table in one booking. No other furniture is included beyond the table and ten chairs.",
    price: { type: "fixed", amountMinor: 250000, currency: "ZAR" },
    inclusions: ["The jumping castle for your event", "One table and ten chairs"],
    requirements: [],
    images: ["/images/stock-jumping-castle-table-chairs.jpg"],
    related: ["jumping-castle", "bounce-house-only", "kids-party-combo-20"],
    featured: false,
  },
  {
    id: "white-dome-jumping-castle",
    slug: "luxurious-white-dome-jumping-castle",
    category: "jumping-castles",
    name: "Luxurious White Dome Jumping Castle With Roof",
    variantName: "Luxurious White Dome Jumping Castle With Roof",
    summary:
      "A white dome jumping castle with a roof — a soft, sculptural centrepiece for a dressed-up party.",
    description:
      "The white dome jumping castle with roof brings a rounded, all-white shape to your setup. Its covered dome gives the castle a finished, elegant look that suits neutral styling and photographs well. This is a distinct product from the standard jumping castle.",
    price: { type: "fixed", amountMinor: 260000, currency: "ZAR" },
    inclusions: [
      "The white dome jumping castle with roof",
      "Setup of the castle for your event",
    ],
    requirements: [],
    images: ["/images/white-dome-jumping-castle-a20183f0.jpg"],
    related: ["jumping-castle", "kids-party-combo-20", "soft-play-all-white-package"],
    featured: true,
  },

  // --------------------------------------------------------------- Party Fun
  {
    id: "candy-cart",
    slug: "candy-cart",
    category: "party-fun",
    name: "Candy Cart",
    variantName: "Candy Cart",
    summary: "A candy cart that doubles as a sweet display and a styling feature.",
    description:
      "The candy cart gives your celebration a sweet focal point. It works as a display for treats you supply, or simply as a charming styled piece alongside the rest of your setup. This option is the cart itself.",
    price: { type: "fixed", amountMinor: 110000, currency: "ZAR" },
    inclusions: ["The candy cart for your event"],
    requirements: [],
    images: ["/images/stock-candy-cart.jpg"],
    related: ["candy-cart-with-jars", "popcorn-machine", "candy-floss-machine"],
    featured: true,
  },
  {
    id: "candy-cart-with-jars",
    slug: "candy-cart-with-jars",
    category: "party-fun",
    name: "Candy Cart with Jars",
    variantName: "Candy Cart with Jars",
    summary: "The candy cart supplied with display jars for a fuller sweet table.",
    description:
      "This version of the candy cart includes display jars, giving the setup a fuller, more considered look. It is the right choice when you want the sweets presented in jars across the cart. Sweets themselves are not included unless confirmed with your quote.",
    price: { type: "fixed", amountMinor: 135000, currency: "ZAR" },
    inclusions: ["The candy cart for your event", "Display jars"],
    requirements: [],
    images: ["/images/stock-candy-cart-with-jars.jpg"],
    related: ["candy-cart", "candy-floss-machine", "popcorn-machine"],
    featured: false,
  },
  {
    id: "popcorn-machine",
    slug: "popcorn-machine",
    category: "party-fun",
    name: "Popcorn Machine",
    variantName: "Popcorn Machine",
    summary: "A popcorn machine to add a warm, fresh-popped snack to your party.",
    description:
      "The popcorn machine brings a classic party treat to your celebration. It suits both children's parties and family gatherings that need a little something extra to eat. Consumables and servicing are confirmed with your quote.",
    price: { type: "fixed", amountMinor: 115000, currency: "ZAR" },
    inclusions: ["The popcorn machine for your event"],
    requirements: [],
    images: ["/images/stock-popcorn-machine.jpg"],
    related: ["candy-floss-machine", "slush-machine", "candy-cart"],
    featured: false,
  },
  {
    id: "slush-machine",
    slug: "slush-machine",
    category: "party-fun",
    name: "Slush Machine + Consumables",
    variantName: "Slush Machine + Consumables",
    summary: "A slush machine supplied together with consumables for cold drinks all party long.",
    description:
      "This option pairs the slush machine with consumables, so there is something cold and refreshing on hand for the children. It is a good fit for warmer-weather parties and longer celebrations.",
    price: { type: "fixed", amountMinor: 180000, currency: "ZAR" },
    inclusions: ["The slush machine for your event", "Consumables for the machine"],
    requirements: [],
    images: ["/images/stock-slush-machine.jpg"],
    related: ["popcorn-machine", "candy-floss-machine", "candy-cart-with-jars"],
    featured: false,
  },
  {
    id: "candy-floss-machine",
    slug: "candy-floss-machine",
    category: "party-fun",
    name: "Candy Floss Machine",
    variantName: "Candy Floss Machine",
    summary: "A candy floss machine for a classic, colourful party treat.",
    description:
      "The candy floss machine adds a familiar favourite to your party. It works well alongside a candy cart or popcorn machine to build a small treat corner. Consumables are confirmed with your quote.",
    price: { type: "fixed", amountMinor: 140000, currency: "ZAR" },
    inclusions: ["The candy floss machine for your event"],
    requirements: [],
    images: ["/images/stock-candy-floss-machine.jpg"],
    related: ["candy-cart", "popcorn-machine", "slush-machine"],
    featured: false,
  },

  // -------------------------------------------------------------- Bubble House
  {
    id: "bubble-house-100-balloons",
    slug: "bubble-house-100-balloons",
    category: "bubble-house",
    name: "Bubble House with 100 Balloons",
    variantName: "Bubble House with 100 Balloons",
    summary: "A bubble house styled with 100 balloons for a soft, rounded focal point.",
    description:
      "The bubble house is a large, clear inflatable dome that children love to play inside. In this option it is dressed with 100 balloons, adding a soft, colourful frame to the setup. Availability is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 250000, currency: "ZAR" },
    inclusions: ["The bubble house for your event", "100 balloons"],
    requirements: [],
    images: ["/images/bubble-house-d2867f88.jpg"],
    related: ["bubble-house-balloon-garland", "bubble-house-package", "balloon-decor-package"],
    featured: true,
  },
  {
    id: "bubble-house-balloon-garland",
    slug: "bubble-house-balloon-garland",
    category: "bubble-house",
    name: "Bubble House with Balloon Garland",
    variantName: "Bubble House with Balloon Garland",
    summary: "A bubble house finished with a balloon garland rather than loose balloons.",
    description:
      "This version of the bubble house is finished with a balloon garland, giving the dome a fuller, more sculpted surround. It suits celebrations where the styling matters as much as the play. Availability is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 350000, currency: "ZAR" },
    inclusions: ["The bubble house for your event", "A balloon garland"],
    requirements: [],
    images: ["/images/bubble-house-d2867f88.jpg"],
    related: ["bubble-house-100-balloons", "bubble-house-package", "balloon-decor-package"],
    featured: true,
  },
  {
    id: "bubble-house-package",
    slug: "bubble-house-package",
    category: "bubble-house",
    name: "Bubble House Package",
    variantName: "Bubble House Package",
    summary: "The full bubble house package, combining the dome with its styling.",
    description:
      "The bubble house package brings the bubble house together with its styling as a complete setup. It is the option to choose when you want the dome and its dressing arranged as one booking. Availability is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 360000, currency: "ZAR" },
    inclusions: ["The bubble house for your event", "The associated styling for the setup"],
    requirements: [],
    images: ["/images/bubble-house-d2867f88.jpg"],
    related: ["bubble-house-100-balloons", "bubble-house-balloon-garland", "balloon-decor-package"],
    featured: false,
  },

  // --------------------------------------------------------------- Packages
  {
    id: "kids-party-combo-10",
    slug: "kids-party-combo-10-children",
    category: "packages",
    name: "Kids Party Combo — 10 children",
    variantName: "Kids Party Combo — 10 children",
    summary: "A combined party setup sized for 10 children.",
    description:
      "The Kids Party Combo brings hire items together into one setup for 10 children. It is a simple way to cover the play and party essentials in a single booking. The exact combination of items is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 400000, currency: "ZAR" },
    inclusions: ["A combined party setup for 10 children"],
    requirements: [],
    images: ["/images/kids-combo-17d5ff46.jpg"],
    related: ["kids-party-combo-15", "soft-play-all-white-package", "jumping-castle"],
    featured: true,
  },
  {
    id: "kids-party-combo-15",
    slug: "kids-party-combo-15-children",
    category: "packages",
    name: "Kids Party Combo — 15 children",
    variantName: "Kids Party Combo — 15 children",
    summary: "The combined party setup, sized for 15 children.",
    description:
      "This tier of the Kids Party Combo is sized for 15 children. It scales the celebration up while keeping the same all-in-one approach. The exact combination of items is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 450000, currency: "ZAR" },
    inclusions: ["A combined party setup for 15 children"],
    requirements: [],
    images: ["/images/kids-combo-17d5ff46.jpg"],
    related: ["kids-party-combo-10", "kids-party-combo-20", "jumping-castle"],
    featured: true,
  },
  {
    id: "kids-party-combo-20",
    slug: "kids-party-combo-20-children",
    category: "packages",
    name: "Kids Party Combo — 20 children",
    variantName: "Kids Party Combo — 20 children",
    summary: "The combined party setup, sized for 20 children.",
    description:
      "This tier of the Kids Party Combo is sized for 20 children. It keeps the play and party essentials in one booking for a larger group. The exact combination of items is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 500000, currency: "ZAR" },
    inclusions: ["A combined party setup for 20 children"],
    requirements: [],
    images: ["/images/kids-combo-17d5ff46.jpg"],
    related: ["kids-party-combo-15", "kids-party-combo-30", "white-dome-jumping-castle"],
    featured: true,
  },
  {
    id: "kids-party-combo-30",
    slug: "kids-party-combo-30-children",
    category: "packages",
    name: "Kids Party Combo — 30 children",
    variantName: "Kids Party Combo — 30 children",
    summary: "The largest Kids Party Combo tier, sized for 30 children.",
    description:
      "The 30-child tier of the Kids Party Combo is our largest combined setup. It is designed for bigger celebrations while keeping the booking in one place. The exact combination of items is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 550000, currency: "ZAR" },
    inclusions: ["A combined party setup for 30 children"],
    requirements: [],
    images: ["/images/kids-combo-17d5ff46.jpg"],
    related: ["kids-party-combo-20", "white-dome-jumping-castle", "jumping-castle-table-chairs"],
    featured: false,
  },

  // --------------------------------------------------------- Nursery / Décor
  {
    id: "kids-tiffany-chairs-table",
    slug: "kids-tiffany-chairs-table-high-chair",
    category: "nursery-decor",
    name: "Kids Tiffany Chairs, 10 Seater Table & High Chair",
    variantName: "Kids Tiffany Chairs, 10 Seater Table & High Chair",
    summary:
      "A children's table dressed with Tiffany chairs, seating ten, plus a high chair.",
    description:
      "This setup gives the children their own table, using Tiffany chairs for a neat, coordinated look. It seats ten, with a high chair included for the youngest guest. It is a comfortable addition to a styled party.",
    price: { type: "fixed", amountMinor: 200000, currency: "ZAR" },
    inclusions: [
      "A 10-seater children's table",
      "Tiffany chairs",
      "One high chair",
    ],
    requirements: [],
    images: ["/images/stock-kids-tiffany-chairs-table.jpg"],
    related: ["kids-party-combo-20", "baby-shower-backdrop", "balloon-decor-package"],
    featured: false,
  },
  {
    id: "baby-shower-backdrop",
    slug: "baby-shower-backdrop-setting",
    category: "nursery-decor",
    name: "Baby Shower Backdrop Setting",
    variantName: "Baby Shower Backdrop Setting",
    summary: "A backdrop setting to define the look of a baby shower or celebration.",
    description:
      "The baby shower backdrop setting creates a soft, defined focal point for a shower or naming celebration. It frames the photographs and gives the room a considered feel. The exact setting is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 280000, currency: "ZAR" },
    inclusions: ["The baby shower backdrop setting"],
    requirements: [],
    images: ["/images/baby-shower-0149995b.jpg"],
    related: ["balloon-decor-package", "kids-tiffany-chairs-table", "candy-cart-with-jars"],
    featured: true,
  },
  {
    id: "balloon-decor-package",
    slug: "balloon-decor-package",
    category: "nursery-decor",
    name: "Balloon Decor Package",
    variantName: "Balloon Decor Package",
    summary: "Balloon styling to add colour and shape to your celebration.",
    description:
      "The balloon decor package brings balloons into the space as décor, tying the styling together. It works alongside a backdrop, a soft play setup or a bubble house. The exact arrangement is confirmed with your quote.",
    price: { type: "fixed", amountMinor: 200000, currency: "ZAR" },
    inclusions: ["Balloon décor for your event"],
    requirements: [],
    images: ["/images/balloon-decor-c3cfebc6.jpg"],
    related: ["baby-shower-backdrop", "bubble-house-balloon-garland", "kids-tiffany-chairs-table"],
    featured: true,
  },
];

export function getItem(id: string): CatalogueItem | undefined {
  return catalogue.find((item) => item.id === id);
}

export function getItemBySlug(slug: string): CatalogueItem | undefined {
  return catalogue.find((item) => item.slug === slug);
}

export function getItemsByCategory(category: CategoryId): CatalogueItem[] {
  return catalogue.filter((item) => item.category === category);
}

export function getFeaturedItems(): CatalogueItem[] {
  return catalogue.filter((item) => item.featured);
}
