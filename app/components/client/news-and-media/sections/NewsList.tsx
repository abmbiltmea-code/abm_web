"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterSelectDropDown from "../../common/FilterSelectDropDown";
import NewsCard from "../sections/NewsCard";
import Pagination from "../../common/Pagination";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";
import { GetNewsResult } from "@/app/types/news";

const ITEMS_PER_PAGE_DESKTOP = 9;
const ITEMS_PER_PAGE_MOBILE = 6;

export default function NewsList({ news }: { news: GetNewsResult }) {
  console.log(news);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const division = searchParams.get("category");
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

   const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DESKTOP);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");

    const update = () =>
      setItemsPerPage(mql.matches ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP);

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

 const filteredNews = useMemo(() => {
    if (!division) return news.items;
    return news.items.filter((item) => item.category?.title === division);
  }, [news, division]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNews.length / itemsPerPage),
  );

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(start, start + itemsPerPage);
  }, [filteredNews, currentPage, itemsPerPage]);

  const handleDivisionChange = (value: string | null) => {
    updateParams({ category: value, page: null });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
  };

  const categoryOptions = useMemo(
  () => news.categories.map((c) => c.title).filter((t): t is string => Boolean(t)),
  [news.categories],
);

  return (
    <section
      id="news-list"
      className="container pb-[60px] md:pb-120 3xl:pb-150"
    >
      <div className="flex justify-end w-full">
        <div className="w-full max-w-[360px] 3xl:max-w-[400px] mb-40 bg-cream-background px-[15px] sm:px-30 py-5 sm:py-30 3xl:py-[34px] rounded-[10px]">
          <FilterSelectDropDown
            label="Industries"
            options={categoryOptions}
            value={division}
            onChange={handleDivisionChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 xl:gap-x-5 gap-y-5 sm:gap-y-80">
        {paginatedNews.map((item, i) => (
          <Reveal key={i} variants={moveUpV2} delayRange={i * 0.05}>
            <NewsCard item={item} />
          </Reveal>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-[60px] lg:mt-50 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            scrollToId="news-list"
          />
        </div>
      )}
    </section>
  );
}
