"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { whyAbmData } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";

export default function WhyAbm() {
  return (
    <section className="w-full bg-cream-background py-120 3xl:py-140">
      <div className="container">
        <div className="text-center mx-auto mb-40">
          <SectionTitle
            title={whyAbmData.title}
            className="section-heading mb-20"
          />
          <SectionDescription
            text={whyAbmData.description}
            className="text-description text-description-color max-w-[87ch] mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-black/4 backdrop-blur-[30px] rounded-[10px]">
          {whyAbmData.items.map((item, index) => (
            <div
              key={index}
              className="relative py-[27px] flex flex-col items-center gap-y-20"
            >
              {/* Separator line */}
              {index !== 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px bg-black/20 h-[120px]">
                  <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 w-[2px] bg-primary"
                  />
                </div>
              )}

              <Image
                src={item.icon}
                alt={item.title}
                width={50}
                height={50}
                className="w-12.5 h-12.5 pointer-events-none"
              />
              <h3 className="text-subtitle text-secondary uppercas text-center max-w-[269px]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
