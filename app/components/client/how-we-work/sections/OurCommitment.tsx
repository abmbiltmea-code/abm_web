"use client";

import Image from "next/image";
import { useState } from "react";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { ourCommitmentData } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function OurCommitment() {
  const { sectionLabel, title, description, items } = ourCommitmentData;
  const [active, setActive] = useState(1);

  return (
    <section className="bg-cream-background py-120 3xl:py-140 overflow-hidden">
      <div className="container">
        <div className="mb-5 sm:mb-40">
          <SectionLabel title={sectionLabel} />
        </div>
        <SectionTitle title={title} className="mb-2.5 sm:mb-5" />
        <SectionDescription
          text={description}
          className="max-w-[75ch] mb-40 lg:mb-30 text-description-2 text-description-color"
        />
        <div className="hidden lg:flex flex-col lg:flex-row gap-60 3xl:gap-100">
          {/* Left side */}
          <div className="w-full lg:w-[55%] 3xl:w-[1055px] shrink-0">
            <div className="relative w-full h-full 3xl:w-[1055px] 3xl:h-[680px] rounded-[10px] overflow-hidden">
              <Image
                src={items[active].image}
                alt={items[active].title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col justify-between lg:mt-[30px] lg:mb-90">
            <div className="flex flex-col lg:max-w-[392px]">
              {items.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`flex justify-between text-left border-b border-border-color last:border-0 transition-colors duration-500 text-20 leading-[2.5] font-tasa ${
                    active === index
                      ? "text-secondary font-bold"
                      : "text-description-color hover:text-secondary"
                  }`}
                >
                  <span className="uppercase">{item.title}</span>

                  <Image
                    src="/assets/icons/arrow-right-primary.svg"
                    alt=""
                    width={24}
                    height={17}
                    className={`shrink-0 transition-all duration-400 ${
                      active === index
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-3 pointer-events-none"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="lg:mt-80 3xl:mt-40">
              <h3 className="text-subtitle-3 mb-5">{items[active].title}</h3>
              <p className="text-description-color text-description-2 lg:max-w-[514px]">
                {items[active].description}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:hidden w-full">
          <Swiper
            modules={[Autoplay]}
            speed={700}
            spaceBetween={15}
            slidesPerView={1.1838}
            breakpoints={{
              640: { slidesPerView: 1.6, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 15 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="!overflow-visible [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-[10px] overflow-hidden h-full flex flex-col bg-white">
                  <div className="relative w-full h-[161px] shrink-0">
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
      </div>
    </section>
  );
}
