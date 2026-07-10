import InnerCta from "../common/InnerCta";
import { ctaData, projectDetails } from "./data";
import { PROJECTS } from "../projects/data";
import ProjectBanner from "./sections/ProjectBanner";
import InfoWithSlider from "./sections/InfoWithSlider";
import ProjectSpecsOverview from "./sections/ProjectSpecsOverview";
import SimilarProjects from "./sections/SimilarProjects";

const Index = () => {
  return (
    <>
      <ProjectBanner title={projectDetails.title} />
      <InfoWithSlider images={projectDetails.images} location={projectDetails.location} status={projectDetails.status} sector={projectDetails.sector} />
      <ProjectSpecsOverview
        specifications={projectDetails.specifications}
        projectOverview={projectDetails.projectOverview}
        scopeOfWork={projectDetails.scopeOfWork}
      />
      <SimilarProjects projects={PROJECTS} />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
