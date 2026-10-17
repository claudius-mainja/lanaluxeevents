"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, type NavItem } from "@/content/nav";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import Logo from "./Logo";
import AccessibilityMenu from "./AccessibilityMenu";
import MobileNav from "./MobileNav";

function labelFor(
  item: NavItem,
  tNav: ReturnType<typeof useTranslations>,
  tCat: ReturnType<typeof useTranslations>,
) {
  return item.namespace === "categories"
    ? tCat(item.labelKey)
    : tNav(item.labelKey);
}

export default function Header() {
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const tCat = useTranslations("categories");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-canvas transition-colors duration-300 ${
        scrolled ? "header-scrolled border-line" : "border-line/60"
      }`}
    >
      <div className="container-content flex h-20 items-center justify-between gap-4 lg:h-24">
        <Link href="/" aria-label={site.brand} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-navy underline decoration-[var(--color-deep-pink)] decoration-2 underline-offset-4"
                        : "text-navy-300 hover:text-navy"
                    }`}
                  >
                    {labelFor(item, tNav, tCat)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <AccessibilityMenu />
          <span className="hidden sm:block">
            <Button href="/contact" variant="book">
              {t("getQuote")}
            </Button>
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
