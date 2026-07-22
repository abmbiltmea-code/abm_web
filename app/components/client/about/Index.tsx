import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import AboutSection from "./sections/AboutSection";
import CoreValuesSection from "./sections/CoreValues";
import Evolution from "./sections/Evolution";
import GroupCompanies from "./sections/GroupCompanies";
import PurposeSection from "./sections/PurposeSection";
import VideoSection from "./sections/VideoSection";
import WhyChooseUs from "./sections/WhyChooseUs";
import { GetAboutResult } from "@/app/types/about";

const Index = ({ data }: { data: GetAboutResult["about"] }) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <AboutSection data={data.firstSection} />
      <VideoSection data={data.secondSection} />
      <PurposeSection data={data.thirdSection} />
      <CoreValuesSection data={data.fourthSection} />
      <Evolution data={data.fifthSection} />
      <GroupCompanies data={data.sixthSection} />
      <WhyChooseUs data={data.seventhSection} />
      <InnerCta data={data.eighthSection} />
    </>
  );
};

export default Index;
