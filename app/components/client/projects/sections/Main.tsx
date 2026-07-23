"use client";

import { useMemo, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterBar, { type Filters } from "./FilterBar";
import ProjectsGrid from "./ProjectsGrid";
import Pagination from "../../common/Pagination";
import { useLenis } from "../../layout/LenisProvider";
import { GetProjectsResult } from "@/app/types/project";

const ITEMS_PER_PAGE_DESKTOP = 10;
const ITEMS_PER_PAGE_MOBILE = 6;

export default function ProjectsMain({ data }: { data: GetProjectsResult }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { scrollTo, resize } = useLenis();
  const hasAutoScrolled = useRef(false);

  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DESKTOP);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");

    const update = () =>
      setItemsPerPage(
        mql.matches ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP,
      );

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

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

  const divisionOptions = useMemo(
    () => data.divisions.map((d) => d.name).filter((n): n is string => Boolean(n)),
    [data.divisions],
  );
  const sectorOptions = useMemo(
    () => data.sectors.map((s) => s.title).filter((t): t is string => Boolean(t)),
    [data.sectors],
  );
  const locationOptions = useMemo(
    () => data.locations.map((l) => l.title).filter((t): t is string => Boolean(t)),
    [data.locations],
  );
  const statusOptions = useMemo(
    () => data.statuses.map((s) => s.title).filter((t): t is string => Boolean(t)),
    [data.statuses],
  );

  const filteredProjects = useMemo(() => {
    return data.projects.filter((project) => {
      if (filters.division && project.division?.name !== filters.division)
        return false;
      if (filters.sector && project.sector?.title !== filters.sector)
        return false;
      if (filters.location && project.location?.title !== filters.location)
        return false;
      if (filters.status && project.status?.title !== filters.status)
        return false;
      return true;
    });
  }, [data.projects, filters.division, filters.sector, filters.location, filters.status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / itemsPerPage),
  );

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  return (
    <section
      id="projects-list"
      className="container pb-[60px] md:pb-120 3xl:pb-150"
    >
      <FilterBar
        filters={filters}
        onChange={handleFiltersChange}
        divisionOptions={divisionOptions}
        sectorOptions={sectorOptions}
        locationOptions={locationOptions}
        statusOptions={statusOptions}
      />

      <div className="mt-[30px] md:mt-80">
        <ProjectsGrid projects={paginatedProjects} />
      </div>

      {totalPages > 1 && (
        <div className="mt-[60px] lg:mt-50 flex justify-center">
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