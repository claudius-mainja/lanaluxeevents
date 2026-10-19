import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cx } from "@/lib/cn";

type Variant =
  | "primary"
  | "outline"
  | "light"
  | "ghost"
  | "book"
  | "whatsapp"
  | "gold"
  | "purple"
  | "outlineDark";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  "aria-label"?: string;
  disabled?: boolean;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: () => void;
  type?: never;
}

interface ActionButtonProps extends BaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

const variantClasses: Record<Variant, string> = {
  primary: "bg-[var(--color-deep-pink)] text-white hover:bg-[var(--color-deep-pink-hover)] focus-visible:outline-[var(--color-deep-pink)]",
  outline: "border border-[color-mix(in_srgb,var(--color-navy)_28%,transparent)] text-navy bg-transparent hover:bg-[color-mix(in_srgb,var(--color-navy)_6%,transparent)] focus-visible:outline-[var(--color-deep-pink)]",
  light: "bg-white text-navy border border-[color-mix(in_srgb,var(--color-navy)_12%,transparent)] hover:bg-[var(--color-cream)] focus-visible:outline-[var(--color-deep-pink)]",
  ghost: "text-navy underline decoration-[color-mix(in_srgb,var(--color-deep-pink)_60%,transparent)] decoration-2 underline-offset-4 hover:decoration-[var(--color-deep-pink)] focus-visible:outline-[var(--color-deep-pink)]",
  book: "bg-[var(--color-deep-pink)] text-white hover:bg-[var(--color-deep-pink-hover)] focus-visible:outline-[var(--color-deep-pink)]",
  whatsapp: "bg-[var(--color-wa-green)] text-white hover:bg-[var(--color-wa-green-hover)] focus-visible:outline-[var(--color-wa-green)]",
  gold: "bg-[var(--color-yellow)] text-navy hover:bg-[color-mix(in_srgb,var(--color-yellow)_88%,#000000)] focus-visible:outline-[var(--color-gold-dark)]",
  purple: "bg-[var(--color-purple)] text-white hover:bg-[var(--color-purple-hover)] focus-visible:outline-[var(--color-purple)]",
  outlineDark:
    "border border-cream/40 bg-transparent text-cream hover:bg-cream/10 focus-visible:outline-cream",
};

const sizeClasses: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-7 py-3 text-base",
};

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    onClick,
  } = props;

  const classes = cx(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide",
    "transition-[background-color,border-color,color,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
    "motion-safe:[&_svg]:transition-transform motion-safe:[&_svg]:duration-200 motion-safe:group-hover:[&_svg]:translate-x-0.5",
    "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    const isExternal =
      external ||
      /^(https?:|mailto:|tel:|#)/.test(href);

    if (isExternal) {
      const isHttp = /^https?:/.test(href);
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          aria-label={props["aria-label"]}
          {...(isHttp
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={props["aria-label"]}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      onClick={onClick}
      disabled={props.disabled}
      aria-disabled={props.disabled ? "true" : undefined}
      aria-label={props["aria-label"]}
    >
      {children}
    </button>
  );
}
