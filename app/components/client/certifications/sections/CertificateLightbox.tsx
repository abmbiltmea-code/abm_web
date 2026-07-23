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
            className="container relative mx-auto flex items-center justify-center"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute h-9 w-9 lg:h-12 lg:w-12 flex items-center justify-center top-20 right-30 sm:top-40  text-white cursor-pointer rounded-full border border-white"
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
              className="flex flex-col items-center gap-16 w-full max-w-[90vw] sm:max-w-[600px] xl:max-w-[720px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] sm:h-[75vh]">
                <Image
                  src={activeItem.image}
                  alt={activeItem.imageAlt}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Mobile / below-lg nav buttons, sitting under the image at the two ends */}
              {items.length > 1 && (
                <div className="flex lg:hidden items-center justify-between w-full px-4 -mt-8">
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

              <div className="text-center">
                <h3 className="text-subtitle-3 mb-2 text-white">
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
