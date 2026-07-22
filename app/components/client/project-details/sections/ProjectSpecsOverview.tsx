"use client";

import { useEffect, useRef } from "react";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import SectionTitle from "../../animations/SectionTitle";
import SectionSubtitle from "../../animations/SectonSubtitle";
import { moveUpV2 } from "../../animations/motionVariants";
import SectionDescription from "../../animations/SectionDescription";

const specLabels = {
  client: "CLIENT",
  consultant: "CONSULTANT",
  duration: "DURATION",
  projectValue: "PROJECT VALUE",
};

const MARQUEE_SPEED = 0.3; // px per frame, tune to taste
const MARQUEE_COPIES = 4; // enough copies so the track never runs out during scroll

function ScopeMarquee({ scopeOfWork }: { scopeOfWork: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const setWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setWidthRef.current = track.scrollWidth / MARQUEE_COPIES;
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    const tick = () => {
      offsetRef.current -= MARQUEE_SPEED;
      if (setWidthRef.current && Math.abs(offsetRef.current) >= setWidthRef.current) {
        offsetRef.current += setWidthRef.current;
      }
      track.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  const looped = Array.from({ length: MARQUEE_COPIES }, () => scopeOfWork).flat();

  return (
    <div className="md:hidden relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
      <div ref={trackRef} className="flex w-max gap-x-[10px]">
        {looped.map((item, i) => (
          <div
            key={i}
            className="shrink-0 rounded-[10px] bg-primary/20 border border-primary/20 px-5 py-[13px] max-h-[80px]"
          >
            <p className="text-subtitle leading-none uppercase text-description-color whitespace-nowrap">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className="container flex flex-col gap-5 sm:gap-10 lg:flex-row lg:gap-80 pt-5 sm:pt-80 pb-[60px] md:pb-120 3xl:pb-150">
      <div className="w-full lg:max-w-[510px] bg-cream-background h-fit rounded-[10px] px-[15px] py-5 sm:p-5 md:p-50 min-[1900px]:max-h-[520px]">
        {specEntries.map(([key, value], index) => (
          <Reveal key={index} variants={moveUpV2} delayRange={index * 0.06}>
            <div
              className={`py-5 sm:py-30 ${
                index !== 0 ? "border-t border-border-color" : "pt-0 sm:pt-0"
              } ${index === specEntries.length - 1 ? "pb-0 sm:pb-0" : ""}`}
            >
              <p className="text-description-color text-15 leading-[1.4166666] sm:leading-[1.6666667] mb-[10px] md:mb-[5px] uppercase">
                {specLabels[key]}
              </p>
              <p className="text-subtitle max-[400px]:leading-none">{value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Right: overview + scope of work */}
      <div className="w-full flex-1">
        <SectionTitle title="Project Overview" className="mb-2.5 sm:mb-5" />

        <SectionDescription
          className="space-y-4 md:space-y-6 3xl:space-y-7 text-description-2 text-description-color"
          html={projectOverview}
        />

        <SectionSubtitle
          text="Scope of Work"
          className="mt-5 sm:mt-60 mb-[27px] md:mb-5 !text-subtitle-3"
        />

        {/* md and up — unchanged flex-wrap grid */}
        <div className="hidden md:flex flex-wrap gap-y-[10px] gap-x-[18px]">
          {scopeOfWork.map((item, i) => (
            <Reveal key={i} variants={moveUpV2} delayRange={i * 0.06}>
              <div className="rounded-[10px] bg-primary/20 border border-primary/20 px-30 py-[25px] max-h-[80px]">
                <p className="text-subtitle leading-none uppercase text-description-color">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* below md — infinite marquee */}
        <ScopeMarquee scopeOfWork={scopeOfWork} />

        <div className="hidden md:block mt-80 h-px w-full bg-border-color" />
      </div>
    </div>
  );
}