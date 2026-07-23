"use client";

import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { whyChooseAbmData } from "../data";
import { moveUpV2 } from "../../animations/motionVariants";
import InnerCtaSecondary from "../../common/InnerCtaSecondary";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FourthSection, ThirdSection } from "@/app/types/sector";

export default function WhyChooseAbm({ data, cta }: { data: ThirdSection, cta: FourthSection }) {
  return (
    <>
      <section className="lg:pb-120 3xl:pb-150 relative overflow-hidden">
        <div className="bg-cream-background absolute inset-0 h-full lg:h-[76%]" />
        <div
          className={`relative container flex flex-col xl:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] py-120 3xl:py-140`}
        >
          <div>
            <SectionLabel title={data.sectionLabel} pt="lg:pt-[10px]" />
          </div>

          <div className="flex flex-col lg:section-content-spacing gap-50 w-full">
            <SectionTitle title={data.title} className="max-w-[25ch]" />

            <div className="hidden xl:grid grid-cols-1 sm:grid-cols-2 3xl:grid-cols-[repeat(2,minmax(0,560px))]">
              {data.items.map((item, i) => {
                const isFirstCol = i % 2 === 0;
                const isFirstRow = i < 2;
                const lastCell = i === data.items.length - 1;
                const secondLastCell = i === data.items.length - 2;

                return (
                  <Reveal
                    key={item.title}
                    variants={moveUpV2}
                    delayRange={i * 0.1}
                    className="h-full"
                  >
                    <div
                      className={`flex items-center gap-20 px-5 2xl:px-40 py-30 3xl:py-[29px] border rounded-[10px] border-border-color h-full 3xl:max-h-[139px]
          ${!isFirstCol ? "-ml-px" : ""}
          ${!isFirstRow ? "-mt-px" : ""}
          ${lastCell ? "mt-[-2px]" : ""}
          
        `}
                    >
                      <span className="shrink-0 flex items-center justify-center bg-primary text-white text-subtitle w-9 h-9">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        className={`text-subtitle-3 text-secondary ${secondLastCell ? "max-w-[396px]" : "max-w-[411px]"}`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="xl:hidden">
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                speed={700}
                spaceBetween={15}
                slidesPerView={1.1478}
                breakpoints={{
                  640: {
                    slidesPerView: 1.6,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2.3,
                    spaceBetween: 20,
                  },
                }}
                className="!overflow-visible [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
              >
                {whyChooseAbmData.items.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex flex-col gap-2.5 sm:gap-[18px] px-5 py-5 sm:px-40 sm:py-50 border rounded-[10px] border-border-color h-full">
                      <span className="shrink-0 flex items-center justify-center bg-primary text-white text-subtitle w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] lg:w-[40px] lg:h-[40px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-30 leading-[1.1666666667] font-tasa font-bold uppercase max-w-[280px]">
                        {item.title}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="hidden lg:block container relative">
          <InnerCtaSecondary
            title={cta.title}
            maxTitleWidth="max-w-[35ch]"
            btnText={cta.button.text}
            btnLink={cta.button.link}
          />
        </div>
      </section>

      <div className="lg:hidden py-[60px] container">
        <InnerCtaSecondary
          title={cta.title}
          maxTitleWidth="max-w-[35ch]"
          btnText={cta.button.text}
          btnLink={cta.button.link}
        />
      </div>
    </>
  );
}
