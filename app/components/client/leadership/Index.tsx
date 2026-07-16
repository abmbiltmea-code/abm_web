import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, ctaData, teamHeaderData } from "./data";
import ChairmanMessage from "./sections/ChairmanMessage";
import Team from "./sections/Team";
import TeamHeader from "./sections/TeamHeader";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <TeamHeader {...teamHeaderData} />
      <ChairmanMessage />
      <Team />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
