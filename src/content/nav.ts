export interface NavItem {
  href: string;
  /** Message key. */
  labelKey: string;
  /** Namespace the labelKey lives in. Defaults to "nav". */
  namespace?: "nav" | "categories";
  children?: NavItem[];
  /** Whether this item is emphasised. */
  emphasis?: boolean;
}

/**
 * Primary navigation, shared by the desktop header, mobile menu and footer.
 * The home/landing page is reached through the logo, not a menu item.
 */
export const primaryNav: NavItem[] = [
  { href: "/collection", labelKey: "hire" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "eventServices" },
  { href: "/contact", labelKey: "contact" },
];

/** Hire links for the footer. */
export const footerHireLinks: NavItem[] = [
  { href: "/soft-play-hire", labelKey: "softPlay", namespace: "categories" },
  { href: "/jumping-castle-hire", labelKey: "jumpingCastles", namespace: "categories" },
  { href: "/party-fun-hire", labelKey: "partyFun", namespace: "categories" },
  { href: "/party-hire-packages", labelKey: "packages" },
  { href: "/bubble-house-hire", labelKey: "bubbleHouse", namespace: "categories" },
  { href: "/collection", labelKey: "collection" },
];

/** Secondary "explore" links. */
export const footerExploreLinks: NavItem[] = [
  { href: "/gallery", labelKey: "gallery" },
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "eventServices" },
  { href: "/service-areas", labelKey: "serviceAreas" },
  { href: "/faqs", labelKey: "faqs" },
  { href: "/contact", labelKey: "contact" },
];

export const footerLegalLinks: NavItem[] = [
  { href: "/privacy", labelKey: "privacy" },
  { href: "/hire-terms", labelKey: "terms" },
];
