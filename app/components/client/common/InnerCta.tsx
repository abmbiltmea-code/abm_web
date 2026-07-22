"use client";

import Image from "next/image";
import CustomButton from "@/app/components/client/common/CustomButton";
import NewsletterForm from "./NewsletterFormProps";
import { motion } from "framer-motion";
import SectionTitle from "../animations/SectionTitle";
import SectionDescription from "../animations/SectionDescription";
import { moveUp } from "../animations/motionVariants";
import SectionReveal from "../animations/SectionReveal";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Button {
  text: string;
  link: string;
}

interface InnerCtaProps {
  data: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    button: Button;
  };
  email?: boolean;
}

export default function InnerCta({ data, email }: InnerCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -10, scale: 1 },
        {
          yPercent: 10,
          scale: 1.22,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[288px] sm:h-[350px] md:h-[400px] lg:h-[550px] 3xl:h-[708px] overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 h-full container flex items-center">
        <div className="flex flex-col w-full">
          <SectionTitle
            className="text-white section-heading mb-20"
            title={data.title}
          />

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            className="w-full h-px mb-5 sm:mb-50 origin-center"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
            }}
          />

          <SectionDescription
            className="text-white/80 text-description max-w-[50ch] mb-[15px] md:mb-20"
            html={data.description}
          />

          <SectionReveal
            variants={moveUp(0.2)}
            className="w-fit"
            style={{ ["--autofill-text-color" as string]: "#ffffff" }}
          >
            {email ? (
              <NewsletterForm />
            ) : (
              <CustomButton
                text={data.button.text || "CONTACT US"}
                href={data.button.link || "/contact-us"}
              />
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
