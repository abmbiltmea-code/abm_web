"use client";

import SectionLabel from "@/app/components/client/common/SectionLabel";
import { workMethodologyData } from "../data";
import SectionTitle from "../../animations/SectionTitle";

export default function Methodology() {
  const { pageLabel, title, items } = workMethodologyData;
  return (
    <section className="w-full py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="container flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px]">
        {/* Left: label */}
        <div className="shrink-0">
          <SectionLabel title={pageLabel} pt="lg:pt-[10px]" />
        </div>

        {/* Right: content */}
        <div className="flex flex-col lg:section-content-spacing">
          <SectionTitle title={title} className="max-w-[20ch] mb-50" />
          <div className="flex flex-col max-w-[92%] 3xl:max-w-[1140px]">
            {items.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-start gap-40 pt-50 first:pt-0 ${
                  index !== items.length - 1
                    ? "border-b border-border-color pb-50"
                    : ""
                }`}
              >
                <span className="shrink-0 w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-full bg-primary/10 flex items-center justify-center">
                  <p className="text-primary opacity-50 text-subtitle-3">{String(index + 1).padStart(2, "0")}</p>
                </span>

                <div className="mt-[5px]">
                  <h3 className="text-subtitle-3 uppercase mb-5">
                    {item.title}
                  </h3>

                  <div
                    className="work-methodology-content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
