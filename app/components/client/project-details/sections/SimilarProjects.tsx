import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import SectionTitle from "../../animations/SectionTitle";
import { moveUpV2 } from "../../animations/motionVariants";
import ProjectCard from "../../projects/sections/ProjectsCard";

const SimilarProjects = ({ projects }: { projects: any[] }) => {
  return (
    <section className="bg-cream-background py-120 3xl:py-140">
      <div className="container">
        <SectionTitle title="Explore Similar Projects" className="mb-60" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={i} variants={moveUpV2} delayRange={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProjects;
