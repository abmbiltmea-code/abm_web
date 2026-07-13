import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import {
  bannerData,
  ctaData,
  sectionHeaderData,
  clientLogos,
  sectionHeaderData2,
  ctaData2,
} from "./data";
import SectionHeader from "../common/SectionHeader";
import LogoGrid from "./sections/LogoGrid";
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
        descriptionClassName="max-w-[65ch] 3xl:max-w-[83ch]"
        className="pt-70 3xl:pt-[73px] pb-120 3xl:pb-[115px]"
      />
      <LogoGrid items={clientLogos} line />
      <SectionHeader
        className="pt-[60px] md:py-120 3xl:py-150 pb-120 3xl:pb-[115px]"
        labelTitle={sectionHeaderData2.label}
        sectionTitle={sectionHeaderData2.title}
        sectionDescription={sectionHeaderData2.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[78ch]"
      />
      <LogoGrid items={clientLogos} />
      <div className="container mb-[60px] md:mb-120 3xl:mb-150">
        <InnerCtaSecondary
          title={ctaData2.ctaTitle}
          maxTitleWidth="max-w-[35ch]"
          btnText={ctaData2.ctaBtnText}
          btnLink={ctaData2.ctaBtnLink}
        />
      </div>
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
