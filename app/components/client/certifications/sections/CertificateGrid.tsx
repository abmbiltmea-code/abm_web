"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";
import CertificateLightbox from "./CertificateLightbox";

interface CertificateItem {
  src: string;
  alt: string;
  name: string;
  label: string;
}

interface CertificateCardProps {
  item: CertificateItem;
  onClick: () => void;
}

function CertificateCard({ item, onClick }: CertificateCardProps) {
  return (
    <div className="flex flex-col group cursor-pointer" onClick={onClick}>
      <div className="relative w-full h-[300px] xl:h-[380px] 3xl:w-[415px] 3xl:h-[448px] border border-border-color rounded-[10px] overflow-hidden mb-40">
        <div
          className="z-10 absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
          style={{
            background:
              "linear-gradient(180deg, rgba(227, 30, 38, 0.03) 0%, rgba(227, 30, 38, 0.2) 100%)",
          }}
        />
        <div className="z-20 absolute top-30 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
          <div className="bg-primary/10 border border-white rounded-full box-size flex items-center justify-center">
            <Image
              src="/assets/icons/plus-primary.svg"
              alt="plus-icon"
              width={24}
              height={24}
              className="object-contain pointer-events-none"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[90%] 3xl:w-[380px] 3xl:h-[420px]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain object-bottom pointer-events-none"
          />
        </div>
      </div>

      <p className="text-subtitle-3 mb-[5px]">{item.name}</p>
      <p className="text-description-2 text-description-color uppercase">
        Authority: {item.label}
      </p>
    </div>
  );
}

interface CertificateGridProps {
  items: CertificateItem[];
}

export default function CertificateGrid({ items }: CertificateGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="container grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-80 pb-[60px] md:pb-120 3xl:pb-150">
        {items.map((item, i) => (
          <Reveal key={i} variants={moveUpV2} delayRange={i * 0.08}>
            <CertificateCard item={item} onClick={() => setActiveIndex(i)} />
          </Reveal>
        ))}
      </div>

      <CertificateLightbox
        items={items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}