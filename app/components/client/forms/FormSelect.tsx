"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/app/components/client/layout/LenisProvider";
import { AnimatePresence, motion } from "framer-motion";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
  placeholder?: string;
}

export default function FormSelect({
  label,
  name,
  required = false,
  value,
  onChange,
  options,
  error,
  placeholder = "",
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  const selected = options.find((o) => o.value === value);
  const isFloated = Boolean(selected) || open;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open || !containerRef.current || !dropdownRef.current) return;

    const DROPDOWN_HEIGHT = 300;
    const MARGIN = 16;

    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < DROPDOWN_HEIGHT + MARGIN) {
      const shortfall = DROPDOWN_HEIGHT + MARGIN - spaceBelow;
      scrollTo(window.scrollY + shortfall, { duration: 0.6 });
    }
  }, [open, scrollTo]);

  return (
    <div
      ref={containerRef}
      onClick={() => setOpen((p) => !p)}
      className="relative w-full pb-[calc(25px+20px)] md:pb-[calc(40px+20px)] cursor-pointer"
    >
      {/* Label */}
      <label
        className={`
          absolute left-0 bottom-8 origin-left
          transition-transform duration-500 ease-in-out
          pointer-events-none text-description-color select-none
          text-description
          ${
            isFloated
              ? "scale-[0.79] -translate-y-[10px] md:-translate-y-[15px]"
              : "scale-100 translate-y-0"
          }
        `}
      >
        {label}
        {required && (
          <span className="ml-[-0.5px] text-description-color">﹡</span>
        )}
      </label>

      {/* Toggle arrow */}
      <Image
        src="/assets/icons/select-arrow-down.svg"
        alt="toggle"
        width={16}
        height={16}
        className={`absolute right-0 -top-4 md:-top-3 ${
          open ? "rotate-180" : ""
        } transition-all duration-400 ease-in-out pointer-events-none select-none h-3 w-2.5 md:h-4 md:w-4`}
      />

      {/* Selected value */}
      <div className="absolute left-0 bottom-5 w-full text-description text-description-color select-none pr-24">
        <span
          className={`transition-opacity duration-300 ${
            selected ? "opacity-100" : "opacity-0"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
      </div>

      {/* Base line */}
      <span className="absolute left-0 bottom-5 w-full h-px bg-description-color/30" />
      {/* Animated fill line */}
      <span
        className={`absolute left-0 bottom-5 h-px transition-all duration-500 ease-in-out
          ${error ? "w-full bg-red-500" : open ? "w-full bg-secondary" : "w-0 bg-secondary"}`}
      />

      {/* Error */}
      <span className="absolute left-0 bottom-0 h-5 text-15 text-red-500">
        {error ?? ""}
      </span>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-full -mt-4 w-full bg-cream-background rounded-[10px] max-h-[300px] overflow-y-auto z-50 shadow-lg border border-black/8 max-w-[300px]"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-20 py-2 text-[16px] transition-colors duration-300 first:rounded-t-[10px] last:rounded-b-[10px]
            ${
              opt.value === value
                ? "text-primary bg-white"
                : "text-description-color hover:bg-white"
            }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}