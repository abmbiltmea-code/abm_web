"use client"

import Image from "next/image";
import { contactSectionData } from "../data";
import SectionTitle from "@/app/components/client/animations/SectionTitle";
import SectionDescription from "@/app/components/client/animations/SectionDescription";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";

export default function ContactSection() {
  const {
    backgroundImage,
    backgroundImageMobile,
    title,
    description,
    contactInfo,
  } = contactSectionData;

  return (
    <section>
      <div className="relative lg:min-h-screen py-120 3xl:py-140 overflow-hidden">
        {/* Background Image */}
        <Image
          src={backgroundImage}
          alt="Contact background"
          fill
          className="object-cover object-center z-0 hidden md:block"
          priority
        />
        <Image
          src={backgroundImageMobile}
          alt="Contact background"
          fill
          className="object-cover object-center z-0 md:hidden"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65 z-1" />

        <div className="relative z-10 container flex flex-col lg:flex-row justify-between gap-60 2xl:gap-80">
          {/* Left */}
          <div className="flex flex-col max-w-[711px]">
            <div className="flex flex-col gap-[10px] sm:gap-20 mb-[20px] sm:mb-40 lg:mb-80">
              <SectionTitle title={title} className="text-white max-w-[20ch]" />
              <SectionDescription
                text={description}
                className="text-white/80 max-w-[50ch]"
              />
            </div>

            <div className="flex flex-col gap-[20px] sm:gap-30">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={moveUp(0.11 * index)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                <div className="flex items-center gap-20">
                  <div className="w-8 h-8 md:w-12 md:h-12 lg:w-15 lg:h-15 rounded-[5px] bg-white/10 backdrop-blur-2xl flex items-center justify-center shrink-0">
                    <Image
                      src={info.icon}
                      alt={info.title}
                      width={25}
                      height={25}
                      className="pointer-events-none w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-[5px]">
                    <p className="text-white text-[10px] font-bold font-tasa leading-none sm:text-subtitle">
                      {info.title}
                    </p>
                    {info.href ? (
                      <Link
                        href={info.href}
                        {...(!info.href.startsWith("tel:") &&
                        !info.href.startsWith("mailto:")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-white/80 text-[12px] leading-none sm:text-description hover:text-white transition-colors"
                        dangerouslySetInnerHTML={{ __html: info.value }}
                      />
                    ) : (
                      <p
                        className="text-white/80 text-[12px] leading-none sm:text-description"
                        dangerouslySetInnerHTML={{ __html: info.value }}
                      />
                    )}
                  </div>
                </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:contents">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="container lg:hidden py-[60px] md:py-120">
        <ContactForm />
      </div>
    </section>
  );
}
