"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLenis } from "../layout/LenisProvider";

interface FilterSelectDropDownProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function FilterSelectDropDown({
  label,
  options,
  value,
  onChange,
}: FilterSelectDropDownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    const raf = requestAnimationFrame(() => {
      const el = listRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const padding = 24;
      const overflow = rect.bottom - window.innerHeight + padding;

      if (overflow > 0) {
        scrollTo(window.scrollY + overflow, { duration: 0.9 });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [open, scrollTo]);

  const handleSelect = (option: string | null) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      onClick={() => setOpen((prev) => !prev)}
      className="relative w-full min-[1900]:min-w-[340px] cursor-pointer"
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left text-description-2 cursor-pointer"
      >
        <span className={value ? "text-secondary" : "text-description-color"}>
          {value ?? label}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Image
            src="/assets/icons/down-arrow.svg"
            alt="chevron-down"
            className="w-auto h-[10px]"
            width={30}
            height={30}
          />
        </motion.div>
      </button>

      <div className="mt-[15px] h-px w-full bg-border-color" />

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            role="listbox"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-0 right-0 top-full z-20 -mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-b-[10px] border border-neutral-200 bg-white shadow-lg"
            style={{ originY: 0 }}
          >
            <li>
              <button
                type="button"
                onClick={() => handleSelect(null)}
                className="block w-full px-4 py-2.5 text-left text-description-2 text-description-color bg-primary/10 rounded-b-[10px]"
              >
                {label}
              </button>
            </li>
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`block w-full px-4 py-2.5 text-left text-description-2 hover:bg-cream-background cursor-pointer ${
                    option === value ? "text-primary" : "text-description-color"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
