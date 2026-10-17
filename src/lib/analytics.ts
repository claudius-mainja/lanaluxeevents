/**
 * Small typed analytics layer. Events are only emitted for real user
 * interactions and never contain personal form data.
 *
 * The actual GA4/Meta tags are loaded by <Analytics /> when the
 * corresponding environment IDs are configured. When they are absent,
 * events are queued to window.dataLayer for later inspection.
 */

export type AnalyticsEvent =
  | "view_service"
  | "select_hire_item"
  | "quote_start"
  | "whatsapp_handoff"
  | "copy_enquiry"
  | "click_call";

export interface AnalyticsProps {
  item_id?: string;
  category?: string;
  locale?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });

    if (typeof window.gtag === "function") {
      window.gtag("event", event, props);
    }

    if (typeof window.fbq === "function") {
      // Meta uses standard event names; map our typed layer to a custom event.
      window.fbq("trackCustom", event, props);
    }
  } catch {
    // Analytics must never break the user journey.
  }
}
