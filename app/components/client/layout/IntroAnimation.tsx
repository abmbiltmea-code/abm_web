"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const INTRO_ENABLED = process.env.NEXT_PUBLIC_ENABLE_INTRO !== "false";

const LEFT_HIDDEN = "inset(0% 0% 0% 100%)";
const RIGHT_HIDDEN = "inset(0% 100% 0% 0%)";
const REVEALED = "inset(0% 0% 0% 0%)";

export default function IntroAnimation() {
  const [show, setShow] = useState(INTRO_ENABLED);

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftLogoRef = useRef<HTMLDivElement>(null);
  const rightLogoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!INTRO_ENABLED) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleY: 0 });
      gsap.set(leftLogoRef.current, { clipPath: LEFT_HIDDEN });
      gsap.set(rightLogoRef.current, { clipPath: RIGHT_HIDDEN });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevOverflow;
          setShow(false);
          // window.dispatchEvent(new Event("introComplete"));
        },
      });

      tl.to(lineRef.current, {
        scaleY: 1,
        duration: 0.5,
        ease: "power3.inOut",
      })
        .to(
          leftLogoRef.current,
          { clipPath: REVEALED, duration: 1, ease: "expo.out" },
          "-=0.05",
        )
        .to(
          rightLogoRef.current,
          { clipPath: REVEALED, duration: 1, ease: "expo.out" },
          "<",
        )
        .to(
          leftLogoRef.current,
          { clipPath: LEFT_HIDDEN, duration: 0.7, ease: "power2.inOut" },
          "+=0.35",
        )
        .to(
          rightLogoRef.current,
          { clipPath: RIGHT_HIDDEN, duration: 0.7, ease: "power2.inOut" },
          "<",
        )
        .to(
          containerRef.current,
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "<0.2",
        )
        .call(
          () => window.dispatchEvent(new Event("introComplete")),
          [],
          "<0.2",
        );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="fixed inset-0 z-9999 flex items-center justify-center bg-white will-change-transform"
    >
      <div className="flex items-stretch justify-center gap-[16px]">
        <div
          ref={leftLogoRef}
          className="flex items-center will-change-[clip-path]"
          style={{ clipPath: LEFT_HIDDEN }}
        >
          <Image
            src="/assets/images/logos/animation/2.svg"
            alt=""
            width={500}
            height={500}
            priority
            className="h-11 md:h-16  3xl:h-[80px] w-auto object-contain"
          />
        </div>

        <div
          ref={lineRef}
          className="w-px bg-black/20 origin-center will-change-transform"
          style={{ transform: "scaleY(0)" }}
        />

        <div
          ref={rightLogoRef}
          className="flex items-center will-change-[clip-path]"
          style={{ clipPath: RIGHT_HIDDEN }}
        >
          <Image
            src="/assets/images/logos/animation/1.svg"
            alt="ABM"
            width={500}
            height={500}
            priority
            className="h-10 md:h-15 3xl:h-[75px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
