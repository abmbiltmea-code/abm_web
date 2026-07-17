"use client";

import Image from "next/image";
import { safetySectionData } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import SectionLabel from "../../common/SectionLabel";
import { useContainerInset } from "@/app/hooks/useContainerInset";
import { useEffect, useState } from "react";

export default function SafetySection() {
  const { label, title, description, image, items } = safetySectionData;
  const inset = useContainerInset();
  const [isBelowLg, setIsBelowLg] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    setIsBelowLg(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsBelowLg(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="bg-cream-background">
      <div className="lg:hidden relative w-full h-[266px] sm:h-[300px] md:h-[400px] lg:h-[450px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-top pointer-events-none select-none"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:gap-40 3xl:gap-80">
        <div
          className="pt-40 pb-[50px] lg:py-140 lg:w-[55%] 3xl:w-1/2"
          style={{
            paddingLeft: inset,
            paddingRight: isBelowLg ? inset : undefined,
          }}
        >
          <div className="mb-5 sm:mb-40">
            <SectionLabel title={label} />
          </div>

          <SectionTitle title={title} className="mb-20" />

          <SectionDescription
            text={description}
            className="mb-50 text-description-2 text-description-color"
          />

          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-[14px] gap-y-[30px] lg:gap-[10px]">
            {items.map((item) => (
              <div
                key={item.title}
                data-aos="fade-up"
                className="flex flex-col lg:flex-row lg:items-center pb-[10px] lg:pb-auto border-b lg:border-b-auto lg:border border-border-color lg:rounded-[10px] gap-[10px] sm:gap-4 3xl:gap-5 lg:px-[16px] lg:py-[15px]"
              >
                <div className="shrink-0 box-size rounded-[5px] bg-primary flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt="safety icon"
                    width={40}
                    height={40}
                    className="h-[20px] md:h-[24px] lg:h-[28px] xl:h-[32px] 3xl:h-[40px] w-auto pointer-events-none select-none"
                  />
                </div>
                <span className="text-[10px] font-tasa font-bold max-w-[140px] sm:text-subtitle uppercase sm:max-w-[229px]">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:w-[60%] 3xl:w-[969px] 3xl:shrink-0 lg:self-stretch">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover pointer-events-none select-none"
          />
        </div>
      </div>
    </section>
  );
}
