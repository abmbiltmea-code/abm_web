"use client";

import Image from "next/image";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SecondSection } from "@/app/types/division";

export default function Overview({ data }: { data: SecondSection }) {
  const { title, image, imageAlt, content } = data;
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -10, scale: 1 },
        {
          yPercent: 10,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-background py-120 3xl:py-140">
      <div className="container flex flex-col lg:flex-row justify-between items-center gap-y-5 md:gap-70">
        <div className="relative w-full lg:w-[45%] 3xl:w-[850px] h-[221px] sm:h-[360px] md:h-[450px] 3xl:h-[500px] rounded-[10px] overflow-hidden shrink-0">
          <Image
            ref={imageRef}
            src={image}
            alt={imageAlt}
            fill
            className="object-cover pointer-events-none select-none"
          />
        </div>

        <div className="w-full">
          <SectionTitle title={title} className="mb-[10px] sm:mb-5" />

          <SectionDescription
            html={content}
            className="division-overview-content space-y-4 md:space-y-6 3xl:space-y-8"
          />
        </div>
      </div>
    </section>
  );
}
