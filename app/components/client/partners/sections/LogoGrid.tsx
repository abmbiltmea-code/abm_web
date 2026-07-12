import Image from "next/image";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";

interface LogoItem {
  src: string;
  alt: string;
}

interface LogoCardProps {
  item: LogoItem;
}

function LogoCard({ item }: LogoCardProps) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-[150px] h-[70px] xl:w-[210px] xl:h-[100px] 3xl:w-[302px] 3xl:h-[132px] mb-30">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-contain pointer-events-none group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="relative w-full h-px overflow-hidden">
        {/* base gray gradient line */}
        <div
          className="absolute inset-0 w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(204,204,204,0) 0%, #CCCCCC 49.52%, rgba(204,204,204,0) 100%)",
          }}
        />
        {/* hover fill line - primary gradient, left to right */}
        <div
          className="absolute inset-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
          style={{
            background:
              "linear-gradient(90deg, rgba(227,30,38,0) 0%, #E31E26 49.52%, #FFFFFF 100%)",
          }}
        />
      </div>
    </div>
  );
}

interface LogoGridProps {
  items: LogoItem[];
  line?: boolean;
}

export default function LogoGrid({ items, line = false }: LogoGridProps) {
  return (
    <section className="container pb-[60px] md:pb-120 3xl:pb-150 relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-50 3xl:gap-[52px]">
        {items.map((item, i) => (
          <Reveal key={i} variants={moveUpV2}>
            <LogoCard item={item} />
          </Reveal>
        ))}
      </div>

      {line && (
        <div className="w-full h-px absolute bottom-0 left-0">
          <div className="w-full h-px bg-border-color" />
        </div>
      )}
    </section>
  );
}
