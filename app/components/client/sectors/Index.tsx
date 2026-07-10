import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, ctaData, sectionHeaderData } from "./data";
import SectionHeader from "../common/SectionHeader";
import ProjectSectors from "./sections/ProjectSectors";
import WhyChooseAbm from "./sections/WhyChooseAbm";

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
      <ProjectSectors />
      <WhyChooseAbm />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
