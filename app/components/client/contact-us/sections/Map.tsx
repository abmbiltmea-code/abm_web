import Image from "next/image";
import SectionReveal from "../../animations/SectionReveal";
import { moveUp } from "../../animations/motionVariants";
import { ThirdSection } from "@/app/types/contact";

const Map = ({ data }: { data: ThirdSection }) => {
  const hasMap = data?.map?.trim();

  return (
    <section className="container py-[60px] md:py-120 3xl:py-150">
      <SectionReveal variants={moveUp(0.1)}>
        <div className="rounded-[10px] overflow-hidden min-h-[366px]">
          {hasMap ? (
            <iframe
              src={data.map}
              title="Location Map"
              className="w-full min-h-[366px] h-auto border-0 rounded-[10px] overflow-hidden md:h-[500px] 2xl:h-[550px] 3xl:h-[787px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <Image
              src="/assets/images/contact-us/map.jpg"
              alt="Map"
              width={3500}
              height={1600}
              className="w-full min-h-[366px] h-auto object-cover max-[787px]"
            />
          )}
        </div>
      </SectionReveal>
    </section>
  );
};

export default Map;
