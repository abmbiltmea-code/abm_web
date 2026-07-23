"use client";

import { motion } from "framer-motion";
import SectionReveal from "../animations/SectionReveal";
import SectionTitle from "../animations/SectionTitle";
import { moveUp } from "../animations/motionVariants";
import CustomButton from "./CustomButton";

type Props = {
  title: string;
  maxTitleWidth?: string;
  btnText: string;
  btnLink: string;
};

const InnerCtaSecondary = ({
  title,
  maxTitleWidth,
  btnText,
  btnLink,
}: Props) => {
  return (
    <div className="relative py-[50px] md:py-100 3xl:py-[105px] bg-secondary rounded-[10px] overflow-hidden">
      <div className="flex flex-col gap-5 md:gap-40 px-[15px] sm:px-30 md:px-100">
        <SectionTitle title={title} className={`${maxTitleWidth} text-white`} />
        <SectionReveal variants={moveUp(0.15)}>
          <CustomButton text={btnText || "Contact Us"} href={btnLink || "/contact-us"} />
        </SectionReveal>
      </div>

      <motion.div
        initial={{ clipPath: "inset(0 0 0 0%)" }}
        whileInView={{ clipPath: "inset(0 0 0 100%)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-white/10 pointer-events-none"
      />
    </div>
  );
};

export default InnerCtaSecondary;
