import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import SectionHeader from "../common/SectionHeader";
import Process from "./sections/Process";
import Methodology from "./sections/Methodology";
import SafetySection from "./sections/SafetySecton";
import SustainablePractices from "./sections/SustainablePractices";
import OurCommitment from "./sections/OurCommitment";
import { GetHowWeWorkResult } from "@/app/types/how-we-work";

const Index = ({ data }: { data: GetHowWeWorkResult["howWeWork"] }) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <SectionHeader
        labelTitle={data.firstSection.sectionLabel}
        sectionTitle={data.firstSection.title}
        sectionDescription={data.firstSection.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[80ch]"
      />
      <Process data={data.secondSection} />
      <Methodology data={data.thirdSection} />
      <SafetySection data={data.fourthSection} />
      <SustainablePractices data={data.fifthSection} />
      <OurCommitment data={data.sixthSection} />
      <InnerCta data={data.seventhSection} />
    </>
  );
};

export default Index;
