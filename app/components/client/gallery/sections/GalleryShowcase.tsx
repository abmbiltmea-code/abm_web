"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryCategories } from "../data";
import SectionLabel from "../../common/SectionLabel";
import GalleryLightbox from "./GalleryLightbox";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";
import AnimatedCounter from "../../animations/AnimatedCounter";

const MAX_AVATARS = 3;

function AvatarStack({ images }: { images: string[] }) {
  const rest = images.slice(1);
  if (rest.length === 0) return null;

  const visible = rest.slice(0, MAX_AVATARS);
  const overflowCount =
    rest.length > MAX_AVATARS ? rest.length - MAX_AVATARS : 0;

  return (
    <div className="flex items-center gap-[5px] rounded-[10px] border border-white/20 bg-white/20 h-[36px] px-[11.5px] w-fit">
      <div className="flex space-x-[-10px]">
        {visible.map((src, i) => (
          <div
            key={src + i}
            className="relative h-6 w-6 overflow-hidden rounded-full border border-white"
          >
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
      {overflowCount > 0 && (
        <span className="text-20 leading-normal text-white">
          <AnimatedCounter from={0} to={overflowCount} duration={1} />+
        </span>
      )}
    </div>
  );
}

function GalleryCard({
  title,
  images,
  onOpen,
}: {
  title: string;
  images: string[];
  onOpen: () => void;
}) {
  const isClickable = images.length > 1;

  return (
    <div
      onClick={isClickable ? onOpen : undefined}
      className={`group relative aspect-15/14 w-full overflow-hidden rounded-[10px] 3xl:aspect-auto 3xl:h-[520px] ${
        isClickable ? "cursor-pointer" : ""
      }`}
    >
      <Image
        src={images[0]}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(220.14deg,rgba(0,0,0,0)_50%,#000000_100%)]" />

      {isClickable && (
        <div className="absolute top-40 right-30 box-size bg-primary rounded-[5px] flex items-center justify-center scale-50 opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
          <Image
            src={"/assets/icons/arrow-right-top.svg"}
            alt={"arrow"}
            width={15}
            height={15}
            className="pointer-events-none h-[12px] xl:h-[16px] w-auto invert brightness-0"
          />
        </div>
      )}

      <div className="absolute bottom-30 left-30 w-full">
        <p className="text-subtitle text-white mb-5 uppercase">{title}</p>
        <AvatarStack images={images} />
      </div>
    </div>
  );
}

export default function GalleryShowcase() {
  const [activeTab, setActiveTab] = useState(galleryCategories[0].label);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = galleryCategories.find((c) => c.label === activeTab);

  return (
    <section className="container pt-80 3xl:pt-[83px] pb-[60px] md:pb-120 3xl:pb-150">
      <div className="relative w-full flex mb-90 3xl:mb-[94px]">
        <SectionLabel title="Gallery Showcase" />

        <div className="absolute left-1/2 -translate-x-1/2 lg:left-[33.8%] lg:translate-x-[-10] flex items-center gap-80 border-b border-border-color">
          {galleryCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(cat.label)}
              className={`relative pb-[15px] text-subtitle transition-colors duration-300 ${
                activeTab === cat.label
                  ? "text-primary"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {cat.label}
              {activeTab === cat.label && (
                <span className="absolute -bottom-[1px] left-0 h-[3px] w-full bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-50 sm:grid-cols-2 lg:grid-cols-3">
        {activeCategory?.items.map((item, index) => (
          <Reveal variants={moveUpV2} delayRange={0.03 * index} key={activeCategory?.label + index}>

          <GalleryCard
            key={item.title}
            title={item.title}
            images={item.images}
            onOpen={() => {
              setLightboxImages(item.images);
              setActiveIndex(0);
            }}
            />
            </Reveal>
        ))}
      </div>

      {lightboxImages && (
        <GalleryLightbox
          images={lightboxImages}
          title={activeCategory?.items[activeIndex].title}
          activeIndex={activeIndex}
          onClose={() => setLightboxImages(null)}
          onChangeIndex={setActiveIndex}
        />
      )}
    </section>
  );
}
