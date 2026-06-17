import InnerBanner from "../common/InnerBanner";
import { bannerData } from "./data";
import AboutSection from "./sections/AboutSection";
import CoreValuesSection from "./sections/CoreValues";
import PurposeSection from "./sections/PurposeSection";
import VideoSection from "./sections/VideoSection";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <AboutSection />
      <VideoSection />
      <PurposeSection />
      <CoreValuesSection />
    </>
  );
};

export default Index;
