"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SectionLabel from "@/app/components/client/common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import { servicesGridData } from "../data";
import ServiceCard from "./ServiceCard";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";

export default function WhatWeDo() {
  return (
    <section className="py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="container flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] mb-50">
        <div className="shrink-0">
          <SectionLabel title={servicesGridData.label} pt="lg:pt-[10px]" />
        </div>

        <div className="flex flex-col lg:section-content-spacing">
          <SectionTitle title={servicesGridData.title} />
        </div>
      </div>

      <div className="container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          loop={true}
          speed={800}
          slidesPerView={1.184}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="!overflow-visible [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
          breakpoints={{
            640: { slidesPerView: 1.6, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 2, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 20 },
            1600: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {servicesGridData.items.map((item, i) => (
            <SwiperSlide key={item.title}>
              <Reveal
                variants={moveUpV2}
                delayRange={i * 0.14}
                className="h-full"
              >
                <ServiceCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              </Reveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
