import InnerCta from "../common/InnerCta";
import { ctaData, projectDetails } from "./data";
import { PROJECTS } from "../projects/data";
import ProjectBanner from "./sections/ProjectBanner";
import InfoWithSlider from "./sections/InfoWithSlider";
import ProjectSpecsOverview from "./sections/ProjectSpecsOverview";
import SimilarProjects from "./sections/SimilarProjects";
import { ProjectDetail } from "@/app/types/project";

const Index = ({data}: {data: ProjectDetail}) => {
  return (
    <>
      <ProjectBanner title={data.title} />
      <InfoWithSlider images={data.images} location={data.location?.title || ""} status={data.status?.title || ""} sector={data.sector?.title || ""} />
      <ProjectSpecsOverview
        client={data.client}
        consultant={data.consultant}
        duration={data.duration}
        projectValue={data.projectValue}
        projectOverview={data.content}
        scopeOfWork={data.scopeOfWorks.items.map((item: {title: string}) => item.title)}
      />
      <SimilarProjects projects={PROJECTS} />
      <InnerCta data={data.cta} />
    </>
  );
};

export default Index;
