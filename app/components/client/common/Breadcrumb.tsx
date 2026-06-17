"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  variant?: "1";
}

export default function Breadcrumb({ variant }: BreadcrumbProps) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => ({
    label: seg
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }));

  const color = variant === "1" ? "text-[#7c7c7c]" : "text-white";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {i > 0 && (
                <span
                  className={`${color} text-15 leading-[1.33333] font-tasa uppercase`}
                >
                  -
                </span>
              )}
              {isLast ? (
                <span
                  className={`${color} text-15 leading-[1.33333] font-tasa uppercase`}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={`${color} text-15 leading-[1.33333] font-tasa uppercase`}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
