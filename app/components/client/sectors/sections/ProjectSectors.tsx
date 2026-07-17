"use client";

import Image from "next/image";
import { projectSectorsData } from "../data";
import SectionDescription from "../../animations/SectionDescription";
import SectionTitle from "../../animations/SectionTitle";
import CustomButton from "../../common/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import AnimatedDivider from "../../animations/AnimatedDivider";
import SectionReveal from "../../animations/SectionReveal";
import { clipReveal } from "../../animations/motionVariants";

const ProjectSectors = () => {
  return (
    <section className="overflow-hidden">
      <div className="hidden lg:flex flex-col pb-[60px] md:pb-120 3xl:pb-150 container">
        <AnimatedDivider className="border-border-color" />
        {projectSectorsData.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={item.title}
              className={`flex flex-col lg:flex-row items-center justify-between pt-40 pb-80 last:pb-0 gap-y-30 gap-x-80 3xl:gap-x-[81px] ${
                index !== 0 ? "border-t border-border-color" : ""
              }`}
            >
              {/* Text content */}
              <div
                className={`flex flex-col w-full lg:w-[48%] 3xl:w-auto ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <SectionTitle title={item.title} className="mb-20" />
                <SectionDescription
                  text={item.description}
                  className="text-description-color mb-40"
                />
                <CustomButton text={item.btnText} href={item.btnLink} />
              </div>

              {/* Image */}
              <SectionReveal
                variants={clipReveal(!isEven)}
                className={`relative w-full lg:w-[52%] h-[280px] lg:h-[350px] xl:h-[400px] rounded-[10px] overflow-hidden 3xl:shrink-0 3xl:w-[850px] 3xl:h-[520px] ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </SectionReveal>
            </div>
          );
        })}
      </div>
      <div className="container">
        <div className="lg:hidden border-t border-border-color pt-[30px] pb-[60px] md:pb-120 3xl:pb-150">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.1766}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            spaceBetween={15}
            className="!overflow-visible [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
            breakpoints={{
              640: { slidesPerView: 1.6, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 15 },
            }}
          >
            {projectSectorsData.map((item) => (
              <SwiperSlide key={item.title}>
                <div className="flex flex-col rounded-[10px] overflow-hidden border border-border-color h-full">
                  {/* Image */}
                  <div className="relative w-full h-[180px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col px-[15px] py-[20px] sm:p-30">
                    <h3 className="mb-[10px] sm:mb-20 text-subtitle-2 uppercase leading-none">
                      {item.title}
                    </h3>
                    <p className="text-description-color text-description-2 mb-[15px] sm:mb-30">
                      {item.description}
                    </p>
                    <CustomButton text={item.btnText} href={item.btnLink} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProjectSectors;
