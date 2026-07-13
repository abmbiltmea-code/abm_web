"use client";

import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { sectorData } from "../data";
import { moveUpV2 } from "../../animations/motionVariants";
import Image from "next/image";

export default function SectorWeServe() {
  return (
    <section className="py-120 3xl:py-140 bg-secondary">
      <div
        className={`container flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px]`}
      >
        <div>
          <SectionLabel
            title={sectorData.label}
            pt="lg:pt-[10px]"
            textColor="text-white"
          />
        </div>

        <div className="flex flex-col lg:section-content-spacing gap-50 w-full">
          <SectionTitle
            title={sectorData.sectionTitle}
            className="max-w-[25ch] text-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 3xl:grid-cols-3">
            {sectorData.items.map((item, i) => {
              const lastCell = i === sectorData.items.length - 1;
              const secondLastCell = i === sectorData.items.length - 2;
              const thirdCell = i === sectorData.items.length - 3;

              return (
                <Reveal
                  key={item.title}
                  variants={moveUpV2}
                  delayRange={i * 0.1}
                  className="h-full"
                >
                  <div
                    className={`flex items-center gap-[18px] px-40 py-50 3xl:py-[56px] border rounded-[5px] border-[#f9f9f9] h-full 3xl:max-h-[181px] -mr-px
          ${lastCell ? "sm:-mt-[2px] 3xl:-mt-px" : ""}
          ${secondLastCell ? "xl:-mt-px" : ""}
          ${thirdCell ? "sm:-mt-px" : ""}
        `}
                  >
                    <span className="shrink-0 flex items-center justify-center bg-primary text-white text-subtitle w-[40px] h-[40px] 2xl:w-[50px] 2xl:h-[50px] rounded-[5px]">
                      <Image src={item.icon} alt="icon" width={29} height={29} />
                    </span>
                    <p className="text-30 leading-[1.1666666667] font-tasa font-bold uppercase text-white max-w-[280px]">
                      {item.title}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
