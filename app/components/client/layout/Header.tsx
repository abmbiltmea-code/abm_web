"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "./data";
import { usePathname } from "next/navigation";

const SCROLL_THRESHOLD = 100;

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  const update = useCallback(() => {
    const current = window.scrollY;
    const el = headerRef.current;
    if (!el) return;

    const scrollingDown = current > lastScrollY.current;

    if (scrollingDown && current > SCROLL_THRESHOLD) {
      // hiding header: don't touch isScrolled/bg here at all
      el.style.transform = "translateY(-160%)";
    } else {
      el.style.transform = "translateY(0)";
      setIsScrolled(current > SCROLL_THRESHOLD);
    }

    lastScrollY.current = current;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  return (
<div
  ref={headerRef}
  className={`fixed top-0 left-0 right-0 z-999 container transition-[transform,margin-top] duration-500 ease-in-out will-change-transform ${
    isScrolled ? "" : "mt-[20px] lg:mt-50 3xl:mt-[55px]"
  }`}
>
      <header className="relative px-3 md:px-5 lg:px-6 2xl:px-40 py-[20px] 2xl:py-[30px]">
        <div
          aria-hidden
          className={`absolute inset-y-0 left-1/2 -translate-x-1/2 bg-white/75 backdrop-blur-[30px] transition-[width,border-radius,box-shadow] duration-500 ease-in-out -z-10 ${
            isScrolled
              ? "w-screen rounded-none shadow-[0px_4px_28.9px_0px_rgba(0,0,0,0.09)]"
              : "w-full rounded-[10px]"
          }`}
        />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center shrink-0 cursor-pointer">
            <Link href="/">
              <Image
                src="/assets/images/logos/header-logo.png"
                alt="ABM Logo"
                width={1300}
                height={270}
                className="object-contain h-[36.15px] xl:h-11 2xl:h-[55px] 3xl:h-[66px] w-auto pointer-events-none"
              />
            </Link>
          </div>
          <nav className="hidden xl:flex items-center gap-8 3xl:gap-70 pt-[2px]">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-15 font-tasa font-bold leading-[1.33333] uppercase whitespace-nowrap transition-colors duration-300 ease-in-out ${
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button className="flex items-center justify-center w-[38px] h-[32px] md:w-[60px] md:h-[50px] shrink-0 bg-black/10 rounded-[4px] md:rounded-[5px] cursor-pointer">
            <Image
              src="/assets/icons/hamburger.svg"
              alt="Menu"
              width={20}
              height={20}
              className="h-[12px] md:h-[20px] w-auto pointer-events-none"
            />
          </button>
        </div>
      </header>
    </div>
  );
}