import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, sectionHeaderData, ctaData } from "./data";
import SectionHeader from "../common/SectionHeader";
import ProjectsMain from "./sections/Main";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <SectionHeader
        labelTitle={sectionHeaderData.label}
        sectionTitle={sectionHeaderData.title}
        sectionDescription={sectionHeaderData.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[78ch]"
      />
      <ProjectsMain />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
