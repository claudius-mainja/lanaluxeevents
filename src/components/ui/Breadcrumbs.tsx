import { Link } from "@/i18n/navigation";

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Visible breadcrumb trail. Structured data is emitted separately by the
 * JsonLd breadcrumb helper using the same trail to avoid duplication.
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-navy-300">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-navy">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="underline-offset-4 hover:underline"
                  >
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-gold">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
