"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  from?: number | string;
  to: number | string;
  duration?: number;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [introReady, setIntroReady] = useState(false);

  const start = useMemo(
    () => (typeof from === "string" ? parseFloat(from) || 0 : from),
    [from],
  );
  const end = useMemo(
    () => (typeof to === "string" ? parseFloat(to) || 0 : to),
    [to],
  );

  // Determine decimal places from the target value
  const decimals = useMemo(() => {
    const s = String(to);
    const dot = s.indexOf(".");
    return dot === -1 ? 0 : s.length - dot - 1;
  }, [to]);

  // Wait for intro animation to complete
  useEffect(() => {
    if (window.__introComplete) {
      setIntroReady(true);
      return;
    }

    const onReady = () => setIntroReady(true);
    window.addEventListener("introComplete", onReady);
    return () => window.removeEventListener("introComplete", onReady);
  }, []);

  // Set initial text content
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = start.toFixed(decimals);
    }
  }, [start, decimals]);

  // Animate via direct DOM mutation — zero React re-renders
  useEffect(() => {
    if (!isInView || !introReady) return;

    const el = ref.current;
    if (!el) return;

    const durationMs = duration * 1000;
    const startTime = performance.now();
    let raf: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out cubic for butter-smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      el.textContent = (start + (end - start) * eased).toFixed(decimals);

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, introReady, start, end, duration, decimals]);

  return <span ref={ref} />;
}
