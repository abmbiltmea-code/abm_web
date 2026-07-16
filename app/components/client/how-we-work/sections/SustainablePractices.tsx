"use client";

import Image from "next/image";
import { sustainablePracticesData } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function SustainablePractices() {
  const { sectionLabel, title, description, items } = sustainablePracticesData;
  const [active, setActive] = useState(0);

  const handleSetActive = (index: number) => {
    setActive(index);
  };

  return (
    <section className="container py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="hidden xl:grid lg:grid-cols-[42%_58%] 3xl:grid-cols-[725px_1fr] gap-y-50">
        {/* Row 1, Col 1 */}
        <div>
          <SectionLabel title={sectionLabel} />
        </div>

        {/* Row 1, Col 2 */}
        <div>
          <SectionTitle title={title} className="mb-5 max-w-[22ch]" />
          <SectionDescription
            text={description}
            className="text-description-color text-description-2"
          />
        </div>

        {/* Row 2, Col 1 — image */}
        <div className="relative h-[400px] lg:h-full 3xl:min-h-[655px] rounded-[10px] overflow-hidden">
          <Image
            src={items[active].image}
            alt={items[active].title}
            fill
            className="object-cover"
          />
        </div>

        {/* Row 2, Col 2 — items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr">
          {items.map((item, index) => (
            <div
              key={item.title}
              onMouseEnter={() => handleSetActive(index)}
              className={`rounded-[10px] px-30 3xl:px-40 pt-50 pb-30 transition-colors -mr-px -mb-px ${
                active === index
                  ? "bg-primary/10 border border-primary/10 z-10"
                  : "border border-border-color z-0"
              }`}
            >
              <h3 className="text-subtitle-3 mb-5 max-w-[329px]">
                {item.title}
              </h3>
              <p className="text-description-color text-description-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="xl:hidden">
        <div className="mb-5 sm:mb-40">
          <SectionLabel title={sectionLabel} />
        </div>
        <SectionTitle
          title={title}
          className="mb-[10px] sm:mb-5 max-w-[22ch]"
        />
        <SectionDescription
          text={description}
          className="text-description-color text-description-2 mb-[30px]"
        />
        <div className="w-full">
          <div className="w-full">
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
                    <div className="relative w-full h-[190px] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="py-5 px-[15px] border-b border-x border-border-color rounded-x-[10px] rounded-b-[10px]">
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
      </div>
    </section>
  );
}
