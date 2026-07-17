"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedDividerProps {
  className?: string;
}

export default function AnimatedDivider({ className = "" }: AnimatedDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className={`border-t origin-center ${className}`}
      style={{
        transform: isInView ? "scaleX(1)" : "scaleX(0)",
        transition:
          "transform 1s cubic-bezier(0.65, 0, 0.35, 1), border-color 0.3s ease",
      }}
    />
  );
}