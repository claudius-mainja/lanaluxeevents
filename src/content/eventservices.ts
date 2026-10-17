import type { ItemPrice } from "./catalogue";

export interface EventServiceItem {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  price: ItemPrice;
  inclusions: string[];
  images: string[];
  /** All event-service work is delivered by arrangement, some via suppliers. */
  availability: "by-arrangement";
  enquiryLabel: string;
}

/**
 * Secondary wedding and broader event-services catalogue.
 * These are delivered by arrangement and some work is subcontracted.
 * They remain a secondary journey and do not lead the homepage.
 */
export const eventServices: EventServiceItem[] = [
  {
    id: "event-full-service",
    slug: "full-service-experience",
    name: "The Full-Service Experience",
    summary:
      "End-to-end wedding and event coordination, handled by arrangement from planning through to the day.",
    description:
      "The full-service experience covers the planning and coordination of your wedding or event from start to finish, by arrangement. It suits couples and hosts who would like someone else to hold the details. Because some elements are brought in through trusted suppliers, the scope and team are confirmed with your tailored quote.",
    price: { type: "range", minMinor: 2200000, maxMinor: 3000000, currency: "ZAR" },
    inclusions: [
      "Planning support through to the event day",
      "Coordination by arrangement, with specialist suppliers brought in as needed",
    ],
    images: ["/images/wedding-decor-f31b2122.jpg"],
    availability: "by-arrangement",
    enquiryLabel: "The Full-Service Experience",
  },
  {
    id: "event-partial-planning",
    slug: "partial-planning",
    name: "Partial Planning",
    summary:
      "Planning support for the parts of your event where you would like a hand.",
    description:
      "Partial planning gives you help with the elements you would like to hand over while you keep the rest. It is a flexible middle ground between doing everything yourself and full coordination. The exact split is agreed with your tailored quote.",
    price: { type: "range", minMinor: 1200000, maxMinor: 1750000, currency: "ZAR" },
    inclusions: ["Planning support for agreed elements of your event"],
    images: ["/images/wedding-monogram-fa7cdc3a.jpg"],
    availability: "by-arrangement",
    enquiryLabel: "Partial Planning",
  },
  {
    id: "event-month-of-coordination",
    slug: "wedding-day-month-of-coordination",
    name: "Wedding Day / Month-Of Coordination",
    summary:
      "On-the-day coordination in the final stretch, so your celebration runs to plan.",
    description:
      "Wedding day and month-of coordination steps in close to your date to manage the run of the day. It is for hosts who have planned their event and want a steady hand on the day itself. The team and hours are confirmed with your tailored quote.",
    price: { type: "range", minMinor: 650000, maxMinor: 950000, currency: "ZAR" },
    inclusions: ["Coordination in the lead-up and on the event day"],
    images: ["/images/wedding-blush-tent-d4cbf6bc.jpg"],
    availability: "by-arrangement",
    enquiryLabel: "Wedding Day / Month-Of Coordination",
  },
  {
    id: "event-rehearsal-dinner",
    slug: "rehearsal-dinner-coordination",
    name: "Rehearsal Dinner Coordination",
    summary: "Coordination for a rehearsal dinner or smaller pre-wedding gathering.",
    description:
      "Rehearsal dinner coordination covers the smaller gathering before the main event. It keeps the evening organised while you focus on your guests. The scope is confirmed with your tailored quote.",
    price: { type: "range", minMinor: 200000, maxMinor: 350000, currency: "ZAR" },
    inclusions: ["Coordination for your rehearsal dinner"],
    images: ["/images/wedding-monogram-fa7cdc3a.jpg"],
    availability: "by-arrangement",
    enquiryLabel: "Rehearsal Dinner Coordination",
  },
  {
    id: "event-extra-hour",
    slug: "extra-on-site-hour",
    name: "Extra On-Site Hour",
    summary: "An additional on-site hour with a coordinator, per coordinator.",
    description:
      "If your celebration runs longer than planned, an extra on-site hour can be added per coordinator. This is an event-service rate and does not apply to party-hire delivery.",
    price: { type: "per-hour", amountMinor: 40000, currency: "ZAR", qualifier: "per coordinator" },
    inclusions: ["One extra on-site hour, per coordinator"],
    images: [],
    availability: "by-arrangement",
    enquiryLabel: "Extra On-Site Hour",
  },
  {
    id: "event-out-of-town-travel",
    slug: "out-of-town-travel-fee",
    name: "Out-of-Town Travel Fee",
    summary:
      "Travel charged per kilometre for event-service work beyond 50 km from the base.",
    description:
      "For event-service work at a venue more than 50 km away, an out-of-town travel fee of R4.50 per kilometre applies. This is specific to the event-service offering and is not a general party-hire delivery rate. Hire delivery is quoted separately for your suburb.",
    price: { type: "per-km", amountMinor: 450, currency: "ZAR", qualifier: "beyond 50 km" },
    inclusions: ["Travel beyond 50 km, charged per kilometre"],
    images: [],
    availability: "by-arrangement",
    enquiryLabel: "Out-of-Town Travel Fee",
  },
];

export function getEventService(id: string): EventServiceItem | undefined {
  return eventServices.find((s) => s.id === id);
}
