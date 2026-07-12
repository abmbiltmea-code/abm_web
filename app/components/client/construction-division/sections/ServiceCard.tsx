"use client";

import Image from "next/image";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  image,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col h-full 3xl:min-h-[598px] rounded-[10px] overflow-hidden">
      <div className="relative flex-[0_0_44.482%]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex-1 bg-cream-background p-40">
        <h3 className="text-subtitle-3 uppercase mb-5">{title}</h3>
        <p className="text-description-color text-description-2">
          {description}
        </p>
      </div>
    </div>
  );
}