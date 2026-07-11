"use client";

import Image from "next/image";
import { useState } from "react";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { ourCommitmentData } from "../data";

export default function OurCommitment() {
  const { sectionLabel, title, description, items } = ourCommitmentData;
  const [active, setActive] = useState(1);

  return (
    <section className="bg-cream-background py-120 3xl:py-140">
      <div className="container">
        <div className="mb-40">
          <SectionLabel title={sectionLabel} />
        </div>
        <SectionTitle title={title} className="mb-5" />
        <SectionDescription
          text={description}
          className="max-w-[75ch] mb-30 text-description-2 text-description-color"
        />
        <div className="flex flex-col lg:flex-row gap-60 3xl:gap-100">
          {/* Left side */}
          <div className="w-full lg:w-[55%] 3xl:w-[1055px] shrink-0">
            <div className="relative w-full h-full 3xl:w-[1055px] 3xl:h-[680px] rounded-[10px] overflow-hidden">
              <Image
                src={items[active].image}
                alt={items[active].title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col justify-between lg:mt-[30px] lg:mb-90">
            <div className="flex flex-col lg:max-w-[392px]">
              {items.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`flex justify-between text-left border-b border-border-color transition-colors duration-500 text-20 leading-[2.5] ${
                    active === index
                      ? "text-secondary font-bold"
                      : "text-description-color hover:text-secondary"
                  }`}
                >
                  <span className="uppercase">{item.title}</span>

                  <Image
                    src="/assets/icons/arrow-right-primary.svg"
                    alt=""
                    width={24}
                    height={17}
                    className={`shrink-0 transition-all duration-400 ${
                      active === index
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-3 pointer-events-none"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="lg:mt-80 3xl:mt-40">
              <h3 className="text-subtitle-3 mb-5">{items[active].title}</h3>
              <p className="text-description-color text-description-2 lg:max-w-[514px]">
                {items[active].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
