import InnerBanner from "../common/InnerBanner";
import { bannerData, sectionHeaderData } from "./data";
import SectionHeader from "../common/SectionHeader";
import WhyJoinUs from "./sections/WhyJoinUs";
import OpenPositions from "./sections/OpenPositions";
import { GetCareersResult } from "@/app/types/careers";

const Index = ({ data }: { data: GetCareersResult }) => {
  return (
    <>
      <InnerBanner data={data.careers.bannerSection} />
      <SectionHeader
        labelTitle={data.careers.firstSection.sectionLabel}
        sectionTitle={data.careers.firstSection.title}
        sectionDescription={data.careers.firstSection.description}
        descriptionClassName="max-w-[65ch] 3xl:max-w-[80ch]"
      />
      <WhyJoinUs data={data.careers.secondSection} />
      <OpenPositions data={data.careers.thirdSection} jobs={data.jobs} />
    </>
  );
};

export default Index;
