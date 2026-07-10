"use client";

import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import SectionTitle from "../../animations/SectionTitle";
import SectionSubtitle from "../../animations/SectonSubtitle";
import { moveUpV2 } from "../../animations/motionVariants";

const specLabels = {
  client: "CLIENT",
  consultant: "CONSULTANT",
  duration: "DURATION",
  projectValue: "PROJECT VALUE",
};

export default function ProjectSpecsOverview({
  specifications,
  projectOverview,
  scopeOfWork,
}: {
  specifications: {
    client: string;
    consultant: string;
    duration: string;
    projectValue: string;
  };
  projectOverview: string;
  scopeOfWork: string[];
}) {
  const specEntries = Object.entries(specifications) as [
    keyof typeof specifications,
    string,
  ][];

  return (
    <div className="container flex flex-col gap-10 lg:flex-row lg:gap-80 pt-80 pb-[60px] md:pb-120 3xl:pb-150">
      <div className="w-full lg:max-w-[510px] bg-cream-background h-fit rounded-[10px] p-50">
        {specEntries.map(([key, value], index) => (
          <Reveal key={index} variants={moveUpV2} delayRange={index * 0.06}>
            <div
              className={`py-30 ${
                index !== 0 ? "border-t border-border-color" : "pt-0"
              } ${index === specEntries.length - 1 ? "pb-0" : ""}`}
            >
              <p className="text-description-color text-15 leading-[1.6666667] mb-[5px] uppercase">
                {specLabels[key]}
              </p>
              <p className="text-subtitle">{value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Right: overview + scope of work */}
      <div className="w-full flex-1">
        <SectionTitle title="Project Overview" className="mb-5" />

        <div
          className="space-y-7 text-description-2 text-description-color"
          dangerouslySetInnerHTML={{ __html: projectOverview }}
        />

        <SectionSubtitle
          text="Scope of Work"
          className="mt-60 mb-5 !text-subtitle-3"
        />

        <div className="flex flex-wrap gap-[18px]">
          {scopeOfWork.map((item, i) => (
            <Reveal key={i} variants={moveUpV2} delayRange={i * 0.06}>
              <div className="rounded-[10px] bg-primary/20 border-primary/20 border text-description-2 font-bold uppercase text-description-color px-30 py-[25px] max-h-[80px]">
                {item}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-80 h-px w-full bg-border-color" />
      </div>
    </div>
  );
}
