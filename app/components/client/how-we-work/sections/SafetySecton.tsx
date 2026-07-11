"use client";

import Image from "next/image";
import { safetySectionData } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import SectionLabel from "../../common/SectionLabel";
import { useContainerInset } from "@/app/hooks/useContainerInset";

export default function SafetySection() {
  const { label, title, description, image, items } = safetySectionData;
  const inset = useContainerInset();

  return (
    <section className="bg-cream-background">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-40 3xl:gap-80">
        <div className="py-140 lg:w-1/2" style={{ paddingLeft: inset }}>
          <div className="mb-40">
            <SectionLabel title={label} />
          </div>

          <SectionTitle title={title} className="mb-20" />

          <SectionDescription text={description} className="mb-50 text-description-2 text-description-color" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
            {items.map((item) => (
              <div
                key={item.title}
                data-aos="fade-up"
                className="flex items-center border border-border-color rounded-[10px] gap-4 3xl:gap-5 px-[16px] py-[15px]"
              >
                <div className="shrink-0 box-size rounded-[5px] bg-primary flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt="safety icon"
                    width={40}
                    height={40}
                    className="h-[28px] xl:h-[32px] 3xl:h-[40px] w-auto"
                  />
                </div>
                <span className="text-subtitle uppercase">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:w-[60%] 3xl:w-[969px] 3xl:shrink-0 lg:self-stretch">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 969px"
          />
        </div>
      </div>
    </section>
  );
}
