"use client";

import Image from "next/image";
import { useState } from "react";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { strengthsData } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

export default function Strengths() {
  const { label, title, description, items } = strengthsData;
  const [active, setActive] = useState(1);
  const [baseImage, setBaseImage] = useState(items[1].image);

  return (
    <section className="py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="container">
        <div className="mb-5 md:mb-[30px]">
          <SectionLabel title={label} />
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between gap-2.5 md:gap-40 mb-50">
          <SectionTitle title={title} className="max-w-[20ch]" />
          <SectionDescription
            text={description}
            className="xl:max-w-[560px] text-description-color text-description-2"
          />
        </div>
      </div>

      {/* Below xl - Card Slider */}
      <div className="xl:hidden container">
        <Swiper
          modules={[Autoplay]}
          speed={700}
          spaceBetween={15}
          slidesPerView={1.1759}
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
          {items.map((item) => (
            <SwiperSlide key={item.title}>
              <div className="rounded-[10px] overflow-hidden border border-border-color h-full flex flex-col">
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

      <div className="container hidden xl:flex flex-col xl:flex-row justify-between gap-50 3xl:gap-80">
        {/* Left - Accordion */}
        <div className="w-full lg:w-1/2 border-t border-border-color">
          {items.map((item, index) => {
            const isActive = active === index;
            const nextIsActive = active === index + 1;
            const showBorder = !isActive && !nextIsActive;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`relative overflow-hidden py-40 pr-40 transition-[padding] duration-500 ${
                  isActive ? "pl-40" : "pl-0"
                } ${showBorder ? "border-b border-border-color" : ""}`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 origin-left transition-transform duration-600 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(227, 30, 38, 0.2) 0%, rgba(227, 30, 38, 0.02) 100%)",
                  }}
                />

                <div className="relative">
                  <h3
                    className={`text-subtitle-2 uppercase ${isActive ? "mb-5" : ""}`}
                  >
                    {item.title}
                  </h3>

                  {isActive && (
                    <p className="text-description-color text-description-2 max-w-[652px]">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right - Image */}
        <div className="relative w-full lg:w-[48%] 3xl:w-[870px] min-[1900px]:h-[660px] shrink-0 rounded-[10px] overflow-hidden">
          <Image src={baseImage} alt="" fill className="object-cover" />

          <motion.div
            key={active}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={() => setBaseImage(items[active].image)}
            className="absolute inset-0"
          >
            <Image
              src={items[active].image}
              alt={items[active].title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
