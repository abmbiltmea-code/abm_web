"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import SectionLabel from "@/app/components/client/common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { motion } from "framer-motion";
import CustomButton from "../../common/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ThirdSection, HomeDivisionCard } from "@/app/types/home";

const CoreCapabilities = ({data, divisions} : {data: ThirdSection, divisions: HomeDivisionCard[]}) => {
  const [activeId, setActiveId] = useState<string>(divisions[1]._id);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [basis, setBasis] = useState<{
    active: number;
    inactive: number;
  } | null>(null);

  const recalc = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const gap = parseFloat(getComputedStyle(container).columnGap || "0");
    const total = container.offsetWidth;
    const count = divisions.length;

    const activeWidth = measure.offsetWidth;
    const remaining = total - activeWidth - gap * (count - 1);
    const inactiveWidth = Math.max(remaining / (count - 1), 0);

    setBasis({ active: activeWidth, inactive: inactiveWidth });
  }, [divisions.length]);

  useLayoutEffect(() => {
    recalc();

    let raf: number;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recalc);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [recalc]);

  return (
    <section className="py-[60px] md:py-120 3xl:py-150 overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] mb-40">
          <div>
            <SectionLabel title={data.sectionLabel} />
          </div>
          <div className="flex flex-col lg:section-content-spacing gap-20">
            <SectionTitle
              title={data.title}
              className="text-secondary"
            />
            <SectionDescription
              text={data.description}
              className="text-description-color max-w-[70ch] 3xl:max-w-none"
            />
          </div>
        </div>

        <div
          ref={measureRef}
          aria-hidden
          className="w-full xl:w-[580px] 3xl:w-[979px] h-0 overflow-hidden invisible absolute pointer-events-none"
        />

        <div
          ref={containerRef}
          className="hidden xl:flex items-center gap-20 overflow-hidden xl:h-[450px] 3xl:h-[633px]"
        >
          {divisions.map((card) => {
            const isActive = card._id === activeId;
            const flexBasis = basis
              ? isActive
                ? basis.active
                : basis.inactive
              : undefined;

            return (
              <div
                key={card._id}
                onMouseEnter={() => setActiveId(card._id)}
                style={
                  flexBasis !== undefined
                    ? { flexBasis, flexGrow: 0, flexShrink: 0 }
                    : undefined
                }
                className={`relative rounded-[10px] overflow-hidden cursor-pointer transition-all duration-700 ease-in-out
                  ${flexBasis === undefined ? (isActive ? "w-full xl:w-[540px] 3xl:w-[979px]" : "flex-1") : ""}
                  ${
                    isActive
                      ? "xl:h-[450px] 3xl:h-[633px]"
                      : "xl:h-[342px] 3xl:h-[529px]"
                  }
                `}
              >
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(195.35deg, rgba(0, 0, 0, 0.3) 20.72%, rgba(0, 0, 0, 0.7) 66.06%, #000000 88.88%)",
                  }}
                />

                <Image
                  src={card.homePageSection.image || "/assets/images/placeholder.png"}
                  alt={card.homePageSection.imageAlt}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 z-20">
                  <button
                    className="absolute top-40 left-40 right-40 3xl:w-[59px] 3xl:h-[59px] w-[44px] h-[44px] flex items-center justify-center rounded-[10px] bg-black/41 backdrop-blur-[30px] text-white text-[60px]"
                    aria-label={isActive ? "Collapse" : "Expand"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      className="scale-[0.90] 3xl:scale-[1]"
                    >
                      <path
                        d="M1 11H21"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <motion.path
                        d="M11 21V1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ originX: "11px", originY: "11px" }}
                        animate={{
                          scaleY: isActive ? 0 : 1,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-40 left-40 right-40">
                    <h3 className="text-white text-subtitle-2 mb-[10px]">
                      {card.homePageSection.title}
                    </h3>
                    <div
                      className={`overflow-hidden transition-all duration-900 ease-in-out ${
                        isActive
                          ? "max-h-[300px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <motion.p
                        className="text-white/80 text-description max-w-[45ch] 3xl:max-w-[62ch] mb-20"
                        initial={false}
                        animate={
                          isActive
                            ? { y: 0, opacity: 1 }
                            : { y: 24, opacity: 0 }
                        }
                        transition={{
                          duration: 0.45,
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: isActive ? 0.55 : 0,
                        }}
                      >
                        {card.homePageSection.description}
                      </motion.p>
                      <motion.div
                        initial={false}
                        animate={
                          isActive
                            ? { y: 0, opacity: 1 }
                            : { y: 24, opacity: 0 }
                        }
                        transition={{
                          duration: 0.45,
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: isActive ? 0.55 : 0,
                        }}
                      >
                        <CustomButton text={"View More"} href={card.homePageSection.buttonLink} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile/Tablet - below xl */}
        <div className="xl:hidden">
          <Swiper
            slidesPerView={1.184}
            spaceBetween={15}
            speed={600}
            breakpoints={{
              550: { slidesPerView: 1.4 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.5 },
            }}
            className="!overflow-visible"
          >
            {divisions.map((card) => (
              <SwiperSlide key={card._id}>
                <div className="relative rounded-[10px] overflow-hidden h-[342px] md:h-[380px] lg:h-[410px]">
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background:
                        "linear-gradient(228.26deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                    }}
                  />

                  <Image
                    src={card.homePageSection.image || "/assets/images/placeholder.png"}
                    alt={card.homePageSection.imageAlt}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 z-20">
                    <div className="absolute bottom-0 right-0 px-[15px] md:px-30 py-5 md:py-30">
                      <h3 className="text-white text-subtitle-2 mb-20">
                        {card.homePageSection.title}
                      </h3>
                      <p className="text-white/80 text-description max-w-[45ch] mb-[15px] sm:mb-20">
                        {card.homePageSection.description}
                      </p>
                      <CustomButton text={"View More"} href={card.homePageSection.buttonLink} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
