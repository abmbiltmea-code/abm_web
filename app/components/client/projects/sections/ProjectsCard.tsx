import Image from "next/image";
import type { Project } from "../data";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.title.toLowerCase().replace(/ /g, "-")}`}>
      <div className="group flex w-full flex-col">
        <div className="relative aspect-square max-h-[294px] sm:max-h-full w-full overflow-hidden rounded-t-[10px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex justify-between bg-cream-background px-30 py-5 text-description-2 text-description-color pr-[22.5%]">
          <span>{project.location}</span>
          <span>{project.sector}</span>
        </div>

        <h3 className="mt-[10px] sm:mt-4 xl:mt-30 text-subtitle-3 line-clamp-2">{project.title}</h3>
      </div>
    </Link>
  );
}
