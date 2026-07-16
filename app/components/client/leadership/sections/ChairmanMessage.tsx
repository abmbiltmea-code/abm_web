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
    <section className="py-[60px] md:py-120 3xl:py-150">
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

        <div className="flex-1 min-[1900px]:max-w-[850px] self-start mt-120 3xl:mt-[135px]">
          <SectionTitle title={title} className="max-w-[13ch]" />
          <SectionDescription
            text={description}
            className="mt-20 text-description-color text-description-2"
          />
          <div className="mt-40 pt-20 border-t border-border-color">
            <p className="text-heading font-bold">{name}</p>
            <p className="text-description-color">{designation}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanMessage;
