"use client";

import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { sectorData } from "../data";
import { moveUpV2 } from "../../animations/motionVariants";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function SectorWeServe() {
  return (
    <section className="py-120 3xl:py-140 bg-secondary overflow-hidden">
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

          {/* Mobile Slider */}
          <div className="md:hidden -mx-container-px">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              speed={700}
              spaceBetween={-1}
              slidesPerView={1.5}
              breakpoints={{
                640: {
                  slidesPerView: 1.8,
                }
              }}
              className="!overflow-visible !px-container-px"
            >
              {sectorData.items.map((item) => (
                <SwiperSlide key={item.title}>
                  <div className="flex flex-col gap-2.5 sm:gap-[18px] px-5 py-5 sm:px-40 sm:py-50 border rounded-[5px] border-[#f9f9f9] h-full">
                    <span className="shrink-0 flex items-center justify-center bg-primary text-white text-subtitle w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] lg:w-[40px] lg:h-[40px] rounded-[5px]">
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={29}
                        height={29}
                        className="w-[20px] h-[20px] md:w-auto md:h-[29px]"
                      />
                    </span>
                    <p className="text-30 leading-[1.1666666667] font-tasa font-bold uppercase text-white max-w-[280px]">
                      {item.title}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 3xl:grid-cols-3">
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
                    className={`flex items-center gap-3 xl:gap-[18px] px-30 xl:px-40 py-30 xl:py-50 3xl:py-[56px] border rounded-[5px] border-[#f9f9f9] h-full 3xl:max-h-[181px] -mr-px
          ${lastCell ? "sm:-mt-[2px] 3xl:-mt-px" : ""}
          ${secondLastCell ? "xl:-mt-px" : ""}
          ${thirdCell ? "sm:-mt-px" : ""}
        `}
                  >
                    <span className="shrink-0 flex items-center justify-center bg-primary text-white text-subtitle w-[40px] h-[40px] 2xl:w-[50px] 2xl:h-[50px] rounded-[5px]">
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={29}
                        height={29}
                      />
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
