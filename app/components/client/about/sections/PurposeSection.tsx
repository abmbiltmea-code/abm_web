"use client";

import Image from "next/image";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import AnimatedDivider from "../../animations/AnimatedDivider";
import { moveUp } from "../../animations/motionVariants";
import SectionReveal from "../../animations/SectionReveal";
import { ThirdSection } from "@/app/types/about";

export default function PurposeSection({ data }: { data: ThirdSection }) {
  const { sectionLabel, title, items } = data;

  return (
    <section className="py-[60px] md:py-120 3xl:py-150 overflow-hidden container">
      <div className="lg:section-content-spacing-2">
        <div className="flex flex-col gap-5 md:gap-40">
          <SectionLabel title={sectionLabel} />
          <SectionTitle title={title} className="max-w-[16ch]" />
        </div>

        <AnimatedDivider className="mt-50 border-black/20" />

        {items.map((item, i) => (
          <SectionReveal key={i} variants={moveUp(i === 0 ? 0 : 0.1)}>
            <div
              className={`flex py-5 md:py-50 ${
                i === 0 ? "gap-50 xl:gap-70 3xl:gap-[69px]" : "gap-50"
              }`}
            >
              <div className="shrink-0">
                <Image
                  src={item.icon || "/assets/images/placeholder.png"}
                  alt={item.title}
                  width={i === 0 ? 100 : 119}
                  height={100}
                  className={
                    i === 0
                      ? "h-[60px] xl:h-[100px] w-auto 3xl:h-[100px] pointer-events-none"
                      : "h-[50px] xl:h-[100px] w-auto 3xl:w-[119px] pointer-events-none"
                  }
                />
              </div>
              <div className="flex flex-col gap-20">
                <h3 className="text-subtitle-2 uppercase">{item.title}</h3>
                <p className="text-description-2 text-description-color max-w-[826px]">
                  {item.description}
                </p>
              </div>
            </div>
            <AnimatedDivider className="border-black/20" />
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}