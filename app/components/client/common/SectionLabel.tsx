"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionLabelProps = {
  title: string;
  textColor?: string;
};

export default function SectionLabel({
  title,
  textColor = "text-[#5B5B5B]",
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
        "-=0.1"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center gap-[10px] min-w-[210px] 3xl:pt-[13px]">
      <div ref={dotRef} className="w-[9px] h-[9px] bg-primary shrink-0" />
      <span
        ref={textRef}
        className={`text-15 leading-[1.3333] font-tasa font-bold uppercase ${textColor}`}
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        {title}
      </span>
    </div>
  );
}