"use client";

import Image from "next/image";

interface ServiceCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  image,
  title,
  imageAlt,
  description,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col h-full rounded-[10px] overflow-hidden group min-[1900px]:max-h-[598px]">
      <div className="relative aspect-4/3 max-h-[161px] sm:max-h-[266px] shrink-0 overflow-hidden">
        <Image
          src={image || "/assets/images/placeholder.png"}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex-1 bg-cream-background px-[15px] pt-5 pb-[30px] sm:p-30 3xl:p-40">
        <h3 className="text-subtitle-3 uppercase mb-[10px] md:mb-5">{title}</h3>
        <p className="text-description-color text-description-2">
          {description}
        </p>
      </div>
    </div>
  );
}