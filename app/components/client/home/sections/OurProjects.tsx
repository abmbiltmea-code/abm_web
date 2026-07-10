"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ourProjectsData } from "../data";
import SectionLabel from "@/app/components/client/common/SectionLabel";
import SectionTitle from "@/app/components/client/animations/SectionTitle";
import SectionDescription from "@/app/components/client/animations/SectionDescription";
import CustomButton from "@/app/components/client/common/CustomButton";
import { motion } from "framer-motion";
import Link from "next/link";
import { moveUp } from "../../animations/motionVariants";

export default function OurProjects() {
  return (
    <section className="py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] mb-40">
          <div>
            <SectionLabel title={ourProjectsData.label} />
          </div>
          <div className="flex flex-col lg:section-content-spacing">
            <SectionTitle
              title={ourProjectsData.title}
              className="text-secondary mb-20"
            />
            <SectionDescription
              text={ourProjectsData.description}
              className="text-description-color mb-5 xl:mb-40 max-w-[70ch] 3xl:max-w-none"
            />
            <div>
              <CustomButton
                text={ourProjectsData.buttonText}
                href={ourProjectsData.href}
              />
            </div>
          </div>
        </div>

        <Swiper
          spaceBetween={15}
          slidesPerView={1.184}
          breakpoints={{
            550: { slidesPerView: 1.4 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 2.5 },
            1280: {
              slidesPerView: 3.2,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="!overflow-visible"
        >
          {ourProjectsData.projects.map((project, index) => {
            // const isOdd = index % 2 === 0;
            return (
              <SwiperSlide className="group" key={index}>
                <motion.div
                variants={moveUp(0.11 * index)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                >
                  <Link href={project.href}>
                    <div
                      className={`relative w-full rounded-[10px] overflow-hidden h-[315px] sm:h-[350px] md:h-[380px] xl:h-[380px] 3xl:h-[506px]`}
                      //    ${
                      //   isOdd
                      //     ? "h-[315px] sm:h-[350px] md:h-[380px] xl:h-[380px] 3xl:h-[506px]"
                      //     : "h-[315px] sm:h-[350px] md:h-[380px] xl:h-[270px] 3xl:h-[386px]"
                      // }`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <h3 className="mt-[15px] xl:mt-20 text-subtitle text-secondary uppercase mb-[5px] xl:mb-0 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-description text-description-color">
                      {project.location}
                    </p>
                  </Link>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
