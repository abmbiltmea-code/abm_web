"use client";

import SectionLabel from "@/app/components/client/common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import { servicesGridData } from "../data";
import ServiceCard from "./ServiceCard";

export default function WhatWeDo() {
  return (
    <section className="py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="container flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] mb-50">
        <div className="shrink-0">
          <SectionLabel title={servicesGridData.label} pt="lg:pt-[10px]" />
        </div>

        <div className="flex flex-col lg:section-content-spacing">
          <SectionTitle title={servicesGridData.title} />
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesGridData.items.map((item, index) => (
            <div
              key={item.title}
            >
              <ServiceCard
                image={item.image}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
