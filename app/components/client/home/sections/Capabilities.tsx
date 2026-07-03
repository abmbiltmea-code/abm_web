"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import SectionLabel from "@/app/components/client/common/SectionLabel";
import { coreCapabilitiesSectionData } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { motion } from "framer-motion";
import CustomButton from "../../common/CustomButton";

const CoreCapabilities = () => {
  const { capabilityCards } = coreCapabilitiesSectionData;
  const [activeId, setActiveId] = useState<string>(capabilityCards[1].id);
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
    const count = capabilityCards.length;

    const activeWidth = measure.offsetWidth;
    const remaining = total - activeWidth - gap * (count - 1);
    const inactiveWidth = Math.max(remaining / (count - 1), 0);

    setBasis({ active: activeWidth, inactive: inactiveWidth });
  }, [capabilityCards.length]);

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
    <section className="py-120 3xl:py-150">
      <div className="container">
        <div className="flex 3xl:justify-between mb-40">
          <div>
            <SectionLabel title={coreCapabilitiesSectionData.label} />
          </div>
          <div className="flex flex-col section-content-spacing gap-20">
            <SectionTitle
              title={coreCapabilitiesSectionData.title}
              className="text-secondary"
            />
            <SectionDescription
              text={coreCapabilitiesSectionData.description}
              className="text-description-color"
            />
          </div>
        </div>

        <div
          ref={measureRef}
          aria-hidden
          className="w-full md:w-[680px] 3xl:w-[979px] h-0 overflow-hidden invisible absolute pointer-events-none"
        />

        <div
          ref={containerRef}
          className="flex items-center gap-20 overflow-hidden h-[400px] md:h-[500px] 3xl:h-[633px]"
        >
          {capabilityCards.map((card) => {
            const isActive = card.id === activeId;
            const flexBasis = basis
              ? isActive
                ? basis.active
                : basis.inactive
              : undefined;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveId(card.id)}
                style={
                  flexBasis !== undefined
                    ? { flexBasis, flexGrow: 0, flexShrink: 0 }
                    : undefined
                }
                className={`relative rounded-[10px] overflow-hidden cursor-pointer transition-all duration-700 ease-in-out
                  ${flexBasis === undefined ? (isActive ? "w-full md:w-[680px] 3xl:w-[979px]" : "flex-1") : ""}
                  ${
                    isActive
                      ? "h-[400px] md:h-[500px] 3xl:h-[633px]"
                      : "h-[352px] md:h-[400px] 3xl:h-[529px]"
                  }
                `}
              >
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(216.16deg, rgba(0, 0, 0, 0) 25.45%, rgba(0, 0, 0, 0.8) 100%)",
                  }}
                />

                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 z-20">
                  <button
                    className="absolute top-40 left-40 right-40 w-[59px] h-[59px] flex items-center justify-center rounded-[10px] bg-black/41 backdrop-blur-[30px] text-white text-[60px]"
                    aria-label={isActive ? "Collapse" : "Expand"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
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
                      {card.title}
                    </h3>
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-in-out ${
                        isActive
                          ? "max-h-[200px] opacity-100"
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
                        {card.description}
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
                        <CustomButton text={card.buttonText} href={card.href} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
