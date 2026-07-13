"use client";

import CustomButton from "@/app/components/client/common/CustomButton";
import { careerDetailData } from "../data";
import Image from "next/image";
import SectionTitle from "../../animations/SectionTitle";
import { useState } from "react";
import CareerApplicationForm from "./CareerApplicationForm";

export default function CareerHeader() {
  const { category, title, type, location, experience } = careerDetailData;
  const [open, setOpen] = useState(false);

  return (
    <section className="container pt-300 3xl:pt-[291px] pb-100">
      <span className="block text-description-color text-description-2 mb-5">
        {category}
      </span>

      <SectionTitle title={title} className="mb-[5px] text-70 leading-[1.2142857143]" />

      <div className="flex flex-col sm:flex-row items-end gap-100 3xl:gap-[111px] pb-50 border-b border-border-color">
        <div className="flex flex-wrap items-end gap-50 3xl:gap-[58px]">
          <span className="flex items-center gap-5 text-subtitle uppercase">
            <Image
              src="/assets/icons/career-detail/clock.svg"
              alt="clock"
              width={32}
              height={32}
            />
            {type}
          </span>

          <span className="hidden sm:block w-px h-[45px] bg-border-color" />

          <span className="flex items-center gap-5 text-subtitle uppercase">
            <Image
              src="/assets/icons/career-detail/location.svg"
              alt="location"
              width={32}
              height={32}
            />
            {location.toUpperCase()}
          </span>

          <span className="hidden sm:block w-px h-[45px] bg-border-color" />

          <span className="flex items-center gap-5 text-subtitle uppercase">
            <Image
              src="/assets/icons/career-detail/experience.svg"
              alt="experience"
              width={32}
              height={32}
            />
            {experience.toUpperCase()}
          </span>
        </div>

          <CustomButton
            text="Apply Now"
            onClick={() => setOpen(true)}
          />
      </div>

      <CareerApplicationForm
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
      />
    </section>
  );
}
