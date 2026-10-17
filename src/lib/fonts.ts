import { DM_Serif_Display, Manrope } from "next/font/google";

/**
 * DM Serif Display (hero/principal headings) and Manrope (body, UI).
 * Both are open-licensed (SIL OFL). Latin Extended is included; the uncommon
 * additional Latin glyphs used by some South African languages fall back to
 * the specified system fallbacks where the web font has no coverage.
 */
export const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-serif",
  fallback: ["Georgia", "Times New Roman", "serif"],
  preload: true,
});

export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
  preload: true,
});
