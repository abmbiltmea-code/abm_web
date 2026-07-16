import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, ctaData } from "./data";
import ChairmanMessage from "./sections/ChairmanMessage";
import Team from "./sections/Team";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <ChairmanMessage />
      <Team />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
