import { existsSync } from "node:fs";
import path from "node:path";
import { categories, catalogue } from "@/content/catalogue";
import { eventServices } from "@/content/eventservices";
import { serviceAreas } from "@/content/areas";
import {
  catalogueItemSchema,
  eventServiceSchema,
  serviceAreaSchema,
} from "@/lib/schema";

function assertImageExists(src: string, context: string) {
  if (!src.startsWith("/images/")) {
    throw new Error(`[content] ${context}: image "${src}" must live under /images/.`);
  }
  const diskPath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  if (!existsSync(diskPath)) {
    throw new Error(`[content] ${context}: image "${src}" not found in public/.`);
  }
}

let validated = false;

/**
 * Validates the structured content with Zod and cross-references.
 * Runs once per server process; throws with a helpful message at build time
 * when required content is missing or an image reference is broken.
 */
export function assertValidContent() {
  if (validated) return;
  validated = true;

  const itemIds = new Set<string>();
  const slugs = new Set<string>();

  for (const item of catalogue) {
    const result = catalogueItemSchema.safeParse(item);
    if (!result.success) {
      throw new Error(
        `[content] Catalogue item "${item.id}" is invalid: ${result.error.message}`,
      );
    }
    if (itemIds.has(item.id)) {
      throw new Error(`[content] Duplicate catalogue item id "${item.id}".`);
    }
    itemIds.add(item.id);
    if (slugs.has(item.slug)) {
      throw new Error(`[content] Duplicate catalogue slug "${item.slug}".`);
    }
    slugs.add(item.slug);
    item.images.forEach((img) => assertImageExists(img, `item "${item.id}"`));
  }

  for (const item of catalogue) {
    for (const relatedId of item.related) {
      if (!itemIds.has(relatedId)) {
        throw new Error(
          `[content] Item "${item.id}" references unknown related item "${relatedId}".`,
        );
      }
    }
  }

  const categoryIds = new Set(categories.map((c) => c.id));
  for (const item of catalogue) {
    if (!categoryIds.has(item.category)) {
      throw new Error(`[content] Item "${item.id}" has unknown category "${item.category}".`);
    }
  }

  const serviceIds = new Set<string>();
  for (const service of eventServices) {
    const result = eventServiceSchema.safeParse(service);
    if (!result.success) {
      throw new Error(
        `[content] Event service "${service.id}" is invalid: ${result.error.message}`,
      );
    }
    if (serviceIds.has(service.id)) {
      throw new Error(`[content] Duplicate event service id "${service.id}".`);
    }
    serviceIds.add(service.id);
    service.images.forEach((img) => assertImageExists(img, `event service "${service.id}"`));
  }

  for (const area of serviceAreas) {
    const result = serviceAreaSchema.safeParse(area);
    if (!result.success) {
      throw new Error(
        `[content] Service area "${area.id}" is invalid: ${result.error.message}`,
      );
    }
  }
}
