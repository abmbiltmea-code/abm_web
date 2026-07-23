import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import SectionHeader from "../common/SectionHeader";
import CertificateGrid from "./sections/CertificateGrid";
import Standards from "./sections/Standards";
import { GetCertificationsResult } from "@/app/types/certifications";

const Index = ({
  data,
}: {
  data: GetCertificationsResult["certifications"];
}) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <SectionHeader
        labelTitle={data.firstSection.sectionLabel}
        sectionTitle={data.firstSection.title}
        sectionDescription={data.firstSection.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[80ch]"
        className="pt-[29px] md:pt-70 3xl:pt-[73px] pb-[30px] md:pb-120 3xl:pb-150"
      />
      <CertificateGrid data={data.secondSection} />
      <Standards standards={data.thirdSection} ctaData2={data.fourthSection} />
      <InnerCta data={data.fifthSection} />
    </>
  );
};

export default Index;
