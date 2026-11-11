"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { ChevronDown } from "lucide-react";

interface ClientSideLinkProps {
  href: string;
  name: string;
  icon: React.ReactNode;
  className?: string;
  children?: { href: string; name: string }[];
  isOpen?: boolean;
  setOpenLink?: (href: string | null) => void;
  hasChild?: boolean;
  isActiveOverride?: boolean;
}

function ClientSideLink({
  href,
  name,
  icon,
  className,
  children,
  isOpen = false,
  setOpenLink,
  hasChild = false,
  isActiveOverride,
}: ClientSideLinkProps) {
  const pathname = usePathname();
  const isLogout = href === "/admin/logout";

  const isActive =
    !isLogout &&
    (isActiveOverride ?? (pathname === href || pathname?.startsWith(`${href}/`)));

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/4bm-4dm1n/login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link
        href={isLogout ? "#" : href}
        onClick={(e) => {
          if (isLogout) {
            e.preventDefault();
            handleLogout();
            return;
          }
          setOpenLink?.(isOpen ? null : href);
        }}
        className={cn(
          "group relative flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all duration-200",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          className,
        )}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
        )}
        <span className="flex items-center gap-3 min-w-0">
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors",
              isActive
                ? "bg-primary text-white shadow-sm shadow-primary/30"
                : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-gray-800",
              isLogout && "bg-red-50 text-red-600 group-hover:bg-red-100 group-hover:text-red-700",
            )}
          >
            {icon}
          </span>
          <span className="truncate">{name}</span>
        </span>
        {hasChild && (
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        )}
      </Link>

      {hasChild && children && (
        <div
          className={cn(
            "grid transition-all duration-200 ease-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="ml-7 mt-1 mb-1 flex flex-col gap-0.5 border-l border-gray-200 pl-3">
              {children.map((item) => {
                const isChildActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                      isChildActive
                        ? "bg-primary/5 text-primary"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    {isChildActive && (
                      <span className="absolute -left-[13px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ClientSideLink);
