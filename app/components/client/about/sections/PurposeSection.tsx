"use client";

import Image from "next/image";
import { purposeData } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import AnimatedDivider from "../../animations/AnimatedDivider";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import SectionReveal from "../../animations/SectionReveal";

export default function PurposeSection() {
  const { sectionLabel, title, items } = purposeData;
  const [vision, mission] = items;

  return (
    <section className="py-[60px] md:py-120 3xl:py-150 overflow-hidden container">
      <div className="lg:section-content-spacing-2">
        <div className="flex flex-col gap-5 md:gap-40">
          <SectionLabel title={sectionLabel} />
          <SectionTitle title={title} className="max-w-[16ch]" />
        </div>

        <AnimatedDivider className="mt-50 border-black/20" />

        {/* Vision */}
        <SectionReveal variants={moveUp(0)}>
          <div className="flex py-5 md:py-50 gap-50 xl:gap-70 3xl:gap-[69px]">
            <div className="shrink-0">
              <Image
                src={vision.icon}
                alt={vision.title}
                width={100}
                height={100}
                className="h-[60px] xl:h-[100px] w-auto 3xl:h-[100px] pointer-events-none"
              />
            </div>
            <div className="flex flex-col gap-20">
              <h3 className="text-subtitle-2 uppercase">{vision.title}</h3>
              <p className="text-description-2 text-description-color max-w-[826px]">
                {vision.description}
              </p>
            </div>
          </div>
          <AnimatedDivider className="border-black/20" />
        </SectionReveal>

        {/* Mission */}
        <SectionReveal variants={moveUp(0.1)}>
          <div className="flex py-5 md:py-50 gap-50">
            <div className="shrink-0">
              <Image
                src={mission.icon}
                alt={mission.title}
                width={119}
                height={100}
                className="h-[50px] xl:h-[100px] w-auto 3xl:w-[119px] pointer-events-none"
              />
            </div>
            <div className="flex flex-col gap-20">
              <h3 className="text-subtitle-2 uppercase">{mission.title}</h3>
              <p className="text-description-2 text-description-color max-w-[826px]">
                {mission.description}
              </p>
            </div>
          </div>
          <AnimatedDivider className="border-black/20" />
        </SectionReveal>
      </div>
    </section>
  );
}
