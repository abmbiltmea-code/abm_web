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
  const [renderKey, setRenderKey] = useState(0);
  const [introReady, setIntroReady] = useState(false);

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

  useEffect(() => {
    if (!introReady) return;
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setRenderKey((k) => k + 1);
        } else {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, introReady]);

  return (
    <div ref={wrapperRef} className="inline-block leading-none">
      {isVisible && (
        <Image
          key={`${typeof src === "string" ? src : "img"}-${renderKey}`}
          src={src}
          width={width}
          height={height}
          {...imageProps}
        />
      )}
    </div>
  );
}
