"use client";

import { useState } from "react";
import Image from "next/image";
import { useLenis } from "../layout/LenisProvider";
import { useLockHeader } from "@/app/lib/headerLock";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  scrollToId?: string;
}

const SCROLL_DURATION = 1.2;

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  scrollToId,
}: PaginationProps) => {
  const { scrollTo } = useLenis();
  const [isScrolling, setIsScrolling] = useState(false);

  useLockHeader(isScrolling);

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    onPageChange(page);

    if (!scrollToId) return;

    setIsScrolling(true);

    setTimeout(() => {
      const el = document.getElementById(scrollToId);
      if (!el) {
        setIsScrolling(false);
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY - 40;
      scrollTo(top, { duration: SCROLL_DURATION });

      setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_DURATION * 1000);
    }, 20);
  };

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2) pages.push("...");

    for (let p = start; p <= end; p++) {
      pages.push(p);
    }

    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  const boxBase =
    "flex items-center justify-center box-size rounded-[5px] border transition-colors duration-300 cursor-pointer";

  return (
    <div className="flex items-center gap-[10px]">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${boxBase} border-[#F1F1F1] disabled:cursor-not-allowed disabled:hover:bg-transparent`}
      >
        <Image src={"/assets/icons/double-arrow-black.svg"} alt="Previous page" width={14} height={14} />
      </button>

      {pages.map((page, i) => {
        const isEllipsis = page === "...";
        const isActive = page === currentPage;

        if (isEllipsis) {
          return (
            <span
              key={`ellipsis-${i}`}
              className="flex items-center justify-center box-size text-description-2 cursor-default select-none"
            >
              ···
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handleClick(page as number)}
            className={`${boxBase} ${
              isActive
                ? "bg-primary border-primary text-white"
                : "border-border-color text-description-color hover:border-primary"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${boxBase} border-[#F1F1F1] disabled:cursor-not-allowed disabled:hover:bg-transparent`}
      >
        <Image src={"/assets/icons/double-arrow-black.svg"} alt="Next page" width={14} height={14} className="rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;

