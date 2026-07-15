"use client";

import { useMemo, useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PROJECTS } from "../data";
import FilterBar, { type Filters } from "./FilterBar";
import ProjectsGrid from "./ProjectsGrid";
import Pagination from "../../common/Pagination";
import { useLenis } from "../../layout/LenisProvider";

const ITEMS_PER_PAGE = 10;

export default function ProjectsMain() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { scrollTo, resize } = useLenis();
  const hasAutoScrolled = useRef(false);

  const filters: Filters = {
    division: searchParams.get("division"),
    sector: searchParams.get("sector"),
    location: searchParams.get("location"),
    status: searchParams.get("status"),
  };

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  useEffect(() => {
    if (hasAutoScrolled.current) return;
    const cameWithFilter =
      filters.division || filters.sector || filters.location || filters.status;

    if (cameWithFilter) {
      hasAutoScrolled.current = true;

      requestAnimationFrame(() => {
        resize();
        requestAnimationFrame(() => {
          scrollTo("#projects-list", { offset: -40 });
          const t = setTimeout(() => {
            resize();
            scrollTo("#projects-list", { offset: -40 });
          }, 300);
          return () => clearTimeout(t);
        });
      });
    }
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

  const handleFiltersChange = (next: Filters) => {
    updateParams({
      division: next.division,
      sector: next.sector,
      location: next.location,
      status: next.status,
      page: null,
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      if (filters.division && project.division !== filters.division)
        return false;
      if (filters.sector && project.sector !== filters.sector) return false;
      if (filters.location && project.location !== filters.location)
        return false;
      if (filters.status && project.status !== filters.status) return false;
      return true;
    });
  }, [filters.division, filters.sector, filters.location, filters.status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
  );

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <section
      id="projects-list"
      className="container pb-[60px] md:pb-120 3xl:pb-150"
    >
      <FilterBar filters={filters} onChange={handleFiltersChange} />

      <div className="mt-[30px] md:mt-80">
        <ProjectsGrid projects={paginatedProjects} />
      </div>

      {totalPages > 1 && (
        <div className="mt-[60px] md:mt-50 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            scrollToId="projects-list"
          />
        </div>
      )}
    </section>
  );
}
