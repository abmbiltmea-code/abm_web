import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, ctaData, sectionHeaderData, processData } from "./data";
import SectionHeader from "../common/SectionHeader";
import Process from "./sections/Process";
import Methodology from "./sections/Methodology";
import SafetySection from "./sections/SafetySecton";
import SustainablePractices from "./sections/SustainablePractices";
import OurCommitment from "./sections/OurCommitment";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <SectionHeader
        labelTitle={sectionHeaderData.label}
        sectionTitle={sectionHeaderData.title}
        sectionDescription={sectionHeaderData.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[80ch]"
      />
      <Process {...processData} />
      <Methodology />
      <SafetySection />
      <SustainablePractices />
      <OurCommitment />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
