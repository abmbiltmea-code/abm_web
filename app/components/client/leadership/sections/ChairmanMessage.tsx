"use client";

import Image from "next/image";
import SectionDescription from "../../animations/SectionDescription";
import SectionTitle from "../../animations/SectionTitle";
import { chairmanMessageData } from "../data";
import { useContainerInset } from "@/app/hooks/useContainerInset";
import { useEffect, useState } from "react";
import SectionReveal from "../../animations/SectionReveal";
import { moveUp } from "../../animations/motionVariants";

const ChairmanMessage = () => {
  const {
    title,
    description,
    name,
    designation,
    chairmanImage,
    leftQuoteImage,
    rightQuoteImage,
  } = chairmanMessageData;

  const inset = useContainerInset();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        paddingRight: isMobile ? inset : 0,
        paddingLeft: isMobile ? inset : 0,
      }}
      className="lg:pt-120 3xl:pt-[135px]"
    >
      <div
        style={{ paddingRight: isMobile ? 0 : inset }}
        className="flex flex-col lg:flex-row xl:items-end gap-[30px] lg:gap-60 xl:gap-80 justify-between"
      >
        {/* frame: aspect-locked, % of container, 3xl reverts to exact spec px */}
        <SectionReveal
          variants={moveUp(0.1)}
          className="mt-[60px] md:mt-[100px] lg:mt-0 order-2 lg:order-1 relative w-full lg:max-w-[500px] min-[1200px]:max-w-[580px]  xl:max-w-[650px] 2xl:max-w-[720px] 3xl:w-[825px] 3xl:max-w-none aspect-[825/725] bg-cream-background shrink-0"
        >
          <div
            style={{ left: isMobile ? 0 : inset }}
            className="absolute top-0 z-10 w-[32.7%] h-[74.07%] 3xl:w-[270px] 3xl:h-[537px]"
          >
            <Image
              src={leftQuoteImage}
              alt=""
              fill
              className="object-contain pointer-events-none select-none"
            />
          </div>

          <div
            style={{ left: isMobile ? "50%" : inset }}
            className="absolute bottom-0 z-20 w-[295px] min-[400px]:w-[85.09%] -translate-x-1/2 lg:translate-x-0 h-[391px] min-[400px]:h-[118.34%] 3xl:w-[702px] 3xl:h-[858px]"
          >
            <Image
              src={chairmanImage}
              alt={name}
              fill
              className="object-cover pointer-events-none select-none"
            />
          </div>

          <div className="hidden lg:block absolute bottom-[6.9%] right-[6.06%] z-30 w-[16.12%] h-[36.83%] 3xl:bottom-50 3xl:right-50 3xl:w-[133px] 3xl:h-[267px]">
            <Image
              src={rightQuoteImage}
              alt=""
              fill
              className="object-contain pointer-events-none select-none"
            />
          </div>
        </SectionReveal>

        <div className="order-1 lg:order-2 flex-1 min-[1900px]:max-w-[850px] self-start">
          <SectionTitle title={title} className="lg:max-w-[13ch]" />
          <SectionDescription
            text={description}
            className="mt-20 text-description-color text-description-2"
          />
          <div className="hidden lg:block mt-120 pt-30 lg:border-t border-border-color max-w-[796px]">
            <p className="text-subtitle-3 mb-[10px]">{name}</p>
            <p className="text-description-color text-description-2">
              {designation}
            </p>
          </div>
        </div>
      </div>
      <div className="pt-5 lg:hidden">
        <p className="text-subtitle-3 mb-[5px] lg:mb-[10px]">{name}</p>
        <p className="text-description-color text-description-2">
          {designation}
        </p>
      </div>
    </section>
  );
};

export default ChairmanMessage;
