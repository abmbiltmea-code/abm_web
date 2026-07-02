"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { NAV_ITEMS } from "./data";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const current = window.scrollY;
    const el = headerRef.current;
    if (!el) return;

    if (current > lastScrollY.current && current > 100) {
      el.style.transform = "translateY(-160%)";
    } else {
      el.style.transform = "translateY(0)";
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
      className="fixed top-0 left-0 right-0 z-999 mt-50 3xl:mt-[55px] container transition-transform duration-500 ease-in-out"
    >
      <header className="bg-white/75 backdrop-blur-[30px] rounded-[10px] px-40 py-[30px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center shrink-0 cursor-pointer">
          <Link href="/">
            <Image
              src="/assets/images/logos/header-logo.png"
              alt="ABM Logo"
              width={1300}
              height={270}
              className="object-contain h-[55px] 3xl:h-[66px] w-auto pointer-events-none"
            />
          </Link>
        </div>
        {/* Nav Items */}
        <nav className="hidden lg:flex items-center gap-10 3xl:gap-70 pt-[2px]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-15 font-tasa font-bold leading-[1.33333] uppercase whitespace-nowrap text-secondary hover:text-primary transition-colors duration-300 ease-in-out"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Hamburger */}
        <button className="flex items-center justify-center w-[60px] h-[50px] shrink-0 bg-black/10 rounded-[5px] cursor-pointer">
          <Image
            src="/assets/icons/hamburger.svg"
            alt="Menu"
            width={20}
            height={20}
            className="h-[20px] w-auto pointer-events-none"
          />
        </button>
      </header>
    </div>
  );
}
