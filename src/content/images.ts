export interface ImageRecord {
  file: string;
  src: string;
  width: number;
  height: number;
  /** Alt text based on visible subject. Empty string marks the image decorative. */
  alt: string;
  /** Roles this file is used for in the new site. */
  roles: string[];
  /** Provenance note retained for the handoff. */
  note?: string;
}

/**
 * Local, controlled copies of the client's existing website images.
 * Originals are preserved in Lana_Luxe_Existing_Website_Images/existing-images.
 * These are compressed website-delivered assets, not original camera files.
 */
export const images = {
  hero: {
    file: "hero-356dc1e4.jpg",
    src: "/images/hero-356dc1e4.jpg",
    width: 1080,
    height: 1408,
    alt: "All-white soft play setup with a ball pit and soft shapes for a children's party",
    roles: ["home-hero", "soft-play", "gallery"],
  },
  whiteDomeCastle: {
    file: "white-dome-jumping-castle-a20183f0.jpg",
    src: "/images/white-dome-jumping-castle-a20183f0.jpg",
    width: 1080,
    height: 742,
    alt: "White dome jumping castle with a roof set up outdoors for a celebration",
    roles: ["jumping-castles", "gallery"],
  },
  bubbleHouse: {
    file: "bubble-house-d2867f88.jpg",
    src: "/images/bubble-house-d2867f88.jpg",
    width: 940,
    height: 1600,
    alt: "Clear bubble house inflatable styled with balloons",
    roles: ["bubble-house", "gallery"],
  },
  kidsCombo: {
    file: "kids-combo-17d5ff46.jpg",
    src: "/images/kids-combo-17d5ff46.jpg",
    width: 1067,
    height: 1600,
    alt: "Children's party combo setup with play equipment and party styling",
    roles: ["packages", "gallery"],
  },
  babyShower: {
    file: "baby-shower-0149995b.jpg",
    src: "/images/baby-shower-0149995b.jpg",
    width: 1080,
    height: 980,
    alt: "Baby shower backdrop setting with soft décor for a celebration",
    roles: ["nursery-decor", "gallery"],
  },
  softPlayAndCastle: {
    file: "soft-play-and-jumping-castle.jpeg",
    src: "/images/soft-play-and-jumping-castle.jpeg",
    width: 1080,
    height: 1220,
    alt: "Soft play setup alongside a jumping castle",
    roles: ["home-category"],
  },
  jumpingCastle: {
    file: "jumping-castle.jpeg",
    src: "/images/jumping-castle.jpeg",
    width: 768,
    height: 1024,
    alt: "Jumping castle set up for a celebration",
    roles: ["home-category"],
  },
  partyFun: {
    file: "kids-tiffany-chairs-table-high-chair.jpeg",
    src: "/images/kids-tiffany-chairs-table-high-chair.jpeg",
    width: 735,
    height: 735,
    alt: "Children's party table with Tiffany chairs and a high chair",
    roles: ["home-category"],
  },
  bubbleHouseCategory: {
    file: "bounce-house-only.jpeg",
    src: "/images/bounce-house-only.jpeg",
    width: 1080,
    height: 954,
    alt: "Inflatable bounce house set up for a party",
    roles: ["home-category"],
  },
  balloonDecor: {
    file: "balloon-decor-c3cfebc6.jpg",
    src: "/images/balloon-decor-c3cfebc6.jpg",
    width: 1080,
    height: 1440,
    alt: "Balloon décor arranged for an event",
    roles: ["balloon-decor", "gallery"],
  },
  weddingTent: {
    file: "wedding-blush-tent-d4cbf6bc.jpg",
    src: "/images/wedding-blush-tent-d4cbf6bc.jpg",
    width: 1600,
    height: 900,
    alt: "Wedding reception set beneath a draped marquee with blush styling",
    roles: ["event-services", "gallery"],
  },
  weddingDecor: {
    file: "wedding-decor-f31b2122.jpg",
    src: "/images/wedding-decor-f31b2122.jpg",
    width: 1600,
    height: 1067,
    alt: "Wedding ceremony styling with white florals and draped fabric",
    roles: ["event-services", "gallery"],
  },
  weddingMonogram: {
    file: "wedding-monogram-fa7cdc3a.jpg",
    src: "/images/wedding-monogram-fa7cdc3a.jpg",
    width: 1600,
    height: 1200,
    alt: "Event backdrop with a monogram and soft floral styling",
    roles: ["event-services", "gallery"],
  },
  kidsFlyer: {
    file: "kids-flyer-b1f4c16d.jpg",
    src: "/images/kids-flyer-b1f4c16d.jpg",
    width: 1070,
    height: 1600,
    alt: "Promotional flyer listing kids' party packages and prices",
    roles: ["archive"],
    note: "Promotional flyer. Its useful details are reproduced in accessible HTML; the flyer is not the only source of inclusions or pricing.",
  },
  // The following two files are retained for preservation only. They are
  // not referenced on the public site (see handoff notes).
  birthdayPromo: {
    file: "birthday-83332712.png",
    src: "/images/birthday-83332712.png",
    width: 896,
    height: 1216,
    alt: "",
    roles: ["archive-unused"],
    note: "Reviewed promotional visual; not used on the public site.",
  },
  generic01: {
    file: "image-889e3f06.png",
    src: "/images/image-889e3f06.png",
    width: 1216,
    height: 896,
    alt: "",
    roles: ["archive-unused"],
    note: "Reviewed generic visual; not used on the public site.",
  },

  // ---------------------------------------------------------------------
  // Stock photography for hire items that had no client photo.
  // Source: Wikimedia Commons. Each file is licensed for commercial reuse;
  // see Lana_Luxe_Existing_Website_Images/stock-asset-register.json for the
  // source page, author and licence, and the handoff for attribution text.
  // These illustrate the type of item, not a photograph of Lana's event.
  stockJumpingCastle: {
    file: "stock-jumping-castle.jpg",
    src: "/images/stock-jumping-castle.jpg",
    width: 1600,
    height: 1251,
    alt: "An inflatable jumping castle set up outdoors on grass",
    roles: ["hire-item-stock"],
    note: "Public domain (Arpingstone), Wikimedia Commons.",
  },
  stockBounceHouseOnly: {
    file: "stock-bounce-house-only.jpg",
    src: "/images/stock-bounce-house-only.jpg",
    width: 1600,
    height: 1200,
    alt: "A large bouncy house inflatable at an outdoor event",
    roles: ["hire-item-stock"],
    note: "CC BY-SA 4.0 (Famartin), Wikimedia Commons.",
  },
  stockJumpingCastleTableChairs: {
    file: "stock-jumping-castle-table-chairs.jpg",
    src: "/images/stock-jumping-castle-table-chairs.jpg",
    width: 1067,
    height: 1600,
    alt: "An inflatable bouncy castle set up at an outdoor celebration",
    roles: ["hire-item-stock"],
    note: "CC BY-SA 4.0 (Acabashi), Wikimedia Commons.",
  },
  stockCandyCart: {
    file: "stock-candy-cart.jpg",
    src: "/images/stock-candy-cart.jpg",
    width: 1600,
    height: 1200,
    alt: "A candy cart filled with sweets",
    roles: ["hire-item-stock"],
    note: "CC BY-SA 3.0 (Keizers), Wikimedia Commons.",
  },
  stockCandyCartWithJars: {
    file: "stock-candy-cart-with-jars.jpg",
    src: "/images/stock-candy-cart-with-jars.jpg",
    width: 1600,
    height: 1070,
    alt: "Sweets displayed in glass jars on a candy display",
    roles: ["hire-item-stock"],
    note: "CC BY 2.0 (Matthew Paul Argall), Wikimedia Commons.",
  },
  stockPopcornMachine: {
    file: "stock-popcorn-machine.jpg",
    src: "/images/stock-popcorn-machine.jpg",
    width: 1600,
    height: 1067,
    alt: "Popcorn being prepared in a popcorn machine",
    roles: ["hire-item-stock"],
    note: "CC BY-SA 4.0 (KelvinJM), Wikimedia Commons.",
  },
  stockSlushMachine: {
    file: "stock-slush-machine.jpg",
    src: "/images/stock-slush-machine.jpg",
    width: 1600,
    height: 1570,
    alt: "A slush drink machine dispensing frozen drinks",
    roles: ["hire-item-stock"],
    note: "CC BY-SA 4.0 (Hansmuller), Wikimedia Commons.",
  },
  stockCandyFlossMachine: {
    file: "stock-candy-floss-machine.jpg",
    src: "/images/stock-candy-floss-machine.jpg",
    width: 1600,
    height: 1488,
    alt: "A cotton candy (candy floss) machine",
    roles: ["hire-item-stock"],
    note: "CC BY-SA 4.0 (Salil Kumar Mukherjee), Wikimedia Commons.",
  },
  stockKidsTiffanyChairsTable: {
    file: "stock-kids-tiffany-chairs-table.jpg",
    src: "/images/stock-kids-tiffany-chairs-table.jpg",
    width: 1600,
    height: 1067,
    alt: "A decorated party room with tables, chairs and balloons",
    roles: ["hire-item-stock"],
    note: "CC BY-SA 3.0 (Chandersharma1987), Wikimedia Commons.",
  },
} satisfies Record<string, ImageRecord>;

export type ImageKey = keyof typeof images;
