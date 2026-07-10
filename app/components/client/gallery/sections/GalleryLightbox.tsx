"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

interface GalleryLightboxProps {
  images: string[];
  title?: string;
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  title,
  activeIndex,
  onClose,
  onChangeIndex,
}: GalleryLightboxProps) {
  const thumbsContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onChangeIndex]);

  const goPrev = useCallback(() => {
    onChangeIndex((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onChangeIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [goNext, goPrev, onClose]);

  // Keep the active thumb in view, moving the strip by a single thumb
  // step at a time (rather than centering it) whenever it falls outside
  // the visible area of the scroll container.
  useEffect(() => {
    const container = thumbsContainerRef.current;
    const activeThumb = thumbRefs.current[activeIndex];
    if (!container || !activeThumb) return;

    const containerLeft = container.scrollLeft;
    const containerRight = containerLeft + container.clientWidth;
    const thumbLeft = activeThumb.offsetLeft;
    const thumbRight = thumbLeft + activeThumb.offsetWidth;

    const isFullyVisible =
      thumbLeft >= containerLeft && thumbRight <= containerRight;
    if (isFullyVisible) return;

    if (thumbRight > containerRight) {
      // Moving forward: step by the distance to the next thumb (falls back
      // to this thumb's own width if there isn't one).
      const nextThumb = thumbRefs.current[activeIndex + 1];
      const step = nextThumb
        ? nextThumb.offsetLeft - thumbLeft
        : activeThumb.offsetWidth;
      container.scrollBy({ left: step, behavior: "smooth" });
    } else if (thumbLeft < containerLeft) {
      // Moving backward: step by the distance from the previous thumb.
      const prevThumb = thumbRefs.current[activeIndex - 1];
      const step = prevThumb
        ? thumbLeft - prevThumb.offsetLeft
        : activeThumb.offsetWidth;
      container.scrollBy({ left: -step, behavior: "smooth" });
    }
  }, [activeIndex]);

  // Wrap the nav handlers so the click that triggers them doesn't also
  // bubble up and close the lightbox.
  const handlePrevClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      goPrev();
    },
    [goPrev]
  );

  const handleNextClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      goNext();
    },
    [goNext]
  );

  return (
    <div
      className="fixed inset-0 z-999 overflow-y-auto bg-black/80 cursor-pointer"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center py-100 3xl:py-[105px]">
        {/* Nothing here stops propagation at the row/wrapper level anymore.
            Only the actual interactive elements (arrows, image, thumbs)
            stop the click — any empty space around them, even inside
            these full-width rows, still closes the lightbox. */}
        <div className="container mx-auto flex flex-col items-center">
          {/* Main image row (with lg+ side arrows) */}
          <div className="relative flex w-full items-center justify-center gap-15">
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrevClick}
                className="hidden lg:flex shrink-0 items-center justify-center w-12 h-12 rounded-full border border-white text-white cursor-pointer"
                aria-label="Previous image"
              >
                <RiArrowLeftSLine size={30} />
              </button>
            )}

            <div
              className="relative h-[340px] w-full overflow-hidden rounded-[10px] sm:h-[320px] md:h-[400px] lg:h-[520px] 3xl:h-[678px] 3xl:w-[1470px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNextClick}
                className="hidden lg:flex shrink-0 items-center justify-center w-12 h-12 rounded-full border border-white text-white cursor-pointer"
                aria-label="Next image"
              >
                <RiArrowRightSLine size={30} />
              </button>
            )}
          </div>

          {/* Mobile/tablet nav buttons - under main image */}
          {images.length > 1 && (
            <div className="flex lg:hidden items-center gap-20 mt-30">
              <button
                type="button"
                onClick={handlePrevClick}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white text-white cursor-pointer"
                aria-label="Previous image"
              >
                <RiArrowLeftSLine size={30} />
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white text-white cursor-pointer"
                aria-label="Next image"
              >
                <RiArrowRightSLine size={30} />
              </button>
            </div>
          )}

          {/* Thumbnails - single row, horizontal scroll, scrollbar hidden */}
          {images.length > 1 && (
            <div
              ref={thumbsContainerRef}
              className="mt-30 flex w-full max-w-full justify-center items-center overflow-x-auto gap-[15px]"
            >
              {images.map((src, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={src + i}
                    ref={(el) => {
                      thumbRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeIndex(i);
                    }}
                    className={`relative h-[45px] w-[70px] shrink-0 overflow-hidden rounded-[5px] transition-all cursor-pointer sm:h-[55px] sm:w-[85px] lg:h-[63px] lg:w-[100px] ${
                      isActive ? "border border-white" : "border-0"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                    <div
                      className={`absolute inset-0 ${
                        isActive ? "bg-black/20" : "bg-black/35"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}