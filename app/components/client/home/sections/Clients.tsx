"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SectionLabel from "@/app/components/client/common/SectionLabel";
import SectionTitle from "@/app/components/client/animations/SectionTitle";
import SectionDescription from "@/app/components/client/animations/SectionDescription";
import { SeventhSection } from "@/app/types/home";

function LogoCard({ imageAlt, image }: { imageAlt: string; image: string }) {
  return (
    <div className="shrink-0 w-[160px] h-[76px] md:w-[200px] md:h-[90px] lg:w-[200px] lg:h-[95px] xl:w-[300px] xl:h-[140px] 3xl:w-[328px] 3xl:h-[156px] bg-white rounded-[5px] flex items-center justify-center">
      <div className="relative w-[130px] h-[60px] md:w-[180px] md:h-[82px] lg:w-[200px] lg:h-[90px] xl:w-[250px] xl:h-[100px] 3xl:w-[288px] 3xl:h-[116px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-contain pointer-events-none"
        />
      </div>
    </div>
  );
}

function InfiniteRow({
  items,
  direction = 1,
  cardWidth = 328,
  gap = 20,
}: {
  items: { imageAlt: string; image: string }[];
  direction?: 1 | -1;
  cardWidth?: number;
  gap?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  const duplicated = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const fullCardWidth = cardWidth + gap;
    const setWidth = items.length * fullCardWidth;

    xRef.current = direction === -1 ? -setWidth : 0;
    gsap.set(track, { x: xRef.current });

    const speed = 0.5; // speed

    const tick = () => {
      xRef.current -= speed * direction;

      if (direction === 1 && xRef.current <= -setWidth) {
        xRef.current += setWidth;
      } else if (direction === -1 && xRef.current >= 0) {
        xRef.current -= setWidth;
      }

      gsap.set(track, { x: xRef.current });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [items, direction, cardWidth, gap]);

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-20 w-max will-change-transform">
        {duplicated.map((item, index) => (
          <LogoCard key={`${index}-${item.imageAlt}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function Clients({ data }: { data: SeventhSection }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardWidth = isMobile ? 160 : 328;
  const rowOne = data.items.slice(0, Math.ceil(data.items.length / 2));
  const rowTwo = data.items.slice(Math.ceil(data.items.length / 2));

  return (
    <section className="bg-cream-background py-120 3xl:py-140 overflow-hidden">
      <div className="container flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] mb-40">
        <div>
          <SectionLabel title={data.sectionLabel} />
        </div>

        <div className="flex flex-col lg:section-content-spacing">
          <SectionTitle title={data.title} className="text-secondary mb-20" />
          <SectionDescription
            text={data.description}
            className="text-description-color"
          />
        </div>
      </div>

      <div className="flex flex-col gap-20">
        {isMobile ? (
          <InfiniteRow items={data.items} direction={1} cardWidth={cardWidth} />
        ) : (
          <>
            <InfiniteRow items={rowOne} direction={1} cardWidth={cardWidth} />
            <InfiniteRow items={rowTwo} direction={-1} cardWidth={cardWidth} />
          </>
        )}
      </div>
    </section>
  );
}
