"use client";

import { useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterSelectDropDown from "../../common/FilterSelectDropDown";
import NewsCard from "../sections/NewsCard";
import { CATEGORIES } from "../data";
import Pagination from "../../common/Pagination";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";

const ITEMS_PER_PAGE = 9;

export default function NewsList({ news }: { news: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const division = searchParams.get("category");
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

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
    if (!division) return news;
    return news.filter((item) => item.category === division);
  }, [news, division]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNews.length / ITEMS_PER_PAGE),
  );

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  const handleDivisionChange = (value: string | null) => {
    updateParams({ category: value, page: null });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
  };

  return (
    <section
      id="news-list"
      className="container pb-[60px] md:pb-120 3xl:pb-150"
    >
      <div className="flex justify-end w-full">
        <div className="max-w-[400px] mb-40 bg-cream-background px-30 py-30 3xl:py-[34px] rounded-[10px]">
          <FilterSelectDropDown
            label="Industries"
            options={CATEGORIES}
            value={division}
            onChange={handleDivisionChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-80 md:grid-cols-3">
        {paginatedNews.map((item, i) => (
          <Reveal key={i} variants={moveUpV2} delayRange={i * 0.05}>
            <NewsCard {...item} />
          </Reveal>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-50 flex justify-center">
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
