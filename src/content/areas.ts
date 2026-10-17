export interface ServiceArea {
  id: string;
  name: string;
  /** Public-safe description of the area grouping. */
  group: "johannesburg" | "pretoria" | "east-rand";
  /** Whether an individual area page has enough distinct content to justify it. */
  hasPage: boolean;
  blurb: string;
}

/**
 * Only the confirmed service areas from the business brief are listed.
 * Sandton City is a service area, not a shop or business address.
 */
export const serviceAreas: ServiceArea[] = [
  {
    id: "bryanston",
    name: "Bryanston",
    group: "johannesburg",
    hasPage: true,
    blurb:
      "Soft play, jumping castles and party fun setup in Bryanston and the surrounding northern-suburb streets.",
  },
  {
    id: "sandton-city",
    name: "Sandton City area",
    group: "johannesburg",
    hasPage: true,
    blurb:
      "Party hire for celebrations in the Sandton City area and nearby complexes. Sandton City is a service area, not a shop address.",
  },
  {
    id: "randburg",
    name: "Randburg",
    group: "johannesburg",
    hasPage: true,
    blurb:
      "Children's party setups across Randburg and its neighbouring suburbs.",
  },
  {
    id: "midrand",
    name: "Midrand",
    group: "johannesburg",
    hasPage: true,
    blurb:
      "Soft play and jumping castle hire for families in Midrand and the corridor toward Centurion.",
  },
  {
    id: "northern-suburbs",
    name: "Johannesburg northern suburbs",
    group: "johannesburg",
    hasPage: false,
    blurb:
      "Coverage across the Johannesburg northern suburbs. Send your suburb and we will confirm delivery for your address.",
  },
  {
    id: "pretoria",
    name: "Pretoria",
    group: "pretoria",
    hasPage: true,
    blurb:
      "Party hire for children's celebrations in Pretoria and its surrounding suburbs.",
  },
  {
    id: "centurion",
    name: "Centurion",
    group: "pretoria",
    hasPage: true,
    blurb:
      "Soft play, castles and party fun for families in Centurion.",
  },
  {
    id: "germiston",
    name: "Germiston",
    group: "east-rand",
    hasPage: true,
    blurb:
      "Party hire for celebrations in and around Germiston on the East Rand.",
  },
];

export function getArea(id: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.id === id);
}
