import Image from "next/image";
import Link from "next/link";
import { ProjectListItem } from "@/app/types/project";

interface ProjectCardProps {
  project: ProjectListItem;
  contentBg?: string;
}

export default function ProjectCard({
  project,
  contentBg = "bg-cream-background",
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group flex w-full flex-col">
        <div className="relative aspect-square max-h-[294px] sm:max-h-full w-full overflow-hidden rounded-t-[10px]">
          <Image
            src={project.thumbImage || "/assets/images/placeholder.png"}
            alt={project.thumbImageAlt || ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          />
        </div>

        <div
          className={`flex justify-between ${contentBg} px-30 py-5 text-description-2 text-description-color pr-[22.5%]`}
        >
          <span>{project.location?.title}</span>
          <span>{project.sector?.title}</span>
        </div>

        <h3 className="mt-[10px] sm:mt-4 xl:mt-30 text-subtitle-3 line-clamp-2">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
