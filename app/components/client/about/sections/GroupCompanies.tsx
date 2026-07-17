"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { groupCompaniesSection } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import CustomButton from "../../common/CustomButton";
import { moveUp } from "../../animations/motionVariants";
import SectionReveal from "../../animations/SectionReveal";
import AnimatedDivider from "../../animations/AnimatedDivider";

export default function GroupCompanies() {
  const { label, title } = groupCompaniesSection;

  return (
    <section className="w-full overflow-hidden">
      <div className="container py-[60px] md:py-120 3xl:py-150">
        <div className="flex flex-col gap-5 md:gap-40 mb-50">
          <SectionLabel title={label} />
          <SectionTitle title={title} />
        </div>
        <div className="2xl:hidden">
          <Swiper
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 1.181 },
              768: { slidesPerView: 2 },
              1400: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="!overflow-visible [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
          >
            {groupCompaniesSection.groupCompanies.map((card, index) => (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className="flex flex-col rounded-[10px] border border-border-color px-[15px] sm:px-40 3xl:px-60 pt-20 pb-60 3xl:pb-[66px] h-full"
                >
                  <div className="relative w-full mb-20">
                    <Image
                      src={card.logo || "/assets/images/placeholder.png"}
                      alt={card.title}
                      width={245}
                      height={123}
                      className="object-contain object-left h-[58px] w-[160px] sm:w-auto xl:h-[100px] 3xl:h-[123px]"
                    />
                  </div>
                  <span className="block w-full h-px bg-border-color mb-[50px] md:mb-80" />
                  <h3 className="text-secondary text-subtitle-2 mb-20">
                    {card.title}
                  </h3>
                  <p className="text-description-2 text-description-color mb-5 md:mb-40">
                    {card.description}
                  </p>
                  <div className="flex-1" />
                  <CustomButton
                    className="w-fit"
                    target="_blank"
                    text={card.buttonText}
                    href={card.href}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <SectionReveal
          variants={moveUp(0.1)}
          className="hidden 2xl:grid grid-cols-6 gap-5"
        >
          {groupCompaniesSection.groupCompanies.map((card, index) => {
            const total = groupCompaniesSection.groupCompanies.length;
            const remainder = total % 3;
            const isInLastPartialRow =
              remainder !== 0 && index >= total - remainder;

            return (
              <div
                key={index}
                className={`flex flex-col rounded-[10px] border border-border-color px-[15px] sm:px-40 3xl:px-60 pb-60 3xl:pb-[66px] h-full ${
                  card.logo ? "pt-20" : "pt-60 3xl:pt-[66px]"
                } ${isInLastPartialRow ? "col-span-3" : "col-span-2"}`}
              >
                {card.logo && (
                  <>
                    <div className="relative w-full mb-20">
                      <Image
                        src={card.logo}
                        alt={card.title}
                        width={245}
                        height={123}
                        className="object-contain object-left h-[58px] w-[160px] sm:w-auto xl:h-[100px] 3xl:h-[123px] pointer-events-none"
                      />
                    </div>
                    <AnimatedDivider className="mb-[50px] md:mb-80 border-border-color" />
                  </>
                )}
                <h3 className="text-secondary text-subtitle-2 mb-20">
                  {card.title}
                </h3>
                <p className="text-description-2 text-description-color mb-5 md:mb-40">
                  {card.description}
                </p>
                <div className="flex-1" />
                <CustomButton
                  className="w-fit"
                  target="_blank"
                  text={card.buttonText}
                  href={card.href}
                />
              </div>
            );
          })}
        </SectionReveal>
      </div>
    </section>
  );
}
