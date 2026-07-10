"use client";

import { useMemo, useState } from "react";
import { PROJECTS } from "../data";
import FilterBar, { EMPTY_FILTERS, type Filters } from "./FilterBar";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsMain() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

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
  }, [filters]);

  return (
    <section className="container pb-[60px] md:pb-120 3xl:pb-150">
      <FilterBar filters={filters} onChange={setFilters} />

      <div className="mt-80">
        <ProjectsGrid projects={filteredProjects} />
      </div>
    </section>
  );
}
