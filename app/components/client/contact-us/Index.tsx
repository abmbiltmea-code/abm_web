import InnerBanner from "../common/InnerBanner";
import { bannerData } from "./data";
import LetsConnect from "./sections/LetsConnect";
import Map from "./sections/Map";
import StartProjectSection from "./sections/StartProject";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <LetsConnect />
      <StartProjectSection />
      <Map />
    </>
  );
};

export default Index;
