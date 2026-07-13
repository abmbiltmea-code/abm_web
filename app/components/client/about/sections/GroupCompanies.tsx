"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { groupCompaniesSection } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import CustomButton from "../../common/CustomButton";

export default function GroupCompanies() {
  const { label, title } = groupCompaniesSection;

  return (
    <section className="w-full overflow-hidden">
      <div className="container py-120 3xl:py-150">
        <div className="flex flex-col gap-40 mb-50">
          <SectionLabel title={label} />
          <SectionTitle title={title} />
        </div>
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1400: { slidesPerView: 3 },
          }}
        >
          {groupCompaniesSection.groupCompanies.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="flex flex-col rounded-[10px] border border-border-color px-40 3xl:px-60 pt-20 pb-60 3xl:pb-[66px] h-full">
                <div className="relative h-full w-full mb-20">
                  <Image
                    src={card.logo}
                    alt={card.title}
                    width={245}
                    height={123}
                    className="object-contain object-left h-[100px] 3xl:h-[123px]"
                  />
                </div>
                <span className="block w-full h-px bg-border-color mb-80" />
                <h3 className="text-secondary text-subtitle-2 mb-20">
                  {card.title}
                </h3>
                <p className="text-description-2 text-description-color mb-40 flex-1">
                  {card.description}
                </p>
                <CustomButton className="w-fit" target="_blank" text={card.buttonText} href={card.href} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
