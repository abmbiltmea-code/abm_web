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
  const sectorList = Array.isArray(project.sector)
    ? project.sector
    : project.sector
      ? [project.sector]
      : [];

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group flex w-full flex-col">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-[10px]">
          <Image
            src={project.thumbImage || "/assets/images/placeholder.png"}
            alt={project.thumbImageAlt || ""}
            fill
            sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, (min-width: 640px) 67vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          />
        </div>

        <div
          className={`flex justify-between ${contentBg} px-30 py-5 text-description-2 text-description-color pr-[22.5%] capitalize`}
        >
          <span>{project.location?.title}</span>
          <span>
            {sectorList[0]?.title?.toLowerCase()}
            {sectorList.length > 1 &&
              ` - ${sectorList[1].title.toLowerCase().slice(0, 3)}...`}
          </span>
        </div>

        <h3 className="mt-[10px] sm:mt-4 xl:mt-30 text-subtitle-3 line-clamp-2">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
