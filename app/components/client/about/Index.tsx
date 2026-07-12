import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, ctaData } from "./data";
import AboutSection from "./sections/AboutSection";
import CoreValuesSection from "./sections/CoreValues";
import Evolution from "./sections/Evolution";
import GroupCompanies from "./sections/GroupCompanies";
import PurposeSection from "./sections/PurposeSection";
import VideoSection from "./sections/VideoSection";
import WhyChooseUs from "./sections/WhyChooseUs";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <AboutSection />
      <VideoSection />
      <PurposeSection />
      <CoreValuesSection />
      <Evolution />
      <GroupCompanies />
      <WhyChooseUs />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
