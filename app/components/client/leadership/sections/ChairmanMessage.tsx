"use client";

import Image from "next/image";
import SectionDescription from "../../animations/SectionDescription";
import SectionTitle from "../../animations/SectionTitle";
import { chairmanMessageData } from "../data";
import { useContainerInset } from "@/app/hooks/useContainerInset";

const ChairmanMessage = () => {
  const {
    title,
    description,
    name,
    designation,
    chairmanImage,
    leftQuoteImage,
    rightQuoteImage,
  } = chairmanMessageData;

  const inset = useContainerInset();

  return (
    <section className="pt-[60px] md:pt-[135px]">
      <div
        style={{ paddingRight: inset }}
        className="flex flex-col xl:flex-row xl:items-end gap-40 justify-between"
      >
        <div className="relative w-[825px] h-[725px] bg-cream-background shrink-0">
          <div
            style={{ left: inset }}
            className="absolute top-0 z-10 w-[270px] h-[537px]"
          >
            <Image
              src={leftQuoteImage}
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div
            style={{ left: inset }}
            className="absolute bottom-0 z-20 w-[702px] h-[858px]"
          >
            <Image
              src={chairmanImage}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-50 right-50 z-30 w-[133px] h-[267px]">
            <Image
              src={rightQuoteImage}
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex-1 min-[1900px]:max-w-[850px] self-start">
          <SectionTitle title={title} className="max-w-[13ch]" />
          <SectionDescription
            text={description}
            className="mt-20 text-description-color text-description-2"
          />
          <div className="mt-120 pt-30 border-t border-border-color max-w-[796px]">
            <p className="text-subtitle-3 mb-[10px]">{name}</p>
            <p className="text-description-color text-description-2">{designation}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanMessage;
