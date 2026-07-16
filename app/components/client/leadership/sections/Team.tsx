"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionDescription from "../../animations/SectionDescription";
import SectionTitle from "../../animations/SectionTitle";
import { teamManagementData } from "../data";
import { Autoplay } from "swiper/modules";

const Team = () => {
  const { title, description, items } = teamManagementData;
  return (
    <section className="container py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-[1fr_850px] gap-2.5 md:gap-40 mb-40">
        <SectionTitle title={title} className="max-w-[21ch]" />
        <SectionDescription
          text={description}
          className="text-description-color text-description-2 3xl:max-w-[850px]"
        />
      </div>
      <div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.1759}
          spaceBetween={40}
          speed={700}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1440: { slidesPerView: 4, spaceBetween: 30 },
            1820: { slidesPerView: 4, spaceBetween: 40 },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[286px] xl:h-[390px] 2xl:h-[420px] 3xl:h-[541px]">
                <div className="absolute inset-x-0 bottom-0 h-[93.16%] bg-cream-background" />
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-5">
                <p className="text-subtitle font-bold mb-[5px] uppercase">
                  {item.name}
                </p>
                <p className="text-description-color text-description-2">
                  {item.designation}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Team;
