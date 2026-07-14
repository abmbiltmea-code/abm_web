"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import SliderNavButton from "../../common/SliderNavButton";

import "swiper/css";
import "swiper/css/effect-fade";

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

  return (
    <div className="container">
      <div className="flex gap-100 bg-secondary rounded-t-[10px] w-fit px-40 pt-5 3xl:pt-[22px] pb-5 3xl:pb-[19px] pr-[10%] min-[1800px]:max-w-[725px]">
        <div className="3xl:min-w-[100px] shrink-0">
          <p className="text-white text-15 leading-[1.6666667] mb-1 uppercase">Status</p>
          <p className="text-white text-subtitle">{status}</p>
        </div>
        <div className="3xl:min-w-[100px] shrink-0">
          <p className="text-white text-15 leading-[1.6666667] mb-1 uppercase">Location</p>
          <p className="text-white text-subtitle">{location}</p>
        </div>
        <div className="3xl:min-w-[100px] shrink-0">
          <p className="text-white text-15 leading-[1.6666667] mb-1 uppercase">Sector</p>
          <p className="text-white text-subtitle">{sector}</p>
        </div>
      </div>
      <div className="relative w-full overflow-hidden rounded-b-[10px] rounded-tr-[10px]">
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
              <div className="relative h-[40.625vw] min-[1900px]:h-[780px] max-h-[780px] min-h-[430px] w-full rounded-b-[10px] rounded-tr-[10px] overflow-hidden">
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
              className="absolute left-40 top-1/2 z-10 -translate-y-1/2"
            />
            <SliderNavButton
              direction="next"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-40 top-1/2 z-10 -translate-y-1/2"
            />
          </>
        )}
      </div>
    </div>
  );
}
