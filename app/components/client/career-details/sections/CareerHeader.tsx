"use client";

import CustomButton from "@/app/components/client/common/CustomButton";
import { careerDetailData } from "../data";
import Image from "next/image";
import SectionTitle from "../../animations/SectionTitle";
import { useState } from "react";
import CareerApplicationForm from "./CareerApplicationForm";
import Breadcrumb from "../../common/Breadcrumb";
import SectionReveal from "../../animations/SectionReveal";
import { moveUp } from "../../animations/motionVariants";

export default function CareerHeader() {
  const { category, title, type, location, experience } = careerDetailData;
  const [open, setOpen] = useState(false);

  return (
    <section className="container pt-[157px] md:pt-300 3xl:pt-[291px] pb-[30px] sm:pb-100">
      <SectionReveal variants={moveUp(0.1)}>
        <span className="block text-description-color text-description-2 mb-[15px] sm:mb-5">
          <div className="mb-[30px] lg:hidden">
            <Breadcrumb variant="1" />
          </div>

          {category}
        </span>
      </SectionReveal>

      <SectionTitle
        title={title}
        className="mb-[15px] sm:mb-[5px] text-70 leading-[1.2142857143]"
      />

      <SectionReveal variants={moveUp(0.1)}>
        <div className="flex flex-col sm:flex-row sm:items-end gap-60 md:gap-100 3xl:gap-[111px] pb-50 border-b border-border-color">
          <div className="flex flex-wrap items-end gap-[26px] sm:gap-50 3xl:gap-[58px]">
            <span className="flex items-center gap-[5px] sm:gap-[10px] md:gap-5 text-subtitle uppercase">
              <Image
                src="/assets/icons/career-detail/clock.svg"
                alt="clock"
                width={32}
                height={32}
                className="pointer-events-none select-none md:w-[32px] md:h-[32px] sm:w-[24px] sm:h-[24px] w-[20px] h-[20px]"
              />
              {type}
            </span>

            <span className="hidden sm:block w-px h-[45px] bg-border-color" />

            <span className="flex items-center gap-[5px] sm:gap-[10px] md:gap-5 text-subtitle uppercase">
              <Image
                src="/assets/icons/career-detail/location.svg"
                alt="location"
                width={32}
                height={32}
                className="pointer-events-none select-none md:w-[32px] md:h-[32px] sm:w-[24px] sm:h-[24px] w-[20px] h-[20px]"
              />
              {location.toUpperCase()}
            </span>

            <span className="hidden sm:block w-px h-[45px] bg-border-color" />

            <span className="flex items-center gap-[5px] sm:gap-[10px] md:gap-5 text-subtitle uppercase">
              <Image
                src="/assets/icons/career-detail/experience.svg"
                alt="experience"
                width={32}
                height={32}
                className="pointer-events-none select-none md:w-[32px] md:h-[32px] sm:w-[24px] sm:h-[24px] w-[20px] h-[20px]"
              />
              {experience.toUpperCase()}
            </span>
          </div>

          <CustomButton text="Apply Now" onClick={() => setOpen(true)} />
        </div>
      </SectionReveal>

      <CareerApplicationForm
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
      />
    </section>
  );
}
