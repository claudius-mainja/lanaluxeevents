"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { primaryNav, footerExploreLinks, type NavItem } from "@/content/nav";
import Button from "@/components/ui/Button";
import Logo from "./Logo";

function labelFor(
  item: NavItem,
  tNav: ReturnType<typeof useTranslations>,
  tCat: ReturnType<typeof useTranslations>,
) {
  return item.namespace === "categories"
    ? tCat(item.labelKey)
    : tNav(item.labelKey);
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const tCat = useTranslations("categories");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy lg:hidden"
        aria-label={t("openMenu")}
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="lle-overlay fixed inset-0 z-50 bg-black/70 lg:hidden" />
        <Dialog.Content className="lle-dialog fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden">
          <div className="flex items-center justify-between">
            <Dialog.Title className="sr-only">{t("openMenu")}</Dialog.Title>
            <Link href="/" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
            <Dialog.Close
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy"
              aria-label={t("closeMenu")}
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex-1">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-soft px-3 font-display text-2xl text-navy hover:bg-[color-mix(in_srgb,var(--color-navy)_6%,transparent)]"
                  >
                    {labelFor(item, tNav, tCat)}
                  </Link>
                  {item.children ? (
                    <ul className="mb-2 ml-3 border-l border-gold/40 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="flex min-h-11 items-center rounded-soft px-3 text-sm text-navy-300 hover:bg-[color-mix(in_srgb,var(--color-navy)_6%,transparent)]"
                          >
                            {labelFor(child, tNav, tCat)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-2xs font-semibold uppercase tracking-[0.2em] text-navy-300">
              {tNav("more")}
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {footerExploreLinks
                .filter(
                  (l) =>
                    l.href === "/services" ||
                    l.href === "/service-areas" ||
                    l.href === "/faqs",
                )
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center rounded-soft px-3 text-sm text-navy-300 hover:bg-[color-mix(in_srgb,var(--color-navy)_6%,transparent)]"
                    >
                      {labelFor(item, tNav, tCat)}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="mt-8">
            <Button
              href="/contact"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {t("getQuote")}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
