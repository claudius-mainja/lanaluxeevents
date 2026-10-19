"use client";

/* eslint-disable react-hooks/incompatible-library -- react-hook-form's watch() is intentional here */

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { categoryLabelKey, type CategoryId } from "@/content/catalogue";
import { serviceAreas } from "@/content/areas";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import {
  OTHER_SUBURB,
  buildEnquiryMessage,
  buildWhatsAppUrl,
  quoteFormSchema,
  type QuoteFormInput,
  type QuoteFormValues,
} from "@/lib/quote";
import { todayInSouthAfrica } from "@/lib/format";
import { cx } from "@/lib/cn";
import Button from "@/components/ui/Button";

const DRAFT_KEY = "lle-quote-draft";

export interface SelectableItem {
  id: string;
  name: string;
  category: CategoryId;
}

export default function QuoteForm({
  items,
  initialItemId,
  initialNotes = "",
  localeLabel,
}: {
  items: SelectableItem[];
  initialItemId: string;
  initialNotes?: string;
  localeLabel: string;
}) {
  const t = useTranslations("form");
  const tCat = useTranslations("categories");
  const tErr = useTranslations("form.errors");

  const today = useMemo(() => todayInSouthAfrica(), []);
  const [status, setStatus] = useState<"idle" | "opened" | "copied" | "failed">("idle");
  const [cooldown, setCooldown] = useState(false);
  const startedRef = useRef(false);

  const grouped = useMemo(() => {
    const map = new Map<CategoryId, SelectableItem[]>();
    for (const item of items) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return Array.from(map.entries());
  }, [items]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<QuoteFormInput, unknown, QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      itemId: initialItemId,
      firstName: "",
      suburb: "",
      otherSuburb: "",
      dateNotDecided: false,
      eventDate: "",
      notes: initialNotes,
      callback: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    let draft: Partial<QuoteFormValues> = {};
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) draft = JSON.parse(raw) as Partial<QuoteFormValues>;
    } catch {
      draft = {};
    }
    reset({
      itemId: initialItemId || draft.itemId || "",
      firstName: draft.firstName ?? "",
      suburb: draft.suburb ?? "",
      otherSuburb: draft.otherSuburb ?? "",
      dateNotDecided: draft.dateNotDecided ?? false,
      eventDate: draft.eventDate ?? "",
      notes: initialNotes || draft.notes || "",
      callback: draft.callback ?? "",
    });
  }, [initialItemId, initialNotes, reset]);

  const watched = watch([
    "itemId",
    "firstName",
    "suburb",
    "otherSuburb",
    "dateNotDecided",
    "eventDate",
    "notes",
    "callback",
  ]);

  useEffect(() => {
    const subscription = watch((values) => {
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      } catch {
        /* storage may be unavailable; the form still works */
      }
    });
    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [selectedItemId, firstName, suburb, otherSuburb, dateNotDecided, eventDate, notes, callback] =
    watched;

  const selectedItem = items.find((item) => item.id === selectedItemId);
  const itemName = selectedItem?.name ?? "";
  const effectiveSuburb = suburb === OTHER_SUBURB ? otherSuburb || "" : suburb || "";

  const previewMessage = buildEnquiryMessage({
    itemId: selectedItemId || "",
    itemName,
    firstName: firstName || "",
    suburb: effectiveSuburb,
    eventDate,
    dateNotDecided: Boolean(dateNotDecided),
    notes,
    callback,
    localeLabel,
  });

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("quote_start", { item_id: selectedItemId || undefined });
  }

  function onInvalid() {
    setError("root", { message: "formInvalid" });
    const first = document.querySelector<HTMLElement>("[data-error='true']");
    first?.focus();
  }

  function onSubmit(values: QuoteFormValues) {
    if (cooldown) return;
    const item = items.find((entry) => entry.id === values.itemId);
    const effectiveSuburb =
      values.suburb === OTHER_SUBURB ? (values.otherSuburb ?? "").trim() : values.suburb;
    const message = buildEnquiryMessage({
      itemId: values.itemId || "",
      itemName: item?.name ?? "",
      firstName: values.firstName,
      suburb: effectiveSuburb,
      eventDate: values.eventDate,
      dateNotDecided: Boolean(values.dateNotDecided),
      notes: values.notes,
      callback: values.callback,
      localeLabel,
    });
    track("whatsapp_handoff", { item_id: values.itemId || undefined });
    window.open(buildWhatsAppUrl(site.whatsapp.number, message), "_blank", "noopener,noreferrer");
    setStatus("opened");
    setCooldown(true);
    window.setTimeout(() => setCooldown(false), 1500);
  }

  async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(previewMessage);
      track("copy_enquiry", { item_id: selectedItemId || undefined });
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  function resetDraft() {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    reset({
      itemId: initialItemId,
      firstName: "",
      suburb: "",
      otherSuburb: "",
      dateNotDecided: false,
      eventDate: "",
      notes: initialNotes,
      callback: "",
    });
    setStatus("idle");
  }

  const fieldClass =
    "min-h-11 w-full rounded-soft border border-line bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy-300/60 transition-colors duration-200 motion-reduce:transition-none focus:border-deep-pink data-[error=true]:border-danger data-[error=true]:focus:border-danger";
  const labelClass = "block text-sm font-medium text-navy";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="lg:col-span-7"
        aria-labelledby="quote-form-heading"
      >
        <h2 id="quote-form-heading" className="font-display text-2xl text-navy">
          {t("heading")}
        </h2>
        <p className="mt-2 text-sm text-navy-300">{t("lead")}</p>

        <div className="mt-8 space-y-5">
          <div>
            <label htmlFor="itemId" className={labelClass}>
              {t("chooseItem")}
            </label>
            <select
              id="itemId"
              className={cx(fieldClass, "mt-2")}
              data-error={errors.itemId ? "true" : "false"}
              {...register("itemId")}
              onFocus={markStarted}
            >
              <option value="">{t("chooseItemPlaceholder")}</option>
              {grouped.map(([category, list]) => (
                <optgroup key={category} label={tCat(categoryLabelKey(category))}>
                  {list.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="mt-2 text-xs text-navy-300">
              {selectedItem ? t("selectedItem", { name: selectedItem.name }) : t("noItemSelected")}
            </p>
          </div>

          <div>
            <label htmlFor="firstName" className={labelClass}>
              {t("firstName")}
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder={t("firstNamePlaceholder")}
              className={cx(fieldClass, "mt-2")}
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              data-error={errors.firstName ? "true" : "false"}
              {...register("firstName")}
              onFocus={markStarted}
            />
            {errors.firstName ? (
              <p id="firstName-error" className="mt-2 text-xs text-danger">
                {tErr(errors.firstName.message as string)}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="suburb" className={labelClass}>
              {t("suburb")}
            </label>
            <select
              id="suburb"
              className={cx(fieldClass, "mt-2")}
              aria-invalid={errors.suburb ? "true" : "false"}
              aria-describedby={errors.suburb ? "suburb-error" : undefined}
              data-error={errors.suburb ? "true" : "false"}
              {...register("suburb")}
              onFocus={markStarted}
            >
              <option value="">{t("suburbPlaceholder")}</option>
              {serviceAreas.map((area) => (
                <option key={area.id} value={area.name}>
                  {area.name}
                </option>
              ))}
              <option value={OTHER_SUBURB}>{t("otherSuburbOption")}</option>
            </select>
            {errors.suburb ? (
              <p id="suburb-error" className="mt-2 text-xs text-danger">
                {tErr(errors.suburb.message as string)}
              </p>
            ) : null}

            {suburb === OTHER_SUBURB ? (
              <div className="mt-3">
                <label htmlFor="otherSuburb" className={labelClass}>
                  {t("otherSuburb")}
                </label>
                <input
                  id="otherSuburb"
                  type="text"
                  placeholder={t("otherSuburbPlaceholder")}
                  className={cx(fieldClass, "mt-2")}
                  aria-invalid={errors.otherSuburb ? "true" : "false"}
                  aria-describedby={errors.otherSuburb ? "otherSuburb-error" : undefined}
                  data-error={errors.otherSuburb ? "true" : "false"}
                  {...register("otherSuburb")}
                />
                {errors.otherSuburb ? (
                  <p id="otherSuburb-error" className="mt-2 text-xs text-danger">
                    {tErr(errors.otherSuburb.message as string)}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <fieldset>
            <legend className={labelClass}>{t("eventDate")}</legend>
            <div className="mt-2 space-y-3">
              <input
                id="eventDate"
                type="date"
                min={today}
                disabled={dateNotDecided}
                className={cx(fieldClass, dateNotDecided && "opacity-60")}
                aria-invalid={errors.eventDate ? "true" : "false"}
                aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
                data-error={errors.eventDate ? "true" : "false"}
                {...register("eventDate")}
                onFocus={markStarted}
              />
              {errors.eventDate ? (
                <p id="eventDate-error" className="text-xs text-danger">
                  {tErr(errors.eventDate.message as string)}
                </p>
              ) : null}
              <label className="flex items-center gap-2 text-sm text-navy-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-navy/30 text-navy focus:ring-navy"
                  {...register("dateNotDecided")}
                  onFocus={markStarted}
                />
                {t("dateNotDecided")}
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="notes" className={labelClass}>
              {t("notes")}
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder={t("notesPlaceholder")}
              className={cx(fieldClass, "mt-2 h-auto py-3")}
              aria-invalid={errors.notes ? "true" : "false"}
              aria-describedby={errors.notes ? "notes-error" : undefined}
              data-error={errors.notes ? "true" : "false"}
              {...register("notes")}
              onFocus={markStarted}
            />
            {errors.notes ? (
              <p id="notes-error" className="mt-2 text-xs text-danger">
                {tErr(errors.notes.message as string)}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="callback" className={labelClass}>
              {t("callback")}
            </label>
            <input
              id="callback"
              type="tel"
              autoComplete="tel"
              placeholder={t("callbackPlaceholder")}
              className={cx(fieldClass, "mt-2")}
              aria-invalid={errors.callback ? "true" : "false"}
              aria-describedby={errors.callback ? "callback-error" : undefined}
              data-error={errors.callback ? "true" : "false"}
              {...register("callback")}
              onFocus={markStarted}
            />
            {errors.callback ? (
              <p id="callback-error" className="mt-2 text-xs text-danger">
                {tErr(errors.callback.message as string)}
              </p>
            ) : null}
          </div>
        </div>

        {errors.root ? (
          <p role="alert" className="mt-4 text-sm text-danger">
            {tErr("formInvalid")}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" disabled={cooldown}>
            {t("continue")}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={copyEnquiry}>
            {t("copyEnquiry")}
          </Button>
          <Button type="button" variant="ghost" onClick={resetDraft}>
            {t("resetDraft")}
          </Button>
        </div>

        <p
          key={status}
          aria-live="polite"
          className={cx("mt-3 min-h-5 text-sm text-navy", status !== "idle" && "lle-fade-in")}
        >
          {status === "opened"
            ? t("opened")
            : status === "copied"
              ? t("copied")
              : status === "failed"
                ? t("copyFailed")
                : ""}
        </p>

        <p className="mt-4 text-xs text-navy-300">{t("whatsappNote")}</p>
        <p className="mt-2 text-xs text-navy-300">
          {t("preferOther")}{" "}
          <a
            href={site.whatsapp.href}
            className="text-navy underline decoration-gold decoration-2 underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("directWhatsApp")}
          </a>
        </p>
      </form>

      <aside className="lg:col-span-5">
        <h3 className="font-display text-xl text-navy">{t("messagePreview")}</h3>
        <pre className="mt-4 whitespace-pre-wrap rounded-frame border border-gold/40 bg-canvas-2 p-5 text-sm text-navy-300">
          {previewMessage}
        </pre>
      </aside>
    </div>
  );
}
