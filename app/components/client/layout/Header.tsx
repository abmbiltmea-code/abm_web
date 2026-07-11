"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { NAV_ITEMS } from "./data";
import { usePathname } from "next/navigation";
import { useHeaderLocked } from "@/app/lib/headerLock";

const SCROLL_THRESHOLD = 100;
const INTRO_ENABLED = process.env.NEXT_PUBLIC_ENABLE_INTRO !== "false";

// helper function to check if the current page is a detail page
const DETAIL_PAGE_PREFIXES = ["/news-and-media/", "/careers/", "/projects/"];
function isDetailPage(pathname: string) {
  return DETAIL_PAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const isHeaderLocked = useHeaderLocked();

  const [isScrolled, setIsScrolled] = useState(false);
  const isDetail = isDetailPage(pathname);

  const update = useCallback(() => {
    const current = window.scrollY;
    const el = headerRef.current;
    if (!el) return;

    const scrollingDown = current > lastScrollY.current;

    if (scrollingDown && current > SCROLL_THRESHOLD) {
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
      if (ticking.current || isHeaderLocked) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [update, isHeaderLocked]);

  // useEffect(() => {
  //   const el = headerRef.current;
  //   if (!el) return;

  //   if (isHeaderLocked) {
  //     el.style.transform = "translateY(-160%)";
  //   } else {
  //     update();
  //   }
  // }, [isHeaderLocked, update]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    if (isHeaderLocked) {
      el.style.transform = "translateY(-160%)";
    } else {
      const current = window.scrollY;
      lastScrollY.current = current;

      if (current > SCROLL_THRESHOLD) {
        el.style.transform = "translateY(-160%)";
        setIsScrolled(true);
      } else {
        el.style.transform = "translateY(0)";
        setIsScrolled(false);
      }
    }
  }, [isHeaderLocked]);

  useLayoutEffect(() => {
    const items =
      navRef.current?.querySelectorAll<HTMLElement>("[data-header-anim]");
    if (!items || !items.length) return;

    gsap.set(items, { y: -14, opacity: 0 });

    const play = () =>
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      });

    if (!INTRO_ENABLED) {
      const id = requestAnimationFrame(play);
      return () => cancelAnimationFrame(id);
    }

    window.addEventListener("introComplete", play, { once: true });
    return () => window.removeEventListener("introComplete", play);
  }, []);

  return (
    <div
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-999 container transition-[transform,margin-top] duration-500 ease-in-out will-change-transform ${
        isScrolled ? "" : "mt-5 lg:mt-50 3xl:mt-[55px]"
      }`}
    >
      <header className="relative px-3 md:px-5 lg:px-6 2xl:px-40 py-5 2xl:py-[30px]">
        <div
          aria-hidden
          className={`absolute inset-y-0 left-1/2 -translate-x-1/2 ${
            isDetail ? "bg-cream-background" : "bg-white/75"
          } backdrop-blur-[30px] transition-[width,border-radius,box-shadow] duration-500 ease-in-out -z-10 ${
            isScrolled
              ? "w-screen rounded-none shadow-[0px_4px_28.9px_0px_rgba(0,0,0,0.09)]"
              : "w-full rounded-[10px]"
          }`}
        />

        <div
          ref={navRef}
          className="relative flex items-center justify-between"
        >
          <div
            data-header-anim
            className="flex items-center shrink-0 cursor-pointer"
          >
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
                  data-header-anim
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
          <button
            data-header-anim
            className="flex items-center justify-center w-[38px] h-[32px] md:w-[60px] md:h-[50px] shrink-0 bg-black/10 rounded-[4px] md:rounded-[5px] cursor-pointer"
          >
            <Image
              src="/assets/icons/hamburger.svg"
              alt="Menu"
              width={20}
              height={20}
              className="h-[12px] md:h-5 w-auto pointer-events-none"
            />
          </button>
        </div>
      </header>
    </div>
  );
}
