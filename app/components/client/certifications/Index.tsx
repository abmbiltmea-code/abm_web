import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import {
  bannerData,
  ctaData,
  sectionHeaderData,
  certificates,
  standards,
  ctaData2,
} from "./data";
import SectionHeader from "../common/SectionHeader";
import CertificateGrid from "./sections/CertificateGrid";
import Standards from "./sections/Standards";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <SectionHeader
        labelTitle={sectionHeaderData.label}
        sectionTitle={sectionHeaderData.title}
        sectionDescription={sectionHeaderData.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[80ch]"
        className="pt-[29px] md:pt-70 3xl:pt-[73px] pb-[30px] md:pb-120 3xl:pb-150"
      />
      <CertificateGrid items={certificates} />
      <Standards standards={standards} ctaData2={ctaData2} />
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
