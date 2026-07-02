"use client";

import Image from "next/image";
import CustomButton from "@/app/components/client/common/CustomButton";

interface InnerCtaProps {
  title: string;
  description: string;
  image: string;
}

export default function InnerCta({ title, description, image }: InnerCtaProps) {
  return (
    <section className="relative w-full h-[400px] lg:h-[550px] 3xl:h-[708px] overflow-hidden">
      {/* BG Image */}
      <Image src={image} alt={title} fill className="object-cover" priority />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full container flex items-center">
        <div className="flex flex-col w-full">
          <h2 className="text-white section-heading mb-20">
            {title}
          </h2>

          {/* Gradient line */}
          <div
            className="w-full h-px mb-50"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
            }}
          />

          <p className="text-white/80 text-description max-w-[50ch] mb-20">
            {description}
          </p>

          <CustomButton text={"CONTACT US"} href={"/contact-us"} />
        </div>
      </div>
    </section>
  );
}
