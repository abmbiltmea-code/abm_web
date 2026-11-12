"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { SecondSectionItem } from "@/app/types/certifications";


interface CertificateLightboxProps {
  items: SecondSectionItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function CertificateLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: CertificateLightboxProps) {
  const isOpen = activeIndex !== null;
  const activeItem = isOpen ? items[activeIndex] : null;

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
  }, [activeIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !activeItem) return null;

  return (
    <AnimatePresence>
      {isOpen && activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-999 bg-black/80 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            // Full dynamic viewport height (dvh) so the phone browser bars are
            // accounted for; the certificate takes whatever space is left.
            className="container relative mx-auto flex h-[100dvh] items-center justify-center pt-[60px] pb-4 sm:pt-[76px] sm:pb-6 lg:py-[40px]"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute z-10 h-9 w-9 lg:h-12 lg:w-12 flex items-center justify-center top-3 right-4 sm:top-5 sm:right-30 lg:top-40 text-white cursor-pointer rounded-full border border-white bg-black/30"
              aria-label="Close"
            >
              <RiCloseLine size={22} className="lg:hidden" />
              <RiCloseLine size={30} className="hidden lg:block" />
            </button>

            {/* Desktop / lg+ side nav buttons */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="hidden lg:flex absolute left-10 sm:left-30 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full border border-white text-white cursor-pointer"
                  aria-label="Previous certificate"
                >
                  <RiArrowLeftSLine size={30} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="hidden lg:flex absolute right-10 sm:right-30 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full border border-white text-white cursor-pointer"
                  aria-label="Next certificate"
                >
                  <RiArrowRightSLine size={30} />
                </button>
              </>
            )}

            <div
              className="flex h-full w-full max-w-[640px] xl:max-w-[760px] flex-col items-center gap-3 sm:gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate fills all remaining height */}
              <div className="relative w-full flex-1 min-h-0">
                <Image
                  src={activeItem.image}
                  alt={activeItem.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 760px"
                  // Sit the certificate on the bottom edge on mobile so any
                  // spare space goes above it, not between it and the buttons.
                  className="object-contain object-bottom lg:object-center"
                />
              </div>

              {/* Mobile / below-lg nav buttons, directly under the image */}
              {items.length > 1 && (
                <div className="flex lg:hidden w-full shrink-0 items-center justify-between mt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white text-white cursor-pointer"
                    aria-label="Previous certificate"
                  >
                    <RiArrowLeftSLine size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white text-white cursor-pointer"
                    aria-label="Next certificate"
                  >
                    <RiArrowRightSLine size={22} />
                  </button>
                </div>
              )}

              <div className="w-full shrink-0 text-center">
                <h3 className="text-subtitle-3 mb-1 text-white">
                  {activeItem.title}
                </h3>
                <p className="text-subtitle text-white/70">
                  Authority: {activeItem.label.toUpperCase()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
