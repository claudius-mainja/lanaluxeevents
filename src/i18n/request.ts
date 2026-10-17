import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";
import { loadMessages } from "./messages";

export default getRequestConfig(async ({ locale }) => {
  if (!hasLocale(routing.locales, locale)) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  const resolved = locale as Locale;

  return {
    locale: resolved,
    messages: await loadMessages(resolved),
    onError(error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    },
    getMessageFallback({ namespace, key }) {
      return [namespace, key].filter(Boolean).join(".");
    },
  };
});
