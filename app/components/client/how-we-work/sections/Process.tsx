import Image from "next/image";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";

interface ProcessProps {
  image: string;
  title: string;
  description: string;
}

export default function Process({ image, title, description }: ProcessProps) {
  return (
    <section className="bg-cream-background py-120 3xl:py-140">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-5 sm:gap-40 md:gap-80 lg:flex-row">
          {/* Left: image */}
          <div className="relative aspect-4/3 max-sm:max-h-[221px] w-full overflow-hidden rounded-[10px] 3xl:h-[600px] 3xl:w-[995px] 3xl:shrink-0">
            <Image src={image} alt={title} fill className="object-cover pointer-events-none select-none" />
          </div>
          {/* Right: content */}
          <div className="flex w-full lg:w-[90%] flex-col gap-[10px] sm:gap-5">
            <SectionTitle title={title} />
            <SectionDescription
              text={description}
              className="text-description-2 text-description-color"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
