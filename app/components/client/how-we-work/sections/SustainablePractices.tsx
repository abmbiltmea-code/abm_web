"use client";

import Image from "next/image";
import { sustainablePracticesData } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { useState } from "react";

export default function SustainablePractices() {
  const { sectionLabel, title, description, items } = sustainablePracticesData;
  const [active, setActive] = useState(0);

  const handleSetActive = (index: number) => {
    setActive(index);
  };

  return (
    <section className="container py-[60px] md:py-120 3xl:py-150">
      <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] 3xl:grid-cols-[725px_1fr] gap-y-50">
        {/* Row 1, Col 1 */}
        <div>
          <SectionLabel title={sectionLabel} />
        </div>

        {/* Row 1, Col 2 */}
        <div>
          <SectionTitle title={title} className="mb-5 max-w-[22ch]" />
          <SectionDescription text={description} className="text-description-color text-description-2"/>
        </div>

        {/* Row 2, Col 1 — image */}
        <div className="relative h-[400px] lg:h-full 3xl:min-h-[655px] rounded-[10px] overflow-hidden">
          <Image
            src={items[active].image}
            alt={items[active].title}
            fill
            className="object-cover"
          />
        </div>

        {/* Row 2, Col 2 — items grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr">
          {items.map((item, index) => (
            <div
              key={item.title}
              onMouseEnter={() => handleSetActive(index)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`rounded-[10px] px-30 3xl:px-40 pt-50 pb-30 transition-colors cursor-pointer -mr-px -mb-px ${
                active === index
                  ? "bg-primary/10 border border-primary/10 z-10"
                  : "border border-border-color z-0"
              }`}
            >
              <h3 className="text-subtitle-3 mb-5 max-w-[329px]">
                {item.title}
              </h3>
              <p className="text-description-color text-description-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
