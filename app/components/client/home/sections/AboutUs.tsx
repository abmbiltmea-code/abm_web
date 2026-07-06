"use client";

import SectionLabel from "@/app/components/client/common/SectionLabel";
import { aboutSectionData } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import AnimatedIcon from "../../common/AnimatedSvg";
import AnimatedCounter from "../../animations/AnimatedCounter";

export default function AboutSection() {
  const { label, title, description, logo, stats } = aboutSectionData;

  return (
    <section className="w-full bg-cream-background py-120 3xl:py-140 overflow-hidden">
      <div className="container flex flex-col lg:flex-row justify-between gap-y-[20px] md:gap-y-[30px]">
        {/* Left: label */}
        <div className="shrink-0">
          <SectionLabel title={label} />
        </div>

        {/* Right: content */}
        <div className="flex flex-col lg:section-content-spacing">
          {/* Row 1: title + divider + logo */}
          <div className="flex items-center sm:gap-70 mb-[20px] w-fit">
            <SectionTitle
              title={title}
              className="text-secondary max-w-[19ch] 3xl:max-w-[695px]"
            />

            <div className="w-px self-stretch bg-black/20 shrink-0 3xl:max-h-[147px] ml-[22px] mr-[23px]" />
            <div className="shrink-0">
              <AnimatedIcon
                src={logo}
                alt="50 Year Legacy"
                width={120}
                height={80}
                className="h-[61.74px] md:h-[76px] lg:h-[90px] 2xl:h-[120px] 3xl:h-[158px] w-auto object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Row 2: description */}
          <SectionDescription
            html={description}
            className="text-description-color max-w-[95%] 3xl:max-w-[101ch] mb-40"
          />

          {/* Row 3: stats */}
          <div className="flex justify-between gap-40 w-full">
            {stats.map((stat, i) => (
              <motion.div 
              variants={moveUp(0.15 * i)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={stat.label} className="flex flex-col gap-[5px] md:gap-[10px]">
                <div className="flex items-center gap-1.5 lg:gap-3 3xl:gap-6 font-tasa">
                  <span className="text-100 font-semibold text-secondary leading-none md:leading-[1.2]">
                    <AnimatedCounter from={Number(stat.value) - 8} to={stat.value} duration={1.6} />
                  </span>
                  <span className="font-semibold text-100 text-primary leading-[1.2]">
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-[10px] font-tasa font-bold leading-none sm:text-subtitle text-secondary uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
