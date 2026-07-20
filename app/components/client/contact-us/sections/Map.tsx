import Image from "next/image";
import SectionReveal from "../../animations/SectionReveal";
import { moveUp } from "../../animations/motionVariants";

const Map = () => {
  return (
    <section className="container py-[60px] md:py-120 3xl:py-150">
      <SectionReveal variants={moveUp(0.1)}>
      <div className="rounded-[10px] overflow-hidden">
        <Image
          src="/assets/images/contact-us/map.jpg"
          alt="map"
          width={3500}
          height={1600}
          className="w-full min-h-[366px] h-auto object-cover max-[787px]"
        />
      </div>
            </SectionReveal>
    </section>
  );
};

export default Map;
