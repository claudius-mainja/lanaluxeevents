export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lanaluxeevents.co.za";

export const site = {
  brand: "Lana Luxe Events",
  /** Short positioning line used in metadata and the footer. */
  tagline: "Soft play, jumping castle and party fun hire",
  url: siteUrl,
  whatsapp: {
    /** Number used in the wa.me destination (international format, no + or spaces). */
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27645440804",
    display: "+27 64 544 0804",
    get href() {
      return `https://wa.me/${this.number}`;
    },
  },
  phone: {
    display: "+27 76 126 5694",
    href: "tel:+27761265694",
  },
  email: {
    display: "hello@lanaluxeevents.co.za",
    href: "mailto:hello@lanaluxeevents.co.za",
  },
} as const;

/**
 * Verified outbound social/profile destinations.
 * URLs were read from the live lanaluxeevents.co.za site.
 */
export const socialLinks: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://instagram.com/lanaluxeevents" },
  { label: "Facebook", href: "https://www.facebook.com/Lanaluxeevents/" },
];
