import { z } from "zod";
import { isSelectableDate } from "./format";

export const OTHER_SUBURB = "other";

export const quoteFormSchema = z
  .object({
    itemId: z.string().optional().default(""),
    firstName: z
      .string()
      .trim()
      .min(1, { message: "firstNameRequired" })
      .max(60, { message: "firstNameTooLong" }),
    suburb: z.string().min(1, { message: "suburbRequired" }),
    otherSuburb: z.string().trim().max(80, { message: "otherSuburbTooLong" }).optional(),
    dateNotDecided: z.boolean().default(false),
    eventDate: z.string().optional(),
    notes: z.string().trim().max(500, { message: "notesTooLong" }).optional(),
    callback: z
      .string()
      .trim()
      .refine(
        (value) =>
          !value ||
          /^[+()\d][\d\s()+-]{7,}$/.test(value),
        { message: "callbackInvalid" },
      )
      .optional(),
  })
  .superRefine((values, ctx) => {
    if (values.suburb === OTHER_SUBURB && !values.otherSuburb?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["otherSuburb"],
        message: "otherSuburbRequired",
      });
    }
    if (!values.dateNotDecided) {
      if (!values.eventDate) {
        ctx.addIssue({
          code: "custom",
          path: ["eventDate"],
          message: "dateRequired",
        });
      } else if (!isSelectableDate(values.eventDate)) {
        ctx.addIssue({
          code: "custom",
          path: ["eventDate"],
          message: "dateInvalid",
        });
      }
    }
  });

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
export type QuoteFormInput = z.input<typeof quoteFormSchema>;

export interface EnquiryInput {
  itemId: string;
  itemName: string;
  firstName: string;
  suburb: string;
  eventDate?: string;
  dateNotDecided: boolean;
  notes?: string;
  callback?: string;
  localeLabel: string;
}

function humanDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, y, m, d] = match;
  const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Builds the prefilled WhatsApp enquiry message exactly as specified. */
export function buildEnquiryMessage(input: EnquiryInput): string {
  const subject = input.itemName
    ? `${input.itemName}`
    : "your party hire";

  const lines = [
    `Hi Lana Luxe Events, I'd like a quote for ${subject}.`,
  ];

  if (input.itemId) lines.push(`Item reference: ${input.itemId}`);
  lines.push(`Name: ${input.firstName}`);
  lines.push(
    `Event date: ${
      input.dateNotDecided || !input.eventDate
        ? "not decided"
        : `${input.eventDate} (${humanDate(input.eventDate)})`
    }`,
  );
  lines.push(`Area: ${input.suburb}`);
  if (input.notes?.trim()) lines.push(`Notes: ${input.notes.trim()}`);
  if (input.callback?.trim()) lines.push(`Callback number: ${input.callback.trim()}`);
  lines.push(`Preferred language: ${input.localeLabel}`);
  lines.push("Please confirm availability and the total including delivery.");

  return lines.join("\n");
}

/** Builds the full wa.me destination URL with a URL-encoded message. */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
