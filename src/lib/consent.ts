"use client";

import { useSyncExternalStore } from "react";

export type ConsentChoice = "accepted" | "declined";

/** localStorage key holding the analytics consent choice. */
export const CONSENT_STORAGE_KEY = "lle:consent";
/** Fired after the choice changes (accept or decline). */
export const CONSENT_CHANGE_EVENT = "lle:consent:change";
/** Fired by the footer "Cookie settings" control to re-open the banner. */
export const CONSENT_OPEN_EVENT = "lle:consent:open";

/** Reads the stored consent choice. Null means "no decision yet". */
export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw === "accepted" || raw === "declined" ? raw : null;
  } catch {
    return null;
  }
}

/** Persists the choice and notifies listeners (including Analytics). */
export function storeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage unavailable (private mode); the banner simply reappears next visit.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}

let openRequests = 0;

/** Asks the banner to re-open (footer "Cookie settings"). */
export function requestConsentBanner(): void {
  openRequests += 1;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}

function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
}

function subscribeOpenRequests(callback: () => void) {
  window.addEventListener(CONSENT_OPEN_EVENT, callback);
  return () => window.removeEventListener(CONSENT_OPEN_EVENT, callback);
}

/**
 * Live consent choice. The server snapshot reports "declined" so SSR never
 * renders anything consent-gated; the real value is read after hydration.
 */
export function useConsentChoice(): ConsentChoice | null {
  return useSyncExternalStore(subscribeConsent, getStoredConsent, () => "declined");
}

/** Increments each time "Cookie settings" asks the banner to open. */
export function useConsentOpenRequests(): number {
  return useSyncExternalStore(subscribeOpenRequests, () => openRequests, () => 0);
}
