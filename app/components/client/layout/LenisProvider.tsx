"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef } from "react";

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

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      syncTouch: true,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    // apply any lock requested before this instance existed
    if (lockedRef.current) {
      lenis.stop();
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: LenisContextType["scrollTo"] = (target, options) => {
    lenisRef.current?.scrollTo(target as any, options);
  };

  const lock = () => {
    lockedRef.current = true;
    lenisRef.current?.stop();
  };

  const unlock = () => {
    lockedRef.current = false;
    lenisRef.current?.start();
  };

  const resize = () => {
    lenisRef.current?.resize();
  };

  return (
    <LenisContext.Provider value={{ scrollTo, lock, unlock, resize }}>
      {children}
    </LenisContext.Provider>
  );
}