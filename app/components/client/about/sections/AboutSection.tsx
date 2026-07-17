import Image from "next/image";
import { aboutData } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionSubtitle from "../../animations/SectonSubtitle";
import AnimatedCounter from "../../animations/AnimatedCounter";
import SectionDescription from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";
import AnimatedDivider from "../../animations/AnimatedDivider";

export default function AboutSection() {
  const { sectionLabel, title, subtitle, description, stats } = aboutData;

  return (
    <section className="pt-[29px] md:pt-80 3xl:pt-[83px] pb-[30px] md:pb-120 3xl:pb-150">
      {/* Top row */}
      <div className="container flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-80">
        {/* Left */}
        <div className="flex flex-col gap-5 md:gap-40">
          <SectionLabel title={sectionLabel} />
          <SectionTitle title={title} className="lg:max-w-[16ch]" />
        </div>

        {/* Right */}
        <div className="lg:max-w-[54%] flex flex-col">
          <SectionSubtitle
            text={subtitle}
            className="uppercase text-secondary lg:max-w-[47ch]"
          />

          <AnimatedDivider className="border-black/20 mt-[15px] lg:mt-30 mb-5 lg:mb-70" />

          <SectionDescription
            html={description}
            className="text-description-2 text-description-color lg:max-w-[850px]"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="container mt-[30px] lg:mt-100">
        <div className="grid grid-cols-2 xl:grid-cols-[auto_auto_auto_auto] 3xl:grid-cols-[400px_400px_400px_400px] gap-x-[14px] md:gap-x-40 gap-y-[40px] xl:gap-y-0">
          {stats.map((stat, i) => (
            <Reveal key={i} variants={moveUpV2} delayRange={i * 0.15}>
              <div className="flex flex-col">
                <div className="flex items-center gap-2.5 md:gap-4">
                  <div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] xl:w-11 xl:h-11 bg-primary rounded-[5px] flex justify-center items-center">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={29.33}
                      height={29.33}
                      className="pointer-events-none w-[20px] h-[20px] md:w-auto md:h-[29.33px]"
                    />
                  </div>
                  <span className="section-heading text-secondary">
                    <AnimatedCounter
                      from={Number(stat.value) - 8}
                      to={stat.value}
                      duration={1.6}
                    />
                    <span className="section-heading text-primary">+</span>
                  </span>
                </div>

                <hr className="border-black/20 mb-[10px] md:mb-3 mt-[15px] md:mt-20" />

                <p className="text-[10px] font-tasa font-bold leading-none sm:text-subtitle uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
