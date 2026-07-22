"use client";

import Image from "next/image";
import CustomButton from "../../common/CustomButton";
import SectionTitle from "../../animations/SectionTitle";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";

interface FeaturedNewsProps {
  image: string;
  title: string;
  category: string;
  date: string;
}

export default function FeaturedNews({
  image,
  title,
  category,
  date,
}: FeaturedNewsProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -10, scale: 1 },
        {
          yPercent: 10,
          scale: 1.12,
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
    <>
      <div ref={sectionRef} className="container pb-40">
        <div className="flex flex-col items-center justify-between gap-5 md:gap-6 lg:gap-60 3xl:gap-[68px] lg:flex-row lg:border-b border-border-color pb-5 sm:pb-7 md:pb-50 bg-cream-background lg:bg-transparent overflow-hidden rounded-[10px] lg:rounded-none">
          {/* Left: image */}
          <div className="relative aspect-5/3.5 w-full overflow-hidden rounded-t-[10px] lg:rounded-[10px] h-[222px] sm:h-[322px] lg:h-auto 3xl:h-[523px] 3xl:w-[850px] 3xl:shrink-0 overflow-hidden">
            <Image
              ref={imageRef}
              src={image}
              alt={title}
              fill
              className="object-cover object-top pointer-events-none"
            />
          </div>
          {/* Right: content */}
          <div className="flex w-full flex-col items-start px-[15px] sm:px-5 lg:px-0">
            <motion.div
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-[5px] md:rounded-[10px] border border-border-color px-2.5 sm:px-5 py-1 bg-cream-background text-description-2 text-description-color mb-5 md:mb-40 md:min-h-[38px] md:leading-0 flex justify-between items-center"
            >
              Featured News
            </motion.div>
            <SectionTitle title={title} className="mb-[10px] sm:mb-30" />
            <motion.p
              variants={moveUp(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-description-2 text-description-color mb-[15px] sm:mb-40 flex items-center"
            >
              {category}{" "}
              <span className="inline-block h-[21px] w-px bg-description-color mx-[14px]" />{" "}
              {date}
            </motion.p>
            <CustomButton
              text="Read News"
              href={`/news-and-media/${title.toLowerCase().replace(/ /g, "-")}`}
            />
          </div>
        </div>
      </div>
      <div className="lg:hidden container">
        <div className="w-full h-px bg-border-color mb-[30px]" />
      </div>
    </>
  );
}
