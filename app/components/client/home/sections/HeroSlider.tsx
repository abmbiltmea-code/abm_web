"use client";

import { useRef, useState, useCallback } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { heroSlides } from "../data";
import Image from "next/image";

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

  return (
    <section className="relative h-svh w-full overflow-hidden">
      <div className="absolute inset-0 z-10 flex flex-row justify-between pointer-events-none">
        <Image
          src="/assets/images/logos/abm-watermark.svg"
          alt="ABM Watermark"
          width={1288}
          height={379}
          className="absolute left-0 bottom-0 object-cover h-[270px] 3xl:h-[330px] w-auto"
        />
      </div>
      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={900}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div
              style={{
                background:
                  "linear-gradient(249.19deg, rgba(0, 0, 0, 0) 28.77%, rgba(0, 0, 0, 0.8) 95.01%)",
              }}
              className="absolute inset-0"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-10 flex flex-row justify-between pointer-events-none  container">
        {/* ── LEFT COL ── */}
        <div className="pt-300 h-full relative flex flex-col justify-between">
          {/* Title */}
          <h1 className="text-white hero-title max-w-[26ch]">
            {heroSlides[activeIndex].title}
          </h1>
          {/* Scroll to explore */}
          <div className="flex gap-[15px] pointer-events-auto pb-190">
            <p className="text-white text-15 leading-[1.333] font-tasa font-bold uppercase pt-[3px]">
              Scroll to explore
            </p>
            <Image
              src="/assets/icons/double-arrow-white.svg"
              alt="scroll-icon"
              width={12}
              height={12}
            />
          </div>
        </div>

        {/* ── VERTICAL LINE ── */}
        <div className="flex items-end shrink-0 h-full ml-[12px]">
          <div
            className="w-px h-[77vh] 3xl:h-[80vh]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 48.72%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>

        {/* ── RIGHT COL ── */}
        <div className="flex items-end pb-170 shrink-0 pointer-events-auto">
          <div className="bg-black/10 backdrop-blur-2xl p-[15px] lg:p-[20px] min-w-[358px] 2xl:w-[390px] 3xl:w-[438px] rounded-[10px]">
            <div className="flex flex-col gap-[10px]">
              <p className="text-white text-subtitle uppercase">
                {heroSlides[activeIndex].subtitle}
              </p>
              <p className="text-white text-15 leading-[1.333] max-w-[398px] line-clamp-1">
                {heroSlides[activeIndex].description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-[20px]">
              <span className="text-white font-medium shrink-0 text-15 leading-1 lg:leading-[1.666667]">
                {String(activeIndex + 1).padStart(2, "0")}/
                <span className="text-white/30">
                  {String(heroSlides.length).padStart(2, "0")}
                </span>
              </span>
              <div className="flex items-center gap-[20px]">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src="/assets/icons/arrow-left-white.svg"
                    alt="arrow-left"
                    width={20}
                    height={20}
                    className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src="/assets/icons/arrow-left-white.svg"
                    alt="arrow-right"
                    width={20}
                    height={20}
                    className="rotate-180 w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
