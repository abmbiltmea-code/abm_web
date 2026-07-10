"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/effect-fade";

import { heroSlides } from "../data";
import Image from "next/image";
import AnimatedTitle from "../../animations/HeroTitleAnimation";
import { useLenis } from "../../layout/LenisProvider";

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
    const { scrollTo } = useLenis();

  const scrollDesktopRef = useRef<HTMLDivElement>(null);
  const scrollMobileRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);


  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleScrollToNext = useCallback(() => {
  const section = scrollDesktopRef.current?.closest("section");
  const nextSection = section?.nextElementSibling as HTMLElement | null;
  if (!nextSection) return;

  scrollTo(nextSection, { offset: 0 });
}, [scrollTo]);

  // Move-up entrance for scroll hints + right card, gated on the intro overlay
  useEffect(() => {
    const targets = [
      scrollDesktopRef.current,
      rightCardRef.current,
      scrollMobileRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (!targets.length) return;

    gsap.set(targets, { y: 24 });

    const play = () =>
      gsap.to(targets, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });

    if (window.__introComplete) {
      play();
      return;
    }

    window.addEventListener("introComplete", play, { once: true });
    return () => window.removeEventListener("introComplete", play);
  }, []);
  

  return (
    <section className="relative h-svh w-full overflow-hidden">
      <div className="absolute inset-0 z-10">
        <Image
          src="/assets/images/logos/abm-watermark.svg"
          alt="ABM Watermark"
          width={1288}
          height={379}
          className="absolute left-0 bottom-0 object-cover h-[114px] md:h-[120px] lg:h-[170px] xl:h-[220px] 2xl:h-[250px] heroSvgLaptop 3xl:h-[330px] w-auto pointer-events-none"
        />
      </div>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={900}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative h-full w-full overflow-hidden"
          >
            <div
              className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div
              style={{
                background:
                  "linear-gradient(249.19deg, rgba(0, 0, 0, 0) 28.77%, rgba(0, 0, 0, 0.8) 95.01%)",
              }}
              className="absolute inset-0"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-10 flex flex-col lg:flex-row justify-between pointer-events-none container">
        <div className="pt-300 h-full relative flex flex-col justify-between">
          <AnimatedTitle
            text={heroSlides[activeIndex].title}
            className="text-white hero-title max-w-[26ch] hidden sm:block"
          />
          <div
            ref={scrollDesktopRef}
            onClick={handleScrollToNext}
            className="hidden lg:flex gap-[15px] pointer-events-auto mb-190 cursor-pointer group w-fit"
          >
            <p className="text-white text-15 leading-[1.333] font-tasa font-bold uppercase pt-[3px] group-hover:opacity-70 transition-all duration-300">
              Scroll to explore
            </p>
            <Image
              src="/assets/icons/double-arrow-white.svg"
              alt="scroll-icon"
              width={12}
              height={12}
              className="animate-scroll-bounce"
            />
          </div>
        </div>

        <div className="hidden lg:flex items-end shrink-0 h-full ml-[12px]">
          <div
            className="w-px h-[77vh] 3xl:h-[80vh]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 48.72%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>

        <div className="sm:hidden">
          <AnimatedTitle
            text={heroSlides[activeIndex].title}
            className="text-white hero-title max-w-[26ch]"
          />
        </div>

        <div className="my-5">
          <div
            className="w-full lg:hidden h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 48.72%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>

        <div
          ref={rightCardRef}
          className="flex md:justify-end items-end pb-[70px] md:pb-170 shrink-0 pointer-events-auto"
        >
          <div className="bg-black/10 backdrop-blur-2xl p-[15px] lg:p-5 w-[358px] 2xl:w-[390px] 3xl:w-[438px] rounded-[10px]">
            <div className="flex flex-col gap-[10px]">
              <p className="text-white text-[14px] font-tasa font-bold leading-none sm:text-subtitle uppercase">
                {heroSlides[activeIndex].subtitle}
              </p>
              <p className="text-white text-15 leading-none sm:leading-[1.333] max-w-[398px] line-clamp-1">
                {heroSlides[activeIndex].description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-[18px] sm:mt-5">
              <span className="text-white font-medium shrink-0 text-15 leading-1 lg:leading-[1.666667]">
                {String(activeIndex + 1).padStart(2, "0")}/
                <span className="text-white/30">
                  {String(heroSlides.length).padStart(2, "0")}
                </span>
              </span>
              <div className="flex items-center gap-5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src="/assets/icons/arrow-left-white.svg"
                    alt="arrow-left"
                    width={20}
                    height={20}
                    className="w-[15px] h-[15px] lg:w-5 lg:h-5"
                  />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src="/assets/icons/arrow-left-white.svg"
                    alt="arrow-right"
                    width={20}
                    height={20}
                    className="rotate-180 w-[15px] h-[15px] lg:w-5 lg:h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={scrollMobileRef}
          onClick={handleScrollToNext}
          className="lg:hidden flex gap-[25px] pointer-events-auto pb-[51px] cursor-pointer"
        >
          <p className="text-white text-[14px] leading-[1.333] font-tasa font-bold uppercase pt-[3px]">
            Scroll to explore
          </p>
          <Image
            src="/assets/icons/double-arrow-white.svg"
            alt="scroll-icon"
            width={12}
            height={12}
            className="animate-scroll-bounce"
          />
        </div>
      </div>
    </section>
  );
}
