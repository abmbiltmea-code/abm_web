import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, ctaData } from "./data";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
