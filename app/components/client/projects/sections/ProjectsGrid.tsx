import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../../animations/motionVariants";
import type { Project } from "../data";
import ProjectCard from "./ProjectsCard";

interface ProjectsGridProps {
  projects: Project[];
}

function groupIntoRows(projects: Project[]): Project[][] {
  const rows: Project[][] = [];
  let i = 0;
  let isOddRow = true;

  while (i < projects.length) {
    const rowSize = isOddRow ? 3 : 2;
    rows.push(projects.slice(i, i + rowSize));
    i += rowSize;
    isOddRow = !isOddRow;
  }

  return rows;
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-description-color text-description-2">
        No projects match the selected filters.
      </p>
    );
  }

  const rows = groupIntoRows(projects);

  return (
    <div className="flex flex-col gap-y-80">
      {rows.map((row, rowIndex) => {
        const isOddRow = rowIndex % 2 === 0;

        return (
          <div
            key={rowIndex}
            className={`grid grid-cols-1 gap-x-5 sm:grid-cols-2 md:grid-cols-3 ${
              isOddRow ? "xl:grid-cols-3" : "xl:grid-cols-[705fr_995fr]"
            }`}
          >
            {row.map((project, index) => (
              <Reveal key={index} variants={moveUpV2} delayRange={index * 0.04}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        );
      })}
    </div>
  );
}
