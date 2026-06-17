"use client";

import Image from "next/image";
import { useState } from "react";
import { coreValuesData } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";

export default function CoreValuesSection() {
  const { sectionLabel, title, items } = coreValuesData;
  const [activeIndex, setActiveIndex] = useState(1);

  const activeItem = items[activeIndex];

  return (
    <section className="bg-cream-background py-120 3xl:py-140">
      <div className="container flex justify-between gap-50">
        {/* Left */}
        <div className="flex flex-col gap-150 3xl:gap-[165px]">
          <div className="flex flex-col gap-40">
            <SectionLabel title={sectionLabel} />
            <SectionTitle title={title} />
          </div>

          {/* Tabs */}
          <ul className="flex flex-col">
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={i}>
                  <button
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-fit min-w-[315px] flex items-center justify-between ${
                      i < items.length - 1 ? "border-b border-[#CCCCCC]" : ""
                    }`}
                  >
                    <span
                      className={`uppercase font-tasa text-20 leading-[2.5] ${
                        isActive
                          ? "font-bold text-secondary"
                          : "text-description-color"
                      }`}
                    >
                      {item.tab}
                    </span>
                    <Image
                      src="/assets/icons/arrow-right-primary.svg"
                      alt=""
                      width={22}
                      height={22}
                      className={`shrink-0 transition-all duration-300 ease-in-out h-[16px] w-auto ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-3"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-40 max-w-[55%] 3xl:max-w-[935px]">
          <div className="relative w-full h-[450px] 3xl:h-[545px] overflow-hidden rounded-[10px]">
            <Image
              key={activeIndex}
              src={activeItem.image}
              alt={activeItem.tab}
              fill
              className="object-cover object-center pointer-events-none"
            />
          </div>

          <p className="text-description-2 text-description-color">
            {activeItem.description}
          </p>
        </div>
      </div>
    </section>
  );
}
