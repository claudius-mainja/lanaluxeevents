export type ClassValue = string | false | null | undefined;

/** Tiny class-name joiner (avoids an extra dependency). */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
