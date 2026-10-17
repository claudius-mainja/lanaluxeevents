import { z } from "zod";

export const priceSchema = z
  .object({
    type: z.enum(["fixed", "range", "per-hour", "per-km"]),
    amountMinor: z.number().int().nonnegative().optional(),
    minMinor: z.number().int().nonnegative().optional(),
    maxMinor: z.number().int().nonnegative().optional(),
    currency: z.literal("ZAR"),
    qualifier: z.string().optional(),
  })
  .superRefine((price, ctx) => {
    if (price.type === "fixed" && price.amountMinor == null) {
      ctx.addIssue({ code: "custom", message: "A fixed price requires amountMinor." });
    }
    if (
      price.type === "range" &&
      (price.minMinor == null || price.maxMinor == null)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "A range price requires minMinor and maxMinor.",
      });
    }
    if (
      (price.type === "per-hour" || price.type === "per-km") &&
      price.amountMinor == null
    ) {
      ctx.addIssue({
        code: "custom",
        message: "A per-hour/per-km price requires amountMinor.",
      });
    }
  });

export const categoryIdSchema = z.enum([
  "soft-play",
  "jumping-castles",
  "party-fun",
  "packages",
  "bubble-house",
  "nursery-decor",
]);

export const catalogueItemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case."),
  category: categoryIdSchema,
  name: z.string().min(1),
  variantName: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  price: priceSchema,
  inclusions: z.array(z.string()),
  requirements: z.array(z.string()),
  images: z.array(z.string()),
  related: z.array(z.string()),
  featured: z.boolean(),
  availability: z.enum(["in-house", "by-arrangement", "supplier"]).optional(),
});

export const eventServiceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  price: priceSchema,
  inclusions: z.array(z.string()),
  images: z.array(z.string()),
  availability: z.literal("by-arrangement"),
  enquiryLabel: z.string().min(1),
});

export const serviceAreaSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  group: z.enum(["johannesburg", "pretoria", "east-rand"]),
  hasPage: z.boolean(),
  blurb: z.string().min(1),
});

export type CatalogueItemInput = z.infer<typeof catalogueItemSchema>;
