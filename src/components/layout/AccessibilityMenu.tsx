"use client";

/* eslint-disable react-hooks/set-state-in-effect -- prefs are read from localStorage after mount */

import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Globe, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { languages } from "@/content/languages";
import { cx } from "@/lib/cn";

type TextSize = "default" | "large" | "x-large";
type MotionPref = "system" | "reduced";

interface A11yPrefs {
  textSize: TextSize;
  motion: MotionPref;
}

const STORAGE_KEY = "lle:a11y";
const DEFAULT_PREFS: A11yPrefs = { textSize: "default", motion: "system" };

function applyPrefs(prefs: A11yPrefs) {
  const root = document.documentElement;
  if (prefs.textSize === "default") root.removeAttribute("data-text-size");
  else root.setAttribute("data-text-size", prefs.textSize);
  if (prefs.motion === "reduced") root.setAttribute("data-motion", "reduced");
  else root.removeAttribute("data-motion");
}

export default function AccessibilityMenu() {
  const t = useTranslations("a11y");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    let stored: Partial<A11yPrefs> | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as Partial<A11yPrefs>;
    } catch {
      stored = null;
    }
    if (stored) {
      const merged = { ...DEFAULT_PREFS, ...stored };
      setPrefs(merged);
      applyPrefs(merged);
    }
  }, []);

  const update = useCallback((next: Partial<A11yPrefs>) => {
    setPrefs((current) => {
      const merged = { ...current, ...next };
      applyPrefs(merged);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        /* ignore storage errors */
      }
      return merged;
    });
  }, []);

  const reset = useCallback(() => {
    applyPrefs(DEFAULT_PREFS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setPrefs(DEFAULT_PREFS);
  }, []);

  function changeLocale(next: string) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/20 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-navy transition-colors hover:border-navy/50"
        aria-label={t("open")}
      >
        <Globe aria-hidden="true" className="h-4 w-4" />
        <span aria-hidden="true">{locale.toUpperCase()}</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-frame bg-canvas p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-display text-2xl text-navy">
                {t("title")}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-navy-300">
                {t("languageNote")}
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/20 text-navy hover:border-navy/50"
              aria-label={tCommon("close")}
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <section className="mt-6" aria-labelledby="a11y-language">
            <h3 id="a11y-language" className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-300">
              {t("languageHeading")}
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {languages.map((language) => {
                const active = language.code === locale;
                return (
                  <li key={language.code}>
                    <button
                      type="button"
                      onClick={() => changeLocale(language.code)}
                      aria-current={active ? "true" : undefined}
                      className={cx(
                        "flex w-full items-center justify-between gap-2 rounded-soft border px-3 py-2 text-left text-sm transition-colors",
                        active
                          ? "border-deep-pink bg-deep-pink text-white"
                          : "border-navy/20 text-navy hover:border-navy/50",
                      )}
                    >
                      <span lang={language.code}>{language.label}</span>
                      {active ? (
                        <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
                      ) : language.status === "draft" ? (
                        <span className="text-2xs uppercase tracking-wide opacity-70">
                          {t("draftBadge")}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-6" aria-labelledby="a11y-text-size">
            <h3 id="a11y-text-size" className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-300">
              {t("textSizeHeading")}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {(
                [
                  ["default", t("textSizeDefault")],
                  ["large", t("textSizeLarge")],
                  ["x-large", t("textSizeXLarge")],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update({ textSize: value })}
                  aria-pressed={prefs.textSize === value}
                  className={cx(
                    "min-h-11 rounded-full border px-4 text-sm transition-colors",
                    prefs.textSize === value
                      ? "border-deep-pink bg-deep-pink text-white"
                      : "border-navy/20 text-navy hover:border-navy/50",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6" aria-labelledby="a11y-motion">
            <h3 id="a11y-motion" className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-300">
              {t("motionHeading")}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => update({ motion: "reduced" })}
                aria-pressed={prefs.motion === "reduced"}
                className={cx(
                  "min-h-11 rounded-full border px-4 text-sm transition-colors",
                  prefs.motion === "reduced"
                    ? "border-deep-pink bg-deep-pink text-white"
                    : "border-navy/20 text-navy hover:border-navy/50",
                )}
              >
                {t("motionReduced")}
              </button>
            </div>
          </section>

          <button
            type="button"
            onClick={reset}
            className="mt-6 text-sm text-navy underline decoration-gold decoration-2 underline-offset-4"
          >
            {t("resetAll")}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
