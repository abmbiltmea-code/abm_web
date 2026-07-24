import Image from "next/image";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";
import { IconItem, SecondSection } from "@/app/types/clients";

interface LogoCardProps {
  item: IconItem;
}

function LogoCard({ item }: LogoCardProps) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-[115px] h-[55px] md:w-[150px] md:h-[70px] xl:w-[210px] xl:h-[100px] 3xl:w-[302px] 3xl:h-[132px] md:mb-40">
        <Image
          src={item.icon || "/assets/images/placeholder.png"}
          alt={item.iconAlt}
          fill
          className="object-contain pointer-events-none group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="hidden md:block relative w-full h-px overflow-hidden">
        <div
          className="absolute inset-0 w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(204,204,204,0) 0%, #CCCCCC 49.52%, rgba(204,204,204,0) 100%)",
          }}
        />
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
  data: SecondSection["items"];
  line?: boolean;
}

const COLS_MOBILE = 3;
const ROW_HEIGHT = 60;
const GAP_Y = 50;
const ROW_STRIDE = ROW_HEIGHT + GAP_Y;

export default function LogoGrid({ data, line = false }: LogoGridProps) {
  const totalRows = Math.ceil(data.length / COLS_MOBILE);

  const horizontalLines = Array.from({ length: totalRows - 1 }, (_, i) => {
    const r = i + 1;
    return r * ROW_STRIDE - GAP_Y / 2;
  });

  const verticalLines = ["33.3333%", "66.6666%"];

  return (
    <section className="container pb-[90px] md:pb-120 3xl:pb-150 relative">
      {/* below md — continuous grid divider lines */}
      <div className="md:hidden absolute inset-0 pointer-events-none">
        {horizontalLines.map((top, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${top}px`,
              background:
                "linear-gradient(90deg, rgba(204,204,204,0) 0%, #CCCCCC 49.52%, rgba(204,204,204,0) 100%)",
            }}
          />
        ))}
        {verticalLines.map((left, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-[20px] w-px -translate-x-1/2"
            style={{
              left,
              background:
                "linear-gradient(180deg, rgba(204,204,204,0) 0%, #CCCCCC 49.52%, rgba(204,204,204,0) 100%)",
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 md:gap-50 3xl:gap-[52px] gap-y-[50px] md:gap-y-[30px]">
        {data.map((item, i) => (
          <Reveal key={i} variants={moveUpV2}>
            <LogoCard item={item} />
          </Reveal>
        ))}
      </div>

      {line && (
        <>
          <div className="hidden md:block w-full h-px absolute bottom-0 left-0">
            <div className="w-full h-px bg-border-color" />
          </div>

          <div className="container md:hidden w-full h-px absolute bottom-0 left-0">
            <div className="w-full h-px bg-border-color" />
          </div>
        </>
      )}
    </section>
  );
}
