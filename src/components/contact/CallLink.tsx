"use client";

import { track } from "@/lib/analytics";

export default function CallLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} onClick={() => track("click_call")} className={className}>
      {children}
    </a>
  );
}
