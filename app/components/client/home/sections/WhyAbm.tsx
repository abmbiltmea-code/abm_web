"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { moveUp } from "../../animations/motionVariants";
import { FifthSection } from "@/app/types/home";

export default function WhyAbm({ data }: { data: FifthSection }) {
  return (
    <section className="w-full bg-cream-background py-120 3xl:py-140">
      <div className="container">
        <div className="sm:text-center mx-auto mb-40">
          <SectionTitle title={data.title} className="section-heading mb-20" />
          <SectionDescription
            text={data.description}
            className="text-description text-description-color max-w-[87ch] mx-auto"
          />
        </div>

        <div className="grid max-[391px]:grid-cols-[158px_180px] max-[391px]:gap-x-5 grid-cols-2 xl:grid-cols-4 lg:bg-black/4 lg:backdrop-blur-[30px] rounded-[10px] relative gap-y-40">
          <div className="xl:hidden absolute left-0 top-1/2 -translate-y-1/2 h-px bg-black/20 w-full">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-full bg-primary"
            />
          </div>
          {data.items.map((item, index) => (
            <motion.div
              variants={moveUp(0.11 * index)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
              className="relative sm:py-[27px] flex flex-col sm:items-center gap-y-20"
            >
              {/* Separator line */}
              {index !== 0 && (
                <div className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 w-px bg-black/20 h-[120px]">
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
                alt={item.iconAlt}
                width={50}
                height={50}
                className="w-[30px] h-[30px] sm:w-10 sm:h-10 md:w-12.5 md:h-12.5 pointer-events-none"
              />
              <h3 className="text-subtitle text-secondary uppercase sm:text-center max-w-[180px] sm:max-w-[200px] md:max-w-[269px]">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
