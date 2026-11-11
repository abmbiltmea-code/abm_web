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

// Applied on a plain /projects visit (no filters in the URL).
// Matched by slug first, then by name, so capitalisation or minor renames in
// the CMS (currently "CONSTRUCTION DIVISION") don't break the default.
const DEFAULT_DIVISION_SLUG = "construction-division";
const DEFAULT_DIVISION_KEYWORD = "construction";
const DEFAULT_LOCATION = "dubai";
// Written when the visitor clears every filter, so the defaults don't come back.
const VIEW_ALL_PARAM = "view";
const VIEW_ALL_VALUE = "all";

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

  // Filters exactly as they appear in the URL.
  const urlFilters: Filters = {
    division: searchParams.get("division"),
    sector: searchParams.get("sector"),
    location: searchParams.get("location"),
    status: searchParams.get("status"),
  };
  const hasUrlFilters = Boolean(
    urlFilters.division ||
      urlFilters.sector ||
      urlFilters.location ||
      urlFilters.status,
  );
  const isViewAll = searchParams.get(VIEW_ALL_PARAM) === VIEW_ALL_VALUE;

  // Only default to values that actually exist, so a renamed division or
  // location never produces an empty list.
  const defaultDivisionDoc =
    data.divisions.find((d) => d.slug === DEFAULT_DIVISION_SLUG) ??
    data.divisions.find((d) =>
      d.name?.toLowerCase().includes(DEFAULT_DIVISION_KEYWORD),
    );
  // The filter compares lower-cased division names.
  const defaultDivision = defaultDivisionDoc?.name?.toLowerCase() ?? null;
  const defaultLocation = data.locations.some(
    (l) => l.title?.toLowerCase() === DEFAULT_LOCATION,
  )
    ? DEFAULT_LOCATION
    : null;

  // Defaults apply only on a plain visit. Links that already carry a filter
  // (e.g. /projects?sector=residential from the Sectors page) are untouched.
  const filters: Filters =
    hasUrlFilters || isViewAll
      ? urlFilters
      : { ...urlFilters, division: defaultDivision, location: defaultLocation };

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  useEffect(() => {
    if (hasAutoScrolled.current) return;
    // Only scroll for filters that came in the URL, not the page defaults.
    const cameWithFilter = hasUrlFilters;

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
  const isEmpty =
    !next.division && !next.sector && !next.location && !next.status;
  const isReset =
    isEmpty &&
    !filters.division &&
    !filters.sector &&
    !filters.location &&
    !filters.status;
  updateParams({
    division: next.division ? next.division.toLowerCase() : null,
    sector: next.sector ? next.sector.toLowerCase() : null,
    location: next.location ? next.location.toLowerCase() : null,
    status: next.status ? next.status.toLowerCase() : null,
    // Clearing the last filter shows everything instead of snapping back to
    // the defaults. Reset (handled separately) returns to the defaults.
    [VIEW_ALL_PARAM]: isEmpty && !isReset ? VIEW_ALL_VALUE : null,
    page: null,
  });
};

const handleReset = () => {
  updateParams({
    division: null,
    sector: null,
    location: null,
    status: null,
    [VIEW_ALL_PARAM]: null,
    page: null,
  });
};

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
  };

  const divisionOptions = useMemo(
    () =>
      data.divisions.map((d) => d.name).filter((n): n is string => Boolean(n)),
    [data.divisions],
  );
  const sectorOptions = useMemo(
    () =>
      data.sectors.map((s) => s.title).filter((t): t is string => Boolean(t)),
    [data.sectors],
  );
  const locationOptions = useMemo(
    () =>
      data.locations.map((l) => l.title).filter((t): t is string => Boolean(t)),
    [data.locations],
  );
  const statusOptions = useMemo(
    () =>
      data.statuses.map((s) => s.title).filter((t): t is string => Boolean(t)),
    [data.statuses],
  );

const filteredProjects = useMemo(() => {
  const division = filters.division?.toLowerCase();
  const sector = filters.sector?.toLowerCase();
  const location = filters.location?.toLowerCase();
  const status = filters.status?.toLowerCase();

  return data.projects.filter((project) => {
    if (division && project.division?.name?.toLowerCase() !== division)
      return false;
    if (
      sector &&
      !project.sector?.some((s) => s.title?.toLowerCase() === sector)
    )
      return false;
    if (location && project.location?.title?.toLowerCase() !== location)
      return false;
    if (status && project.status?.title?.toLowerCase() !== status)
      return false;
    return true;
  });
}, [
  data.projects,
  filters.division,
  filters.sector,
  filters.location,
  filters.status,
]);

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
        onReset={handleReset}
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
