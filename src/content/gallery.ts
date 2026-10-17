import type { CategoryId } from "./catalogue";
import { images } from "./images";

export type GalleryCategory = CategoryId | "event-services";

export interface GalleryEntry {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: GalleryCategory;
  /** Catalogue item this photograph relates to, when known. */
  itemId?: string;
}

/**
 * A curated collection drawn from the client's existing website images.
 * Only photographs with a known subject are included. The two reviewed
 * promotional/generic visuals are intentionally excluded.
 */
export const gallery: GalleryEntry[] = [
  {
    id: "soft-play-white",
    ...pick("hero"),
    category: "soft-play",
    itemId: "soft-play-all-white-package",
  },
  {
    id: "white-dome-castle",
    ...pick("whiteDomeCastle"),
    category: "jumping-castles",
    itemId: "white-dome-jumping-castle",
  },
  {
    id: "bubble-house",
    ...pick("bubbleHouse"),
    category: "bubble-house",
    itemId: "bubble-house-balloon-garland",
  },
  {
    id: "kids-combo",
    ...pick("kidsCombo"),
    category: "packages",
    itemId: "kids-party-combo-15",
  },
  {
    id: "baby-shower",
    ...pick("babyShower"),
    category: "nursery-decor",
    itemId: "baby-shower-backdrop",
  },
  {
    id: "balloon-decor",
    ...pick("balloonDecor"),
    category: "nursery-decor",
    itemId: "balloon-decor-package",
  },
  {
    id: "wedding-tent",
    ...pick("weddingTent"),
    category: "event-services",
  },
  {
    id: "wedding-decor",
    ...pick("weddingDecor"),
    category: "event-services",
  },
  {
    id: "wedding-backdrop",
    ...pick("weddingMonogram"),
    category: "event-services",
  },
];

function pick(key: keyof typeof images) {
  const image = images[key]!;
  return {
    src: image.src,
    width: image.width,
    height: image.height,
    alt: image.alt,
  };
}

export function getGalleryCategories(): GalleryCategory[] {
  const seen = new Set<GalleryCategory>();
  for (const entry of gallery) seen.add(entry.category);
  return Array.from(seen);
}
