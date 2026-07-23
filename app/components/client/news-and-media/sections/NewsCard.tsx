// "use client";

// import Image from "next/image";
// import Link from "next/link";

// interface NewsCardProps {
//   image: string;
//   title: string;
//   category: string;
//   date: string;
// }

// export default function NewsCard({
//   image,
//   title,
//   category,
//   date,
// }: NewsCardProps) {
//   return (
//     <Link href={`/news-and-media/${title.toLowerCase().replace(/ /g, "-")}`}>
//       <div className="group relative flex h-[349px] sm:h-[400px] w-full flex-col overflow-hidden rounded-[10px] bg-cream-background lg:h-[420px] xl:h-[460px] 2xl:h-[480px]  3xl:h-[617px]">
//         <div className="relative min-h-0 flex-1 overflow-hidden">
//           <Image src={image} alt={title} fill className="object-cover pointer-events-none" />
//         </div>

//         <div className="absolute top-30 3xl:top-40 right-30 3xl:right-40 box-size bg-primary rounded-[5px] flex items-center justify-center scale-50 opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
//           <Image
//             src={"/assets/icons/arrow-right-top.svg"}
//             alt={"arrow"}
//             width={15}
//             height={15}
//             className="pointer-events-none h-[12px] xl:h-[16px] w-auto invert brightness-0"
//           />
//         </div>

//         <div
//           className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(0,0,0,0) 37.03%, #000000 100%)",
//           }}
//         />

//         <div className="relative z-20 max-h-[220px] overflow-hidden bg-cream-background p-[15px] py-[30px] sm:p-30 opacity-100 transition-all duration-500 ease-in-out group-hover:max-h-0 group-hover:p-0 group-hover:opacity-0 3xl:max-h-[250px] 3xl:p-40">
//           <h3 className="text-subtitle-3 text-secondary line-clamp-2">
//             {title}
//           </h3>
//           <div className="my-[15px] sm:my-5 h-px w-full bg-border-color 3xl:my-30" />
//           <div className="flex items-center justify-between text-description-2 text-description-color">
//             <span>{category}</span>
//             <span>{date}</span>
//           </div>
//         </div>

//         <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-30 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 3xl:p-40">
//           <h3 className="text-subtitle-3 text-white line-clamp-2">{title}</h3>
//           <div className="my-[15px] sm:my-5 h-px w-full bg-white/40 3xl:my-30" />
//           <div className="flex items-center justify-between text-description-2 text-white/80">
//             <span>{category}</span>
//             <span>{date}</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NewsListItem } from "@/app/types/news";
import { formatDate } from "@/lib/utils/formatDate";

export default function NewsCard({ item }: { item: NewsListItem }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => setPanelHeight(el.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Link href={`/news-and-media/${item.slug}`}>
      <div className="group relative flex h-[349px] sm:h-[400px] w-full flex-col overflow-hidden rounded-[10px] bg-cream-background lg:h-[420px] xl:h-[460px] 2xl:h-[480px] 3xl:h-[617px]">
        {/* Image area — flex-1, grows automatically as the panel below shrinks */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <Image
            src={item.thumbImage || "/assets/images/placeholder.png"}
            alt={item.thumbImageAlt}
            fill
            className="object-cover pointer-events-none"
          />

          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 37.03%, #000000 100%)",
            }}
          />
        </div>

        {/* Arrow icon */}
        <div className="absolute top-30 3xl:top-40 right-30 3xl:right-40 box-size bg-primary rounded-[5px] flex items-center justify-center scale-50 opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100 z-20">
          <Image
            src={"/assets/icons/arrow-right-top.svg"}
            alt={"arrow"}
            width={15}
            height={15}
            className="pointer-events-none h-[12px] xl:h-[16px] w-auto invert brightness-0"
          />
        </div>

        {/* Background panel — height measured to exactly match the text block below, collapses on hover */}
        <div
          className="relative z-10 overflow-hidden bg-cream-background transition-[height] duration-500 ease-in-out group-hover:!h-0"
          style={{ height: panelHeight }}
        />

        {/* Single content block — fixed position, only colors transition */}
        <div
          ref={contentRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-[15px] py-[30px] sm:p-30 3xl:p-40"
        >
          <h3 className="text-subtitle-3 text-secondary transition-colors duration-500 ease-in-out group-hover:text-white line-clamp-2">
            {item.title}
          </h3>
          <div className="my-[15px] sm:my-5 h-px w-full bg-border-color transition-colors duration-500 ease-in-out group-hover:bg-white/40 3xl:my-30" />
          <div className="flex items-center justify-between text-description-2 text-description-color transition-colors duration-500 ease-in-out group-hover:text-white/80">
            <span>{item.category?.title}</span>
            <span>{formatDate(item.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
