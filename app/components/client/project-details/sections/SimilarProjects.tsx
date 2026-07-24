"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Reveal from "../../animations/RevealItemsOneByOneAnimation";
import SectionTitle from "../../animations/SectionTitle";
import { moveUpV2 } from "../../animations/motionVariants";
import ProjectCard from "../../projects/sections/ProjectsCard";
import { Autoplay } from "swiper/modules";
import { ProjectListItem } from "@/app/types/project";

const SimilarProjects = ({ projects }: { projects: ProjectListItem[] }) => {
  return (
    <section className="bg-cream-background py-120 3xl:py-140 overflow-hidden">
      <div className="container">
        <SectionTitle title="Explore Similar Projects" className="mb-60" />
        <div className="lg:hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.181}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2.2,
              },
            }}
            speed={700}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="w-full !overflow-visible"
          >
            {projects.map((project, i) => (
              <SwiperSlide key={i}>
                <ProjectCard project={project} contentBg="bg-white" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
