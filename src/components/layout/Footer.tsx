import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site, socialLinks } from "@/content/site";
import { serviceAreas } from "@/content/areas";
import {
  footerExploreLinks,
  footerHireLinks,
  footerLegalLinks,
} from "@/content/nav";
import Button from "@/components/ui/Button";
import Logo from "./Logo";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5H16.5V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.3v7h3.2z" />
    </svg>
  );
}

const socialIcon: Record<string, (p: { className?: string }) => ReactElement> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export default async function Footer() {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tCat = await getTranslations("categories");
  const year = new Date().getFullYear();

  const label = (item: { labelKey: string; namespace?: string }) =>
    item.namespace === "categories" ? tCat(item.labelKey) : tNav(item.labelKey);

  return (
    <footer className="mt-auto bg-navy-700 text-cream">
      <div className="container-content py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo onDark />
            <p className="mt-5 max-w-xs text-sm text-cream/70">{t("about")}</p>

            <ul className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcon[social.label as keyof typeof socialIcon];
                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-cream/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      {Icon ? <Icon className="h-5 w-5" /> : social.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact">
                {tCommon("getQuote")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              <Button
                href={site.whatsapp.href}
                external
                variant="outlineDark"
              >
                {tCommon("whatsapp")}
              </Button>
            </div>
          </div>

          <nav aria-label={t("hireHeading")}>
            <h2 className="text-2xs font-semibold uppercase tracking-[0.2em] text-cream/70">
              {t("hireHeading")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footerHireLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {label(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("companyHeading")}>
            <h2 className="text-2xs font-semibold uppercase tracking-[0.2em] text-cream/70">
              {t("companyHeading")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footerExploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {label(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-2xs font-semibold uppercase tracking-[0.2em] text-cream/70">
              {t("contactHeading")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream/75 transition-colors hover:text-cream"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4 text-hot-pink" />
                  <span className="sr-only">{tCommon("whatsapp")}: </span>
                  {site.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={site.phone.href}
                  className="inline-flex items-center gap-2 text-cream/75 transition-colors hover:text-cream"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-hot-pink" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.email.href}
                  className="inline-flex items-center gap-2 text-cream/75 transition-colors hover:text-cream"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-hot-pink" />
                  {site.email.display}
                </a>
              </li>
            </ul>

            <h2 className="mt-8 text-2xs font-semibold uppercase tracking-[0.2em] text-cream/70">
              {t("areasHeading")}
            </h2>
            <p className="mt-4 flex items-start gap-2 text-sm text-cream/70">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-hot-pink" />
              <span>{serviceAreas.map((a) => a.name).join(" · ")}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-3 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year })}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {footerLegalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline-offset-4 transition-colors hover:text-cream hover:underline"
                >
                  {label(item)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-content flex flex-col gap-1 pb-6 text-2xs text-cream/50">
          <p>{t("madeNote")}</p>
          <p>
            Website by{" "}
            <a
              href="https://www.blacklemur.co.zw"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-cream"
            >
              Blacklemur Innovations
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
