"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Breadcrumb from "./Breadcrumb";

interface PageBannerProps {
  data: {
    title: string;
    image: string;
    imageAlt: string;
    bannerImage?: string;
  };
}

export default function InnerBanner({ data }: PageBannerProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    gsap.set(img, { scale: 1.5, transformOrigin: "center center" });

    const play = () => {
      gsap.to(img, {
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
        onComplete: () => {
          gsap
            .timeline({
              repeat: -1,
              defaults: { ease: "sine.inOut" },
            })
            .to(img, { scale: 1.15, duration: 12 })
            .to(img, { scale: 1, duration: 12 });
        },
      });
    };

    if (window.__introComplete) {
      const id = requestAnimationFrame(play);
      return () => cancelAnimationFrame(id);
    }

    window.addEventListener("introComplete", play, { once: true });
    return () => window.removeEventListener("introComplete", play);
  }, []);

  return (
    <section className="relative w-full h-[308px] sm:h-[450px] lg:h-[600px] 3xl:h-[690px] overflow-hidden">
      {/* Background image */}
      <Image
        ref={imageRef}
        src={data.bannerImage || data.image || "/assets/images/placeholder.png"}
        alt={data.imageAlt}
        fill
        priority
        className="object-cover object-center will-change-transform"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
linear-gradient(249.19deg, rgba(0, 0, 0, 0) 28.77%, rgba(0, 0, 0, 0.8) 95.01%)`,
        }}
      />

      {/* Title */}
      <div className="absolute inset-x-0 top-[157px] md:top-0 md:bottom-[67px] flex items-center justify-center">
        <div className="container mt-px">
          <h1 className="text-white hero-title">{data.title}</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute inset-x-0 bottom-[46px] md:bottom-[70px] 2xl:bottom-[112px]">
        <div className="container">
          <Breadcrumb />
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-[31px] lg:bottom-[40px] xl:bottom-[50px] 3xl:bottom-[67px] left-[18px] pointer-events-none">
        <Image
          src="/assets/images/logos/abm-watermark-banner-animated.svg"
          alt="ABM Watermark"
          width={853}
          height={225}
          className="h-[70px] md:h-[170px] lg:h-[180px] xl:h-[200px] 3xl:h-[225px] w-auto"
        />
      </div>

      {/* White bottom pill */}
      <div className="absolute bottom-0 inset-x-0 h-[31px] lg:h-[40px] xl:h-[50px] 3xl:h-[67px] rounded-t-[15px] md:rounded-t-[30px] bg-white" />
    </section>
  );
}
