"use client";

import { useState } from "react";
import Image from "next/image";
import { sectorsData } from "../data";
import CustomButton from "../../common/CustomButton";
import { useContainerInset } from "@/app/hooks/useContainerInset";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";

export default function Sectors() {
  const { label, title, description, tabs } = sectorsData;
  const [active, setActive] = useState(tabs[0]);
  const inset = useContainerInset();

  return (
    <section className="flex w-full h-[92svh] 3xl:h-[929px] bg-[#171717] relative">
      <div className="absolute bottom-0 left-[39px] z-20 pointer-events-none">
        <Image
          src="/assets/images/logos/abm-watermark-small.svg"
          alt="logo"
          width={841}
          height={230}
          className="h-[170px] 3xl:h-[230px] w-auto"
        />
      </div>
      {/* Left */}
      <div
        className="flex flex-col w-[48.53%] shrink-0 py-120 3xl:py-140 relative"
        style={{ paddingLeft: inset }}
      >
        <div
          className="absolute right-0 top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 48.72%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
        {/* Label */}
        <div className="mb-50">
          <SectionLabel title={label} textColor="text-white" />
        </div>

        {/* Title */}
        <SectionTitle title={title} className="text-white mb-20" />

        {/* Description */}
        <SectionDescription
          text={description}
          className="text-white/80 mb-60 max-w-[40ch]"
        />

        {/* Tabs — two column grid matching design */}
        <div className="grid grid-cols-[200px_200px] gap-y-30 gap-x-80 3xl:gap-x-[88px]">
          {tabs.map((tab) => {
            const isActive = tab.id === active.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab)}
                className={[
                  "text-subtitle uppercase transition-all duration-300 w-[220px] flex items-center gap-20 cursor-pointer",
                  isActive ? "text-[#E63027]" : "text-white",
                ].join(" ")}
              >
                {tab.title}
                {isActive && (
                  <div>
                    <Image
                      src="/assets/icons/double-arrow-primary.svg"
                      alt=""
                      width={14}
                      height={13}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Right — 51.47% */}
      <div className="relative w-[51.47%] shrink-0 overflow-hidden">
        {/* Background image per active tab */}
        {tabs.map((tab) => (
          <Image
            key={tab.id}
            src={tab.image}
            alt={tab.title}
            fill
            className={[
              "object-cover transition-opacity duration-500",
              tab.id === active.id ? "opacity-100" : "opacity-0",
            ].join(" ")}
            priority={tab.id === tabs[0].id}
          />
        ))}

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(214.08deg, rgba(0, 0, 0, 0) 25.13%, rgba(0, 0, 0, 0.8) 88.47%)",
          }}
        />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 pl-60 3xl:pl-90 py-120 3xl:py-140 flex flex-col">
          <div className="w-[120px] h-[120px] 3xl:w-[150px] 3xl:h-[150px] mb-40">
            <Image
              src={active.icon}
              alt={active.title}
              width={150}
              height={150}
              className="pointer-events-none"
            />
          </div>

          <h3 className="text-white text-subtitle-2 mb-[10px] uppercase">
            {active.title}
          </h3>

          <p className="text-description max-w-[40ch] mb-20 text-white/80">
            {active.description}
          </p>

          <div className="mt-2">
            <CustomButton text={active.buttonText} href={active.href} />
          </div>
        </div>
      </div>
    </section>
  );
}
