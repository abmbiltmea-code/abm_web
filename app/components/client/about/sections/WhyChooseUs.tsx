"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { useRef, useState, useEffect } from "react";
import "swiper/css";

import { whyChooseUsSection } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import { Autoplay } from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";

const AUTOPLAY_DELAY = 4000;

export default function WhyChooseUs() {
  const { label, title } = whyChooseUsSection;
  const slides = whyChooseUsSection.slides;
  const [baseImage, setBaseImage] = useState(slides[0].image);

  const swiperRef = useRef<SwiperClass | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isIndexVisible = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return true;
    const slidesPerView =
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1;
    const start = swiper.activeIndex;
    const end = start + slidesPerView - 1;
    return index >= start && index <= end;
  };

  const startAutoplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => {
        const next = prev + 1 >= slides.length ? 0 : prev + 1;
        requestAnimationFrame(() => {
          if (next === 0) {
            swiperRef.current?.slideTo(0);
          } else if (!isIndexVisible(next)) {
            swiperRef.current?.slideNext();
          }
        });
        return next;
      });
    }, AUTOPLAY_DELAY);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex]);

  const activeSlide = slides[activeIndex];

  return (
    <section className="py-120 3xl:py-140 bg-cream-background overflow-hidden">
      <div className="container">
        {/* HEADER */}
        <div className="flex flex-col gap-5 md:gap-40 mb-50">
          <SectionLabel title={label} />
          <SectionTitle title={title} />
        </div>

        {/* MOBILE SWIPER — below md */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: AUTOPLAY_DELAY,
              disableOnInteraction: false,
            }}
            spaceBetween={15}
            slidesPerView={1.0507}
            className="!overflow-visible"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="flex flex-col rounded-[10px] overflow-hidden">
                  <div className="relative w-full min-h-[170px] sm:h-[50.148%]">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover pointer-events-none"
                    />
                  </div>
                  <div className="flex flex-col px-[15px] py-[19px] border border-border-color rounded-b-[10px]">
                    <div className="flex items-center gap-[10px] mb-[10px]">
                      <div className="text-[10px] sm:text-15 font-tasa font-bold leading-none w-6 h-6 rounded-[5px] flex items-center justify-center border border-primary bg-primary/10">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-subtitle-2 text-secondary">
                        {slide.title}
                      </h3>
                    </div>
                    <span className="block w-full h-px bg-border-color mb-[10px]" />
                    <p className="text-description-2 text-description-color">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* TAB SWIPER */}
        <div className="hidden md:block">
          <Swiper
            spaceBetween={20}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              0: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
            }}
            className="mb-60"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <SwiperSlide key={slide.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                      if (!isIndexVisible(index)) {
                        swiperRef.current?.slideTo(index);
                      }
                      startAutoplay();
                    }}
                    className="w-full flex flex-col items-center group cursor-pointer"
                  >
                    {/* Number */}
                    <span
                      className={`mb-[10px] text-15 leading-[1.33333] w-9 h-9 rounded-[5px] flex items-center justify-center border border-border-color transition-colors duration-300
                        ${isActive ? "border-primary bg-primary/10" : "border-border-color text-[#5B5B5B]"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {/* Title */}
                    <span
                      className={`text-subtitle transition-colors duration-300 mb-[15px]
                        ${isActive ? "" : "text-secondary"}`}
                    >
                      {slide.title}
                    </span>
                    {/* Line */}
                    <span
                      className={`block w-full relative ${isActive ? "h-[2px] -mt-px" : "h-px"}`}
                    >
                      {/* Base track — always visible at 1px */}
                      <span className="absolute inset-0 top-auto bottom-0 h-px w-full bg-border-color" />
                      {isActive && (
                        <span
                          key={activeIndex}
                          className="absolute inset-y-0 left-0 bg-primary"
                          style={{
                            animation: `progress-line ${AUTOPLAY_DELAY}ms linear forwards`,
                          }}
                        />
                      )}
                    </span>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* ACTIVE SLIDE CONTENT */}
        <div className="hidden md:flex flex-col md:flex-row gap-40 lg:gap-120 3xl:gap-[145px] md:items-center">
          {/* Image */}
          <div className="relative w-full md:max-w-[50%] 3xl:max-w-[849px] rounded-[10px] overflow-hidden max-h-[560px] aspect-15/10 shrink-0">
            <Image
              src={baseImage}
              alt=""
              fill
              className="object-cover pointer-events-none"
            />

            <motion.div
              key={activeIndex}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => setBaseImage(activeSlide.image)}
              className="absolute inset-0"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                className="object-cover pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-20">
            <AnimatePresence mode="wait">
              <motion.div key={activeIndex}>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                  className="text-subtitle-2 text-secondary"
                >
                  {activeSlide.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className="text-description-2 text-description-color md:max-w-[42ch] 3xl:max-w-[600px]"
                >
                  {activeSlide.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
