"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef } from "react";

type LenisContextType = {
  scrollTo: (target: number | string | HTMLElement, options?: object) => void;
  lock: () => void;
  unlock: () => void;
};

const LenisContext = createContext<LenisContextType>({
  scrollTo: () => {},
  lock: () => {},
  unlock: () => {},
});

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      syncTouch: true,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: LenisContextType["scrollTo"] = (target, options) => {
    lenisRef.current?.scrollTo(target as any, options);
  };

  const lock = () => lenisRef.current?.stop();
  const unlock = () => lenisRef.current?.start();

  return (
    <LenisContext.Provider value={{ scrollTo, lock, unlock }}>
      {children}
    </LenisContext.Provider>
  );
}
