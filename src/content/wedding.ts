/**
 * Wedding & Planning content, carried across from the client's existing
 * lanaluxeevents.co.za/services page and re-presented in the new design system.
 * Images are the client's own assets (already stored under /public/images).
 */

export interface WeddingOffering {
  id: string;
  title: string;
  blurb: string;
  points: string[];
  image: string;
  imageAlt: string;
}

export interface WeddingPackage {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  best: string;
  features: string[];
}

export interface WeddingGalleryItem {
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
}

export const weddingOfferings: WeddingOffering[] = [
  {
    id: "decor-styling",
    title: "Wedding Décor & Styling",
    blurb:
      "Luxury tent draping, monogram backdrops, floral tablescapes, aisle styling and reception design — crafted for elegant Johannesburg and Pretoria weddings.",
    points: [
      "Tent & ceiling draping",
      "Monogram & sweetheart backdrops",
      "Tablescapes, florals & centrepieces",
      "Lounge, bar and photo moments",
    ],
    image: "/images/wedding-decor-f31b2122.jpg",
    imageAlt: "White draped wedding ceremony styling with soft floral accents",
  },
  {
    id: "full-planning",
    title: "Full Wedding Planning",
    blurb:
      "End-to-end planning from concept to execution. We manage vendors, timelines, budgets and logistics so you can be fully present on the day.",
    points: [
      "Concept & design direction",
      "Vendor sourcing & management",
      "Day-of coordination",
    ],
    image: "/images/wedding-blush-tent-d4cbf6bc.jpg",
    imageAlt: "Blush-draped wedding reception tent with elegant seating",
  },
  {
    id: "partial-planning",
    title: "Partial Planning & Coordination",
    blurb:
      "Already started? We step in to refine your plans, fill the gaps and ensure a seamless, polished celebration from setup to pack-down.",
    points: [
      "Timeline & logistics review",
      "On-the-day coordination",
      "Styling finishing touches",
    ],
    image: "/images/wedding-monogram-fa7cdc3a.jpg",
    imageAlt: "Event backdrop with a couple's monogram and floral styling",
  },
];

export const weddingStyleGallery: WeddingGalleryItem[] = [
  {
    title: "All-White Luxury Tent",
    caption: "White draping, crystal accents & long banquet tables",
    image: "/images/wedding-decor-f31b2122.jpg",
    imageAlt: "All-white luxury tent styling with long banquet tables",
  },
  {
    title: "Monogram Backdrop",
    caption: "Custom couple monogram with rich floral styling",
    image: "/images/wedding-monogram-fa7cdc3a.jpg",
    imageAlt: "Custom monogram backdrop framed with florals",
  },
  {
    title: "Blush Reception Tent",
    caption: "Soft blush draping, tall florals & elegant seating",
    image: "/images/wedding-blush-tent-d4cbf6bc.jpg",
    imageAlt: "Blush reception tent with tall florals and elegant seating",
  },
];

export const weddingPackages: WeddingPackage[] = [
  {
    id: "full-service",
    name: "The Full-Service Experience",
    subtitle: "From Yes to I Do",
    price: "R22,000 – R30,000",
    best: "Best for busy couples seeking comprehensive guidance from the initial concept to the final dance.",
    features: [
      "12 to 18 months of dedicated pre-wedding planning",
      "Up to 5 guided venue site visits",
      "Sourcing & vetting 10+ core vendor categories",
      "Unlimited virtual check-ins",
      "Up to 4 in-person design or tasting walkthroughs",
      "Full guest management for up to 200 guests (RSVPs, dietary tracking, seating charts)",
      "2 expert coordinators on-site for up to 14 hours",
    ],
  },
  {
    id: "partial-planning",
    name: "Partial Planning",
    subtitle: "The Final Stretch",
    price: "R12,000 – R17,500",
    best: "Best for couples who have booked their venue or major suppliers but need expert execution.",
    features: [
      "Kicks off 4 to 6 months prior to your wedding date",
      "Audit of up to 5 existing vendor agreements",
      "Sourcing up to 3 remaining secondary suppliers",
      "Bespoke styling blueprint for rentals, table settings & florals",
      "2 coordinators on-site for up to 12 hours",
      "Full rehearsal direction",
    ],
  },
  {
    id: "month-of",
    name: "Wedding Day / Month-Of Coordination",
    subtitle: "Flawless Day",
    price: "R6,500 – R9,500",
    best: "Best for hands-on couples who planned everything themselves and need professional execution on the day.",
    features: [
      "Involvement begins strictly 4 weeks prior to the wedding date",
      "Review of up to 8 vendor contracts",
      "Final supplier timing confirmations",
      "1 master wedding day run-of-show",
      "1 Lead Coordinator & 1 Assistant for up to 10–12 hours",
    ],
  },
];

export const weddingSteps = [
  {
    step: "01",
    title: "Discovery",
    text: "We meet to understand your vision, style, guest count and the story behind your wedding day.",
  },
  {
    step: "02",
    title: "Design Proposal",
    text: "A tailored décor concept with mood boards, hire items and a transparent quote.",
  },
  {
    step: "03",
    title: "Curation & Planning",
    text: "We source, style and coordinate every detail leading up to the celebration.",
  },
  {
    step: "04",
    title: "The Wedding Day",
    text: "You enjoy a flawless, stress-free event while we handle setup and styling.",
  },
];

export const weddingAddons = [
  { item: "Rehearsal Dinner Coordination", price: "R2,000 – R3,500" },
  { item: "Extra On-Site Hour (per coordinator)", price: "R400 / hr" },
  { item: "Out-of-Town Travel Fee (>50km)", price: "R4.50 / km" },
];

export const weddingRetainerNote =
  "Introductory portfolio rates apply to early bookings in exchange for a verified review and media rights. A 40% retainer secures your date. Flexible milestone payment plans are available upon request.";
