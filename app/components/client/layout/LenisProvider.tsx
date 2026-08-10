"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { consumePendingScrollOffset } from "./scrollOffset";

gsap.registerPlugin(ScrollTrigger);

type LenisContextType = {
  scrollTo: (target: number | string | HTMLElement, options?: object) => void;
  lock: () => void;
  unlock: () => void;
  resize: () => void;
};

const LenisContext = createContext<LenisContextType>({
  scrollTo: () => {},
  lock: () => {},
  unlock: () => {},
  resize: () => {},
});

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const lockedRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    // const lenis = new Lenis({ lerp: 0.1, syncTouch: true });
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    });
    ro.observe(document.body);

    // apply whatever lock state was requested before Lenis existed
    if (lockedRef.current) {
      document.documentElement.style.overflow = "hidden";
      lenis.stop();
    } else {
      document.documentElement.style.overflow = "";
      // lenis starts running by default, nothing else needed
    }

    const failsafe = setTimeout(() => {
      if (lenis.isStopped) {
        console.warn("Lenis failsafe: force-unlocking stuck scroll");
        lockedRef.current = false;
        document.documentElement.style.overflow = "";
        lenis.start();
      }
    }, 5000);

    return () => {
      clearTimeout(failsafe);
      clearTimeout(resizeTimeout);
      ro.disconnect();
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // useEffect(() => {
  //   if (!lenisRef.current) return;
  //   lenisRef.current.scrollTo(0, { immediate: true });

  //   const t = setTimeout(() => {
  //     lenisRef.current?.resize();
  //     ScrollTrigger.refresh();
  //   }, 300);

  //   return () => clearTimeout(t);
  // }, [pathname]);

useEffect(() => {
  if (!lenisRef.current) return;

  const hash = window.location.hash;

  const t = setTimeout(() => {
    lenisRef.current?.resize();
    ScrollTrigger.refresh();

    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const offset = consumePendingScrollOffset();
        lenisRef.current?.scrollTo(el, { offset, immediate: false });
      }
    }
  }, 300);

  return () => clearTimeout(t);
}, [pathname]);

  const scrollTo = useCallback<LenisContextType["scrollTo"]>(
    (target, options) => {
      lenisRef.current?.scrollTo(target as any, options);
    },
    [],
  );

  const lock = useCallback(() => {
    lockedRef.current = true;
    lenisRef.current?.stop();
  }, []);

  const unlock = useCallback(() => {
    lockedRef.current = false;
    document.documentElement.style.overflow = "";
    lenisRef.current?.start();
  }, []);

  const resize = useCallback(() => {
    lenisRef.current?.resize();
  }, []);

  const value = useMemo(
    () => ({ scrollTo, lock, unlock, resize }),
    [scrollTo, lock, unlock, resize],
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
