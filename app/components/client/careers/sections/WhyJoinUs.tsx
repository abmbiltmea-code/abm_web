"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { whyJoinUsData } from "../data";
import SectionTitle from "../../animations/SectionTitle";

export default function WhyJoinUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = whyJoinUsData[activeIndex];

  return (
    <section className="bg-cream-background py-120 3xl:py-140">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-60">
            {/* Left: Image */}
            <div className="relative w-full lg:w-[50%] 3xl:w-[866px] h-[320px] sm:h-[420px] lg:h-[500px] 3xl:h-[585px] rounded-[10px] overflow-hidden shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Right: Accordion */}
            <div className="w-full lg:w-[50%]">
                <SectionTitle title="Why Join Us" className="mb-50" />
              <div className="flex flex-col">
                {whyJoinUsData.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={item.title}
                      className="border-t border-border-color"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`w-full flex items-start gap-30 -mt-px text-left ${index === whyJoinUsData.length - 1 ? "pb-0" : "pb-50"}`}
                      >
                        <span
                          className={`flex items-center justify-center box-size shrink-0 text-description-2 rounded-[5px] transition-colors duration-400 ${
                            isActive
                              ? "bg-primary text-white"
                              : "border border-border-color text-description-color"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <span
                            className={`block text-subtitle-2 uppercase transition-colors duration-400 mt-[7px] ${
                              isActive ? "text-primary" : "text-secondary"
                            }`}
                          >
                            {item.title}
                          </span>
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="text-description-2 text-description-color mt-5">
                                  {item.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
