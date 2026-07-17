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
import DropdownMenu from "./DropDownMenu";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SCROLL_THRESHOLD = 100;
const INTRO_ENABLED = process.env.NEXT_PUBLIC_ENABLE_INTRO !== "false";

// helper function to check if the current page is a detail page
const DETAIL_PAGE_PREFIXES = ["/news-and-media/", "/careers/", "/projects/"];
function isDetailPage(pathname: string) {
  return DETAIL_PAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isNavItemActive(
  pathname: string,
  item: { href?: string; subItems?: { href: string }[] },
) {
  if (item.href && pathname === item.href) return true;

  return !!item.subItems?.some(
    (sub) => pathname === sub.href || pathname.startsWith(sub.href + "/"),
  );
}

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const isHeaderLocked = useHeaderLocked();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDetail = isDetailPage(pathname);

  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [triggerRect, setTriggerRect] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const handleEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    const itemEl = navItemRefs.current[label];
    const containerEl = headerRef.current;
    if (itemEl && containerEl) {
      const itemBox = itemEl.getBoundingClientRect();
      const containerBox = containerEl.getBoundingClientRect();
      setTriggerRect({
        left: itemBox.left - containerBox.left,
        width: itemBox.width,
      });
    }

    setOpenLabel(label);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenLabel(null), 120);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openItem = NAV_ITEMS.find((i) => i.label === openLabel);

  const surfaceBg = isDetail ? "bg-cream-background" : "bg-white/75";
  const surfaceShadow = isScrolled
    ? "shadow-[0px_4px_28.9px_0px_rgba(0,0,0,0.09)]"
    : "";

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
      onMouseLeave={handleLeave}
      className={`fixed top-0 left-0 right-0 z-999 container transition-[transform,margin-top] duration-500 ease-in-out will-change-transform ${
        isScrolled ? "" : "mt-5 lg:mt-50 3xl:mt-[55px]"
      }`}
    >
      <header className="relative px-3 md:px-5 lg:px-6 2xl:px-40 py-5 2xl:py-[30px]">
        <div
          aria-hidden
          className={`absolute inset-y-0 left-1/2 -translate-x-1/2 ${surfaceBg} backdrop-blur-[30px] transition-[width,border-radius,box-shadow] duration-500 ease-in-out -z-10 ${
            isScrolled
              ? `w-screen rounded-none ${surfaceShadow}`
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
            {NAV_ITEMS.map((item, index) => {
              const isActive = isNavItemActive(pathname, item);
              const hasSubItems = !!item.subItems?.length;
              const isOpen = openLabel === item.label;

              return (
                <Link
                  key={index}
                  ref={(el) => {
                    navItemRefs.current[item.label] = el;
                  }}
                  href={item.href || "#"}
                  data-header-anim
                  onMouseEnter={() => hasSubItems && handleEnter(item.label)}
                  className={`flex items-center gap-2 text-15 font-tasa font-bold leading-[1.33333] uppercase whitespace-nowrap transition-colors duration-300 ease-in-out ${
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}
                  {hasSubItems && (
                    <ChevronDown
                      size={24}
                      strokeWidth={2}
                      className={`transition-transform duration-300 -mt-[3px] ease-in-out ${openLabel === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <button
            data-header-anim
            onClick={() => setIsMenuOpen(true)}
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

      <AnimatePresence>
        {openItem?.subItems?.length && triggerRect && (
          <motion.div
            onMouseEnter={() => handleEnter(openItem.label)}
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            style={{
              originY: 0,
              left: triggerRect.left,
              minWidth: triggerRect.width,
            }}
            className={`absolute top-full z-20 overflow-hidden rounded-b-[10px] ${surfaceBg} backdrop-blur-[30px] ${surfaceShadow} max-w-[400px] w-max`}
          >
            <ul
              role="listbox"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col max-h-64 overflow-y-auto overscroll-contain"
            >
              {openItem.subItems.map((sub, index) => (
                <li key={index} role="option">
                  <Link
                    href={sub.href}
                    onClick={() => setOpenLabel(null)}
                    className="block whitespace-nowrap text-15 font-tasa text-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-200 p-4 rounded-b-[10px]"
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <DropdownMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
