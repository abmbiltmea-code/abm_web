import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, ctaData, teamHeaderData } from "./data";
import ChairmanMessage from "./sections/ChairmanMessage";
import Team from "./sections/Team";
import TeamHeader from "./sections/TeamHeader";
import { GetTeamResult } from "@/app/types/team";

const Index = ({ data }: { data: GetTeamResult["team"] }) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <TeamHeader data={data.firstSection} />
      <ChairmanMessage data={data.secondSection} />
      <Team data={data.thirdSection} />
      <InnerCta data={data.fourthSection} />
    </>
  );
};

export default Index;
