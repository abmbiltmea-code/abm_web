"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../animations/motionVariants";
import SectionReveal from "../../animations/SectionReveal";
import { FourthSection } from "@/app/types/about";

export default function CoreValuesSection({ data }: { data: FourthSection }) {
  const { sectionLabel, title, items } = data;
  const [activeIndex, setActiveIndex] = useState(1);
  const [baseImage, setBaseImage] = useState(items[1].image);

  const activeItem = items[activeIndex];

  return (
    <section className="bg-cream-background py-120 3xl:py-140 overflow-hidden">
      <div className="container flex flex-col lg:flex-row justify-between gap-50">
        {/* Left */}
        <div className="flex flex-col lg:gap-150 3xl:gap-[165px]">
          <div className="flex flex-col gap-5 md:gap-40">
            <SectionLabel title={sectionLabel} />
            <SectionTitle title={title} />
          </div>

          {/* Tabs */}
          <ul className="hidden lg:flex flex-col">
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <Reveal key={i} variants={moveUpV2} delayRange={i * 0.12}>
                  <li>
                    <button
                      onClick={() => setActiveIndex(i)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-fit min-w-[315px] flex items-center justify-between ${
                        i < items.length - 1 ? "border-b border-[#CCCCCC]" : ""
                      }`}
                    >
                      <span
                        className={`uppercase font-tasa text-20 leading-[2.5] ${
                          isActive
                            ? "font-bold text-secondary"
                            : "text-description-color"
                        }`}
                      >
                        {item.title}
                      </span>
                      <Image
                        src="/assets/icons/arrow-right-primary.svg"
                        alt=""
                        width={22}
                        height={22}
                        className={`shrink-0 transition-all duration-300 ease-in-out h-[16px] w-auto pointer-events-none ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-3"
                        }`}
                      />
                    </button>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* Right */}
        <SectionReveal
          variants={moveUp(0.1)}
          className="hidden lg:flex flex-col gap-40 max-w-[55%] 3xl:max-w-[935px]"
        >
          <div className="relative w-full h-[450px] 3xl:h-[545px] overflow-hidden rounded-[10px]">
            <Image
              src={baseImage}
              alt=""
              fill
              className="object-cover object-center pointer-events-none"
            />

            <motion.div
              key={activeIndex}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => setBaseImage(activeItem.image)}
              className="absolute inset-0"
            >
              <Image
                src={activeItem.image}
                alt={activeItem.imageAlt}
                fill
                className="object-cover object-center pointer-events-none"
              />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="text-description-2 text-description-color"
            >
              {activeItem.description}
            </motion.p>
          </AnimatePresence>
        </SectionReveal>

        {/* Mobile / below-lg slider */}
        <div className="lg:hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.184}
            spaceBetween={15}
            speed={700}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            className="!overflow-visible"
          >
            {items.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="h-[290px] sm:h-[320px] md:h-[360px] flex flex-col rounded-[10px] overflow-hidden bg-white">
                  <div className="relative w-full h-[52.418%]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px] py-5 px-[15px]">
                    <h3 className="uppercase text-subtitle-2">{item.title}</h3>
                    <p className="text-description-2 text-description-color">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
