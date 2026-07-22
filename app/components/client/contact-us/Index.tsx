import InnerBanner from "../common/InnerBanner";
import { bannerData } from "./data";
import LetsConnect from "./sections/LetsConnect";
import Map from "./sections/Map";
import StartProjectSection from "./sections/StartProject";
import { GetContactResult } from "@/app/types/contact";

const Index = ({ data }: { data: GetContactResult["contact"] }) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <LetsConnect data={data.firstSection} address={data.thirdSection.map} />
      <StartProjectSection data={data.secondSection} />
      <Map data={data.thirdSection} />
    </>
  );
};

export default Index;
