"use client";

import SectionLabel from "@/app/components/client/common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import { ThirdSection } from "@/app/types/how-we-work";

export default function Methodology({ data }: { data: ThirdSection }) {
  const { sectionLabel, title, items } = data;
  return (
    <section className="w-full py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="container flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px]">
        {/* Left: label */}
        <div className="shrink-0">
          <SectionLabel title={sectionLabel} pt="lg:pt-[10px]" />
        </div>

        {/* Right: content */}
        <div className="hidden lg:flex flex-col lg:section-content-spacing">
          <SectionTitle title={title} className="max-w-[20ch] mb-50" />
          <div className="flex flex-col max-w-[92%] 3xl:max-w-[1140px]">
            {items.map((item, index) => (
              <motion.div
                variants={moveUp(0.04 * index)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                key={index}
                className={`flex items-start gap-40 pt-50 first:pt-0 ${
                  index !== items.length - 1
                    ? "border-b border-border-color pb-50"
                    : ""
                }`}
              >
                <span className="shrink-0 w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-full bg-primary/10 flex items-center justify-center">
                  <p className="text-primary opacity-50 text-subtitle-3">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </span>

                <div className="mt-[5px]">
                  <h3 className="text-subtitle-3 uppercase mb-5">
                    {item.title}
                  </h3>

                  <div
                    className="work-methodology-content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <SectionTitle title={title} className="mb-50" />
          <div className="w-full">
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
              {items.map((item, index) => (
                <SwiperSlide key={item.title}>
                  <div className="h-full rounded-[10px] border border-border-color py-5 px-[15px] sm:p-30 lg:p-40">
                    <span className="inline-flex w-12.5 h-12.5 sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full bg-primary/10 items-center justify-center mb-5 lg:mb-40">
                      <p className="text-primary text-subtitle-3 opacity-50">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </span>
                    <h3 className="text-subtitle-3 uppercase mb-[10px]">
                      {item.title}
                    </h3>

                    <div
                      className="work-methodology-content text-description-color text-description-2"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
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
