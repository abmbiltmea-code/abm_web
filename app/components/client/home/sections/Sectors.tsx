"use client";

import { useState } from "react";
import Image from "next/image";
import { sectorsData } from "../data";
import CustomButton from "../../common/CustomButton";
import { useContainerInset } from "@/app/hooks/useContainerInset";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import AnimatedIcon from "../../common/AnimatedSvg";

export default function Sectors() {
  const { label, title, description, tabs } = sectorsData;
  const [active, setActive] = useState(tabs[0]);
  const inset = useContainerInset();

  return (
    <section className="flex w-full xl:flex xl:h-[92svh] 3xl:h-[929px] bg-[#171717] relative overflow-hidden">
      <div className="hidden xl:flex xl:w-full xl:h-full">
        <div className="absolute bottom-0 left-[39px] z-20 pointer-events-none">
          <Image
            src="/assets/images/logos/abm-watermark-small.svg"
            alt="logo"
            width={841}
            height={230}
            className="xl:h-[140px] 2xl:h-[170px] 3xl:h-[230px] w-auto"
          />
        </div>
        {/* Left */}
        <div
          className="flex flex-col w-[48.33%] shrink-0 py-120 3xl:py-140 relative"
          style={{ paddingLeft: inset }}
        >
          <div
            className="absolute right-0 top-0 h-full w-px"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 48.72%, rgba(255, 255, 255, 0) 100%)",
            }}
          />
          {/* Label */}
          <div className="mb-50">
            <SectionLabel title={label} textColor="text-white" />
          </div>
          {/* Title */}
          <SectionTitle title={title} className="text-white mb-20" />
          {/* Description */}
          <SectionDescription
            text={description}
            className="text-white/80 mb-60 max-w-[40ch]"
          />
          {/* Tabs — two column grid matching design */}
          <div className="grid grid-cols-[200px_200px] gap-y-30 gap-x-80 3xl:gap-x-[88px]">
            {tabs.map((tab, i) => {
              const isActive = tab.id === active.id;
              return (
                <motion.button
                  variants={moveUp(0.1 * i)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={tab.id}
                  onClick={() => setActive(tab)}
                  className={[
                    "text-subtitle uppercase transition-colors duration-300 w-[220px] flex items-center gap-20 cursor-pointer",
                    isActive ? "text-[#E63027]" : "text-white",
                  ].join(" ")}
                >
                  {tab.title}
                  {isActive && (
                    <div>
                      <Image
                        src="/assets/icons/double-arrow-primary.svg"
                        alt=""
                        width={14}
                        height={13}
                        className="pointer-events-none"
                      />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
        {/* Right — 51.47% */}
        <div className="relative w-[51.67%] shrink-0 overflow-hidden">
          {/* Background image per active tab */}
          {tabs.map((tab) => (
            <Image
              key={tab.id}
              src={tab.image}
              alt={tab.title}
              fill
              className={[
                "object-cover transition-opacity duration-500",
                tab.id === active.id ? "opacity-100" : "opacity-0",
              ].join(" ")}
              priority={tab.id === tabs[0].id}
            />
          ))}
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(214.08deg, rgba(0, 0, 0, 0) 25.13%, rgba(0, 0, 0, 0.8) 88.47%)",
            }}
          />
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 pl-60 3xl:pl-90 py-120 3xl:py-140 flex flex-col">
            <div className="w-[120px] h-[120px] 3xl:w-[150px] 3xl:h-[150px] mb-40">
              <AnimatedIcon
                src={active.icon}
                alt={active.title}
                width={150}
                height={150}
                className="pointer-events-none invert brightness-0"
              />
            </div>
            <h3 className="text-white text-subtitle-2 mb-[10px] uppercase">
              {active.title}
            </h3>
            <p className="text-description max-w-[40ch] mb-20 text-white/80">
              {active.description}
            </p>
            <div>
              <CustomButton text={active.buttonText} href={active.href} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet - below xl */}
      <div className="xl:hidden py-120 container">
        <div className="mb-30">
          <div className="mb-[20px]">
            <SectionLabel title={label} textColor="text-white" />
          </div>
          <SectionTitle title={title} className="text-white mb-20" />
          <SectionDescription
            text={description}
            className="text-white/80 max-w-[40ch]"
          />
        </div>

        <Swiper
          slidesPerView={1.184}
          spaceBetween={15}
          speed={600}
          breakpoints={{
            550: { slidesPerView: 1.4 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 2.5 },
          }}
          className="!overflow-visible"
        >
          {tabs.map((tab) => (
            <SwiperSlide key={tab.id}>
              <div className="relative rounded-[10px] overflow-hidden h-[286px] md:h-[380px] lg:h-[410px]">
                <Image
                  src={tab.image}
                  alt={tab.title}
                  fill
                  className="object-cover"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(214.08deg, rgba(0, 0, 0, 0) 25.13%, rgba(0, 0, 0, 0.8) 88.47%)",
                  }}
                />

                <div className="absolute inset-0 flex flex-col justify-end px-[15px] md:px-30 py-[20px] md:py-30">
                  <div className="w-[60px] h-[60px] mb-20">
                    <AnimatedIcon
                      src={tab.icon}
                      alt={tab.title}
                      width={200}
                      height={200}
                      className="pointer-events-none invert brightness-0"
                    />
                  </div>

                  <h3 className="text-white text-subtitle-2 mb-20 uppercase">
                    {tab.title}
                  </h3>

                  <p className="text-description max-w-[40ch] mb-[15px] sm:mb-20 text-white/80">
                    {tab.description}
                  </p>

                  <div>
                    <CustomButton text={tab.buttonText} href={tab.href} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
