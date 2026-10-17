/**
 * Shared motion tokens. These mirror the CSS custom properties declared in
 * `globals.css` so scroll reveals and load-time entrances stay in step.
 *
 * The reference site (Hukoshwa) animates with transform and opacity only, on
 * an expo ease-out curve. Values are intentionally short so content appears
 * quickly and never blocks interaction.
 */
export const motion = {
  ease: {
    outExpo: [0.16, 1, 0.3, 1],
    outSoft: [0.22, 1, 0.36, 1],
  },
  duration: {
    fast: 0.18,
    hover: 0.28,
    base: 0.6,
    slow: 0.85,
  },
  stagger: 0.09,
  revealDistance: 28,
} as const;

export type RevealDirection = "up" | "down" | "left" | "right" | "none";
