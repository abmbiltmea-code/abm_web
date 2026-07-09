"use client";

import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { whyChooseAbmData } from "../data";
import { moveUpV2 } from "../../animations/motionVariants";
import InnerCtaSecondary from "../../common/InnerCtaSecondary";

export default function WhyChooseAbm() {
  return (
    <section className="pb-[60px] md:pb-120 3xl:pb-150 relative">
        <div className="bg-cream-background absolute inset-0 h-[76%]" />
      <div
        className={`relative container flex flex-col lg:flex-row 3xl:justify-between gap-y-[20px] md:gap-y-[30px] py-120 3xl:py-140`}
      >
        <div>
          <SectionLabel title={whyChooseAbmData.labelTitle} pt="lg:pt-[10px]" />
        </div>

        <div className="flex flex-col lg:section-content-spacing gap-50 w-full">
          <SectionTitle
            title={whyChooseAbmData.sectionTitle}
            className="max-w-[25ch]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 3xl:grid-cols-[repeat(2,minmax(0,560px))]">
            {whyChooseAbmData.items.map((item, i) => {
              const isFirstCol = i % 2 === 0;
              const isFirstRow = i < 2;
              const lastCell = i === whyChooseAbmData.items.length - 1;

              return (
                <Reveal
                  key={item.title}
                  variants={moveUpV2}
                  delayRange={i * 0.1}
                  className="h-full"
                >
                  <div
                    className={`flex items-center gap-20 px-40 py-30 3xl:py-[29px] border rounded-[10px] border-border-color h-full 3xl:max-h-[139px]
          ${!isFirstCol ? "-ml-px" : ""}
          ${!isFirstRow ? "-mt-px" : ""}
          ${lastCell ? "mt-[-2px]" : ""}
          
        `}
                  >
                    <span className="shrink-0 flex items-center justify-center bg-primary text-white text-subtitle w-9 h-9">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-subtitle-3 text-secondary max-w-[411px]">
                      {item.title}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container relative">
        <InnerCtaSecondary
          title={whyChooseAbmData.ctaTitle}
          maxTitleWidth="max-w-[35ch]"
          btnText={whyChooseAbmData.ctaBtnText}
          btnLink={whyChooseAbmData.ctaBtnLink}
        />
      </div>
    </section>
  );
}
