import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, ctaData, sectionHeaderData, cta2Data } from "./data";
import SectionHeader from "../common/SectionHeader";
import Overview from "./sections/Overview";
import WhatWeDo from "./sections/WhatWeDo";
import SectorWeServe from "./sections/SectorWeServe";
import Strengths from "./sections/Strengths";
import InnerCtaSecondary from "../common/InnerCtaSecondary";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <SectionHeader
        labelTitle={sectionHeaderData.label}
        sectionTitle={sectionHeaderData.title}
        sectionDescription={sectionHeaderData.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[995px] !text-description"
      />
      <Overview />
      <WhatWeDo />
      <SectorWeServe />
      <Strengths />
      <div className="container pb-[60px] md:pb-120 3xl:pb-150">
        <InnerCtaSecondary
          title={cta2Data.title}
          btnText={cta2Data.btnText}
          btnLink={cta2Data.btnLink}
          maxTitleWidth="max-w-[28ch]"
        />
      </div>
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
