"use client";

import Image from "next/image";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { SecondSection } from "@/app/types/how-we-work";

interface ProcessProps {
  data: SecondSection;
}

export default function Process({ data }: ProcessProps) {
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
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-5 sm:gap-40 md:gap-80 lg:flex-row">
          {/* Left: image */}
          <div className="relative aspect-4/3 max-sm:max-h-[221px] w-full overflow-hidden rounded-[10px] 3xl:h-[600px] 3xl:w-[995px] 3xl:shrink-0">
            <Image
              ref={imageRef}
              src={data.image}
              alt={data.imageAlt}
              fill
              className="object-cover pointer-events-none select-none"
            />
          </div>
          {/* Right: content */}
          <div className="flex w-full lg:w-[90%] flex-col gap-[10px] sm:gap-5">
            <SectionTitle title={data.title} />
            <SectionDescription
              text={data.description}
              className="text-description-2 text-description-color"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
