import Image from "next/image";
import { aboutData } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionSubtitle from "../../animations/SectonSubtitle";
import AnimatedCounter from "../../animations/AnimatedCounter";

export default function AboutSection() {
  const { sectionLabel, title, subtitle, description, stats } = aboutData;

  return (
    <section className="pt-80 3xl:pt-[83px] pb-120 3xl:pb-150">
      {/* Top row */}
      <div className="container flex justify-between gap-80">
        {/* Left */}
        <div className="flex flex-col gap-40">
          <SectionLabel title={sectionLabel} />
          <SectionTitle title={title} className="max-w-[16ch]" />
        </div>

        {/* Right */}
        <div className="max-w-[54%] flex flex-col">
          <SectionSubtitle text={subtitle} className="uppercase text-secondary max-w-[47ch]" />

          <hr className="border-black/20 mt-30 mb-70" />

          <p
            className="text-description-2 text-description-color max-w-[850px]"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="container mt-100">
        <div className="grid grid-cols-2 xl:grid-cols-[auto_auto_auto_auto] 3xl:grid-cols-[400px_400px_400px_400px] gap-x-40">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-primary rounded-[5px] flex justify-center items-center">
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={29.33}
                    height={29.33}
                    className="pointer-events-none"
                  />
                </div>
                <span className="section-heading text-secondary">
                  <AnimatedCounter from={Number(stat.value) - 8} to={stat.value} duration={1.6} />
                  <span className="section-heading text-primary">+</span>
                </span>
              </div>

              <hr className="border-black/20 mb-3 mt-20" />

              <p className="text-subtitle uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
