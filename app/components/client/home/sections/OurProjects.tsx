"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ourProjectsData } from "../data";
import SectionLabel from "@/app/components/client/common/SectionLabel";
import SectionTitle from "@/app/components/client/animations/SectionTitle";
import SectionDescription from "@/app/components/client/animations/SectionDescription";
import CustomButton from "@/app/components/client/common/CustomButton";
import Link from "next/link";

export default function OurProjects() {
  return (
    <section className="py-120 3xl:py-150">
      <div className="container">
        <div className="flex 3xl:justify-between mb-40">
          <div className="">
            <SectionLabel title={ourProjectsData.label} />
          </div>
          <div className="flex flex-col section-content-spacing">
            <SectionTitle
              title={ourProjectsData.title}
              className="text-secondary mb-20"
            />
            <SectionDescription
              text={ourProjectsData.description}
              className="text-description-color mb-40"
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
          spaceBetween={20}
          slidesPerView={1.3}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
          className="!overflow-visible"
        >
          {ourProjectsData.projects.map((project, index) => {
            const isOdd = index % 2 === 0;
            return (
              <SwiperSlide key={index}>
                <Link href={project.href}>
                  <div
                    className={`relative w-full rounded-[10px] overflow-hidden ${
                      isOdd
                        ? "h-[380px] 3xl:h-[506px]"
                        : "h-[270px] 3xl:h-[386px]"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="mt-20 text-subtitle text-secondary uppercase">
                    {project.title}
                  </h3>
                  <p className="text-description text-description-color">
                    {project.location}
                  </p>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
