import Image from "next/image";
import Link from "next/link";
import { newsDetailData, relatedTopicsData } from "../data";
import SectionTitle from "../../animations/SectionTitle";

export default function Main() {
  return (
    <section className="container pt-300 pb-[60px] md:pb-120 3xl:pb-150">
      <div className="flex flex-col xl:flex-row gap-40 xl:gap-0">
        {/* Sidebar */}
        <aside className="w-full xl:max-w-[30%] 3xl:max-w-[435px] self-start xl:sticky xl:top-30 xl:mt-30 xl:pr-5 relative">
          <div className="hidden xl:block w-px absolute top-0 right-0 bottom-0 h-full bg-gradient-to-b from-[#CCCCCC] to-transparent" />
          <div className="flex items-center justify-between pb-5">
            <span className="text-subtitle-3 uppercase">
              {relatedTopicsData.label}
            </span>
            <Link
              href={relatedTopicsData.viewAllHref}
              className="text-15 leading-[1.3333333333] text-primary uppercase underline font-tasa font-bold"
            >
              View All
            </Link>
          </div>

          <div className="flex flex-col gap-y-30 3xl:gap-y-[33px]">
            {relatedTopicsData.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex items-center gap-5 p-20 bg-cream-background rounded-[10px]"
              >
                <div className="relative w-[126px] h-[129px] shrink-0 rounded-[10px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <span className="text-description-2 text-description-color">
                    {item.category}
                  </span>
                  <h3 className="text-subtitle uppercase line-clamp-2">
                    {item.title}
                  </h3>
                  <Image
                    src="/assets/icons/double-arrow-full-primary.svg"
                    alt="arrow-right"
                    width={14}
                    height={14}
                    className="group-hover:translate-x-2 transition-all duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* Detail content */}
        <div className="w-full xl:ml-[6%] 3xl:ml-[8.4%]">
          <div className="flex items-center justify-between mb-60">
            <span className="text-description-2 text-description-color flex items-center gap-[10px]">
              <span className="w-[7px] h-[7px] bg-primary"></span>
              {newsDetailData.category}
            </span>
            <span className="text-description-2 text-description-color">
              Publish Date: {newsDetailData.publishDate}
            </span>
          </div>

          <SectionTitle
            title={newsDetailData.title} className="mb-80 3xl:mb-[84px] text-70 leading-[1.2142857143]"
          />

          <hr className="border-border-color" />

          <div
            className="news-detail-content mt-60"
            dangerouslySetInnerHTML={{ __html: newsDetailData.contentHtml }}
          />
        </div>
      </div>
    </section>
  );
}
