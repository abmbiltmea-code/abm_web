"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { clientsConsultantsData } from "../data";
import SectionLabel from "@/app/components/client/common/SectionLabel";
import SectionTitle from "@/app/components/client/animations/SectionTitle";
import SectionDescription from "@/app/components/client/animations/SectionDescription";

function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="shrink-0 w-[160px] h-[76px] md:w-[200px] md:h-[90px] lg:w-[200px] lg:h-[95px] xl:w-[300px] xl:h-[140px] 3xl:w-[328px] 3xl:h-[156px] bg-white rounded-[5px] flex items-center justify-center">
      <div className="relative w-[130px] h-[60px] md:w-[180px] md:h-[82px] lg:w-[200px] lg:h-[90px] xl:w-[250px] xl:h-[100px] 3xl:w-[288px] 3xl:h-[116px]">
        <Image
          src={logo}
          alt={name}
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
  items: { name: string; logo: string }[];
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
          <LogoCard key={`${item.name}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mergedItems = [
    ...clientsConsultantsData.rowOne,
    ...clientsConsultantsData.rowTwo,
  ];

  const cardWidth = isMobile ? 160 : 328;

  return (
    <section className="bg-cream-background py-120 3xl:py-140 overflow-hidden">
      <div className="container flex flex-col lg:flex-row 3xl:justify-between gap-y-[20px] md:gap-y-[30px] mb-40">
        <div>
          <SectionLabel title={clientsConsultantsData.label} />
        </div>

        <div className="flex flex-col lg:section-content-spacing">
          <SectionTitle
            title={clientsConsultantsData.title}
            className="text-secondary mb-20"
          />
          <SectionDescription
            text={clientsConsultantsData.description}
            className="text-description-color"
          />
        </div>
      </div>

      <div className="flex flex-col gap-20">
        {isMobile ? (
          <InfiniteRow
            items={mergedItems}
            direction={1}
            cardWidth={cardWidth}
          />
        ) : (
          <>
            <InfiniteRow
              items={clientsConsultantsData.rowOne}
              direction={1}
              cardWidth={cardWidth}
            />
            <InfiniteRow
              items={clientsConsultantsData.rowTwo}
              direction={-1}
              cardWidth={cardWidth}
            />
          </>
        )}
      </div>
    </section>
  );
}
