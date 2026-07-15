"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionLabelProps = {
  title: string;
  textColor?: string;
  pt?: string;
};

export default function SectionLabel({
  title,
  textColor = "text-[#5B5B5B]",
  pt = "",
}: SectionLabelProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const text = textRef.current;

    if (!dot || !text) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: dot,
          start: "top 90%",
          once: true,
        },
      });

      tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.3 }).fromTo(
        text,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.8 },
        "-=0.1",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`flex items-center gap-[5px] sm:gap-[10px] min-w-[285px] ${pt}`}
    >
      <div
        ref={dotRef}
        className="w-[7px] h-[7px] sm:w-[10px] sm:h-[10px] bg-primary shrink-0 rounded-full"
      />
      <span
        ref={textRef}
        className={`text-[10px] sm:text-15 leading-none sm:leading-[1.3333] font-tasa font-bold uppercase pt-px ${textColor}`}
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        {title}
      </span>
    </div>
  );
}
