import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import SectionHeader from "../common/SectionHeader";
import ProjectSectors from "./sections/ProjectSectors";
import WhyChooseAbm from "./sections/WhyChooseAbm";
import { GetSectorResult } from "@/app/types/sector";

const Index = ({ data }: { data: GetSectorResult }) => {
  return (
    <>
      <InnerBanner data={data.sector.bannerSection} />
      <SectionHeader
        labelTitle={data.sector.firstSection.sectionLabel}
        sectionTitle={data.sector.firstSection.title}
        sectionDescription={data.sector.firstSection.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[78ch]"
      />
      <ProjectSectors data={data.sector.secondSection} />
      <WhyChooseAbm data={data.sector.thirdSection} cta={data.sector.fourthSection} />
      <InnerCta data={data.sector.fifthSection} />
    </>
  );
};

export default Index;
