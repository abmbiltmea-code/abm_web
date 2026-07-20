"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { whyJoinUsData } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";

export default function WhyJoinUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [baseImage, setBaseImage] = useState(whyJoinUsData[0].image);
  const active = whyJoinUsData[activeIndex];

  return (
    <section className="bg-cream-background py-120 3xl:py-140 overflow-hidden">
      <div className="container">
        <div className="lg:hidden">
          <SectionTitle title="Why Join Us" className="mb-50" />
          <Swiper
            modules={[Autoplay]}
            speed={700}
            spaceBetween={15}
            slidesPerView={1.1838}
            breakpoints={{
              640: { slidesPerView: 1.6, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 2, spaceBetween: 20 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="!overflow-visible [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
          >
            {whyJoinUsData.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="rounded-[10px] overflow-hidden h-full flex flex-col bg-white">
                  <div className="relative w-full h-[170px] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="py-5 px-[15px]">
                    <h3 className="text-subtitle-2 uppercase mb-2.5 sm:mb-5">
                      {item.title}
                    </h3>
                    <p className="text-description-color text-description-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden lg:flex flex-col lg:flex-row lg:justify-between items-center gap-60">
          {/* Left: Image */}
          <div className="relative w-full lg:w-[50%] 3xl:w-[866px] h-[320px] sm:h-[420px] lg:h-[500px] 3xl:h-[585px] rounded-[10px] overflow-hidden shrink-0">
            <Image
              src={baseImage}
              alt=""
              fill
              className="object-cover"
              priority
            />

            <motion.div
              key={activeIndex}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => setBaseImage(active.image)}
              className="absolute inset-0"
            >
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
          {/* Right: Accordion */}
          <div className="w-full lg:w-[50%]">
            <SectionTitle title="Why Join Us" className="mb-50" />
            <div className="flex flex-col">
              {whyJoinUsData.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <Reveal
                    variants={moveUpV2}
                    key={item.title}
                    className="border-t border-border-color"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className={`w-full flex items-start gap-30 -mt-px text-left ${index === whyJoinUsData.length - 1 ? "pb-0" : "pb-50"}`}
                    >
                      <span
                        className={`flex items-center justify-center box-size shrink-0 text-description-2 rounded-[5px] transition-colors duration-400 ${
                          isActive
                            ? "bg-primary text-white"
                            : "border border-border-color text-description-color"
                        }`}
                      >
                        {/* {String(index + 1).padStart(2, "0")} */}
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <span
                          className={`block text-subtitle-2 uppercase transition-colors duration-400 mt-[9px] ${
                            isActive ? "text-primary" : "text-secondary"
                          }`}
                        >
                          {item.title}
                        </span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-description-2 text-description-color mt-5">
                                {item.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>{" "}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
