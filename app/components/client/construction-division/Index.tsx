import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { ctaData, cta2Data } from "./data";
import SectionHeader from "../common/SectionHeader";
import Overview from "./sections/Overview";
import WhatWeDo from "./sections/WhatWeDo";
import SectorWeServe from "./sections/SectorWeServe";
import Strengths from "./sections/Strengths";
import InnerCtaSecondary from "../common/InnerCtaSecondary";
import { DivisionDetailProps } from "@/app/types/division";

const Index = ({ data }: DivisionDetailProps) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <SectionHeader
        labelTitle={data.firstSection.sectionLabel}
        sectionTitle={data.firstSection.title}
        sectionDescription={data.firstSection.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[995px] !text-description"
      />
      <Overview data={data.secondSection} />
      <WhatWeDo data={data.thirdSection} />
      <SectorWeServe data={data.fourthSection} />
      <Strengths data={data.fifthSection} />
      <div className="container pb-[60px] md:pb-120 3xl:pb-150">
        <InnerCtaSecondary
          title={data.sixthSection.title}
          btnText={data.sixthSection.button.text}
          btnLink={data.sixthSection.button.link}
          maxTitleWidth="max-w-[28ch]"
        />
      </div>
      <InnerCta data={data.seventhSection} />
    </>
  );
};

export default Index;
