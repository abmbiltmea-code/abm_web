"use client";

import Image from "next/image";
import { useState } from "react";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { strengthsData } from "../data";

export default function Strengths() {
  const { label, title, description, items } = strengthsData;
  const [active, setActive] = useState(1);

  return (
    <section className="container py-[60px] md:py-120 3xl:py-150">
      <div className="mb-40">
        <SectionLabel title={label} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-40 mb-50">
        <SectionTitle title={title} className="max-w-[20ch]" />
        <SectionDescription
          text={description}
          className="lg:max-w-[560px] text-description-color text-description-2"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-80">
        {/* Left - Accordion */}
        <div className="w-full lg:w-1/2 border-t border-border-color">
          {items.map((item, index) => {
            const isActive = active === index;
            const nextIsActive = active === index + 1;
            const showBorder = !isActive && !nextIsActive;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`relative overflow-hidden py-40 pr-40 transition-[padding] duration-500 ${
                  isActive ? "pl-40" : "pl-0"
                } ${showBorder ? "border-b border-border-color" : ""}`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 origin-left transition-transform duration-600 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(227, 30, 38, 0.2) 0%, rgba(227, 30, 38, 0.02) 100%)",
                  }}
                />

                <div className="relative">
                  <h3
                    className={`text-subtitle-2 uppercase ${isActive ? "mb-5" : ""}`}
                  >
                    {item.title}
                  </h3>

                  {isActive && (
                    <p className="text-description-color text-description-2 max-w-[652px]">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right - Image */}
        <div className="relative w-full lg:w-1/2 3xl:w-[870px] min-[1900px]:h-[660px] shrink-0 rounded-[10px] overflow-hidden">
          <Image
            src={items[active].image}
            alt={items[active].title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
