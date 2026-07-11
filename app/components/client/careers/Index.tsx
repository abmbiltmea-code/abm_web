import InnerBanner from "../common/InnerBanner";
import { bannerData, sectionHeaderData } from "./data";
import SectionHeader from "../common/SectionHeader";
import WhyJoinUs from "./sections/WhyJoinUs";
import OpenPositions from "./sections/OpenPositions";
const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <SectionHeader
        labelTitle={sectionHeaderData.label}
        sectionTitle={sectionHeaderData.title}
        sectionDescription={sectionHeaderData.description}
        descriptionClassName="max-w-[65ch] 3xl:max-w-[80ch]"
      />
      <WhyJoinUs />
      <OpenPositions />
    </>
  );
};

export default Index;
