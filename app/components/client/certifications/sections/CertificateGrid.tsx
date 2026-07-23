"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";
import CertificateLightbox from "./CertificateLightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { AnimatePresence } from "framer-motion";
import { SecondSection, SecondSectionItem } from "@/app/types/certifications";

interface CertificateCardProps {
  item: SecondSectionItem;
  onClick: () => void;
  isActive?: boolean;
}

function CertificateCard({
  item,
  onClick,
  isActive = false,
}: CertificateCardProps) {
  return (
    <div className="flex flex-col group cursor-pointer" onClick={onClick}>
      <div className="relative w-full h-[280px] sm:h-[300px] xl:h-[380px] 3xl:w-[415px] 3xl:h-[448px] border border-border-color rounded-[10px] overflow-hidden lg:mb-4 xl:mb-40">
        <div
          className={`z-10 absolute inset-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100 ${
            isActive ? "scale-y-100" : "scale-y-0"
          }`}
          style={{
            background:
              "linear-gradient(180deg, rgba(227, 30, 38, 0.03) 0%, rgba(227, 30, 38, 0.2) 100%)",
          }}
        />
        <div
          className={`z-20 absolute top-30 left-1/2 -translate-x-1/2 transition-opacity duration-500 ease-out group-hover:opacity-100 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-primary/10 border border-white rounded-full w-12.5 h-12.5 lg:box-size flex items-center justify-center">
            <Image
              src="/assets/icons/plus-primary.svg"
              alt="plus-icon"
              width={24}
              height={24}
              className="object-contain pointer-events-none h-5 md:h-6 w-auto"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[90%] 3xl:w-[380px] 3xl:h-[420px]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-contain object-bottom pointer-events-none"
          />
        </div>
      </div>

      <div className="hidden lg:block">
        <p className="text-subtitle-3 mb-[5px]">{item.title}</p>
        <p className="text-description-2 text-description-color">
          Authority: {item.label.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

interface CertificateGridProps {
  data: SecondSection;
}

export default function CertificateGrid({ data }: CertificateGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;

    if (activeIndex !== null) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [activeIndex]);

  return (
    <section className="overflow-hidden">
      <div className="container hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-80 lg:pb-120 3xl:pb-150">
        {data.items.map((item, i) => (
          <Reveal key={i} variants={moveUpV2} delayRange={i * 0.08}>
            <CertificateCard item={item} onClick={() => setActiveIndex(i)} />
          </Reveal>
        ))}
      </div>

      <div className="container lg:hidden w-full pb-[60px] md:pb-120">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={1.4}
          loop={data.items.length > 3}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.6 },
          }}
          speed={700}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="!overflow-visible"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveSlide(swiper.realIndex);
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {data.items.map((item, i) => (
            <SwiperSlide key={i}>
              <CertificateCard
                item={item}
                onClick={() => setActiveIndex(i)}
                isActive={i === activeSlide}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        <CertificateLightbox
          items={data.items}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      </AnimatePresence>
    </section>
  );
}
