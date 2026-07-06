"use client";

import { useEffect, useRef, useState } from "react";
import Image, { ImageProps } from "next/image";

type AnimatedIconProps = ImageProps & {
  rootMargin?: string;
  threshold?: number;
};

export default function AnimatedIcon({
  rootMargin = "0px",
  threshold = 0.3,
  src,
  width,
  height,
  ...imageProps
}: AnimatedIconProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={wrapperRef} className="inline-block leading-none">
      {isVisible && (
        <Image
          key={typeof src === "string" ? src : undefined}
          src={src}
          width={width}
          height={height}
          {...imageProps}
        />
      )}
    </div>
  );
}