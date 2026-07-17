"use client";

import Image from "next/image";
import { overviewData } from "../data";
import SectionTitle from "../../animations/SectionTitle";

export default function Overview() {
  const { title, image, content } = overviewData;

  return (
    <section className="bg-cream-background py-120 3xl:py-140">
      <div className="container flex flex-col lg:flex-row justify-between items-center gap-y-5 md:gap-70">
        <div className="relative w-full lg:w-[45%] 3xl:w-[850px] h-[221px] sm:h-[360px] md:h-[450px] 3xl:h-[500px] rounded-[10px] overflow-hidden shrink-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover pointer-events-none select-none"
          />
        </div>

        <div className="w-full">
          <SectionTitle title={title} className="mb-[10px] sm:mb-5" />

          <div
            className="division-overview-content space-y-4 md:space-y-6 3xl:space-y-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
}
