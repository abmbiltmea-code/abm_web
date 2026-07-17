"use client";

import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  image: string;
  title: string;
  category: string;
  date: string;
}

export default function NewsCard({
  image,
  title,
  category,
  date,
}: NewsCardProps) {
  return (
    <Link href={`/news-and-media/${title.toLowerCase().replace(/ /g, "-")}`}>
      <div className="group relative flex h-[349px] sm:h-[400px] w-full flex-col overflow-hidden rounded-[10px] bg-cream-background lg:h-[420px] xl:h-[460px] 2xl:h-[480px]  3xl:h-[617px]">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover pointer-events-none" />
        </div>

        <div className="absolute top-30 3xl:top-40 right-30 3xl:right-40 box-size bg-primary rounded-[5px] flex items-center justify-center scale-50 opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
          <Image
            src={"/assets/icons/arrow-right-top.svg"}
            alt={"arrow"}
            width={15}
            height={15}
            className="pointer-events-none h-[12px] xl:h-[16px] w-auto invert brightness-0"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 37.03%, #000000 100%)",
          }}
        />

        <div className="relative z-20 max-h-[220px] overflow-hidden bg-cream-background p-[15px] py-[30px] sm:p-30 opacity-100 transition-all duration-500 ease-in-out group-hover:max-h-0 group-hover:p-0 group-hover:opacity-0 3xl:max-h-[250px] 3xl:p-40">
          <h3 className="text-subtitle-3 text-secondary line-clamp-2">
            {title}
          </h3>
          <div className="my-[15px] sm:my-5 h-px w-full bg-border-color 3xl:my-30" />
          <div className="flex items-center justify-between text-description-2 text-description-color">
            <span>{category}</span>
            <span>{date}</span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-30 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 3xl:p-40">
          <h3 className="text-subtitle-3 text-white line-clamp-2">{title}</h3>
          <div className="my-[15px] sm:my-5 h-px w-full bg-white/40 3xl:my-30" />
          <div className="flex items-center justify-between text-description-2 text-white/80">
            <span>{category}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
