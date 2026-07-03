import SectionLabel from "@/app/components/client/common/SectionLabel";
import Image from "next/image";
import { aboutSectionData } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";

export default function AboutSection() {
  const { label, title, description, logo, stats } = aboutSectionData;

  return (
    <section className="w-full bg-cream-background py-120 3xl:py-140">
      <div className="container flex 3xl:justify-between">
        {/* Left: label */}
        <div className="pt-[13px] shrink-0">
          <SectionLabel title={label} />
        </div>

        {/* Right: content */}
        <div className="flex flex-col section-content-spacing">
          {/* Row 1: title + divider + logo */}
          <div className="flex items-center gap-70 mb-[20px] w-fit">
            <SectionTitle
              title={title}
              className="text-secondary max-w-[19ch] 3xl:max-w-[695px]"
            />

            <div className="w-px self-stretch bg-black/20 shrink-0 3xl:max-h-[147px]" />
            <div className="shrink-0">
              <Image
                src={logo}
                alt="50 Year Legacy"
                width={120}
                height={80}
                className="h-[120px] 3xl:h-[158px] w-auto object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Row 2: description */}
          <SectionDescription
            html={description}
            className="text-description-color max-w-[95%] 3xl:max-w-[101ch] mb-40"
          />

          {/* Row 3: stats */}
          <div className="flex justify-between gap-40 w-full">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-6 font-tasa">
                  <span className="text-100 font-semibold text-secondary leading-[1.2]">
                    {stat.value}
                  </span>
                  <span className="font-semibold text-100 text-primary leading-[1.2]">
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-subtitle text-secondary uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
