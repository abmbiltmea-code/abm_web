"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import SliderNavButton from "../../common/SliderNavButton";

import "swiper/css";
import "swiper/css/effect-fade";
import SectionReveal from "../../animations/SectionReveal";
import { moveUp } from "../../animations/motionVariants";

interface ProjectImageSliderProps {
  images: string[];
  location: string;
  status: string;
  sector: string;
}

export default function InfoWithSlider({
  images,
  location,
  status,
  sector,
}: ProjectImageSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const check = () => setIsMdUp(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div>
      <div className="container">
        <SectionReveal variants={moveUp(0.2)}>
          <div className="flex flex-col md:flex-row md:gap-100 bg-secondary rounded-t-[10px] rounded-b-[10px] mb-5 md:mb-0 md:rounded-b-none w-full md:w-fit px-[15px] md:px-40 py-5 3xl:pt-[22px] 3xl:pb-[19px] pr-[10%] min-[1800px]:min-w-[725px]">
            <div className="3xl:min-w-[100px] shrink-0 border-b border-border-color pb-5 md:pb-0 md:border-none">
              <p className="text-white text-15 leading-[1.6666667] mb-2.5 md:mb-1 uppercase">
                Status
              </p>
              <p className="text-white text-subtitle">{status}</p>
            </div>
            <div className="3xl:min-w-[100px] shrink-0 border-b border-border-color py-5 md:py-0 md:border-none">
              <p className="text-white text-15 leading-[1.6666667] mb-2.5 md:mb-1 uppercase">
                Location
              </p>
              <p className="text-white text-subtitle">{location}</p>
            </div>
            <div className="3xl:min-w-[100px] shrink-0 pt-5 md:pt-0">
              <p className="text-white text-15 leading-[1.6666667] mb-2.5 md:mb-1 uppercase">
                Sector
              </p>
              <p className="text-white text-subtitle">{sector}</p>
            </div>
          </div>
        </SectionReveal>
      </div>

      <div
        className={`relative w-full overflow-hidden md:rounded-b-[10px] md:rounded-tr-[10px] ${
          isMdUp ? "container" : ""
        }`}
      >
        <Swiper
          modules={[EffectFade, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={600}
          slidesPerView={1}
          loop={images.length > 1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[296px] sm:h-[40.625vw] min-[1900px]:h-[780px] max-h-[780px] md:min-h-[430px] w-full md:rounded-b-[10px] md:rounded-tr-[10px] overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {images.length > 1 && (
          <>
            <SliderNavButton
              direction="prev"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-4 md:left-40 top-1/2 z-10 -translate-y-1/2"
            />
            <SliderNavButton
              direction="next"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-4 md:right-40 top-1/2 z-10 -translate-y-1/2"
            />
          </>
        )}
      </div>
    </div>
  );
}
