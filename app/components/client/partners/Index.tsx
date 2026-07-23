import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import SectionHeader from "../common/SectionHeader";
import LogoGrid from "./sections/LogoGrid";
import InnerCtaSecondary from "../common/InnerCtaSecondary";
import { GetClientsResult } from "@/app/types/clients";

const Index = ({ data }: { data: GetClientsResult["clients"] }) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <SectionHeader
        labelTitle={data.firstSection.sectionLabel}
        sectionTitle={data.firstSection.title}
        sectionDescription={data.firstSection.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[83ch]"
        className="pt-[29px] md:pt-70 3xl:pt-[73px] pb-[30px]  md:pb-120 3xl:pb-[115px]"
      />
      <LogoGrid data={data.secondSection.items} line />
      <SectionHeader
        className="pt-[60px] md:py-120 3xl:py-150 pb-[30px] md:pb-120 3xl:pb-[115px]"
        labelTitle={data.thirdSection.sectionLabel}
        sectionTitle={data.thirdSection.title}
        sectionDescription={data.thirdSection.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[78ch]"
      />
      <LogoGrid data={data.fourthSection.items} />
      <div className="container mb-[60px] md:mb-120 3xl:mb-150">
        <InnerCtaSecondary
          title={data.fifthSection.title}
          maxTitleWidth="max-w-[35ch]"
          btnText={data.fifthSection.button.text}
          btnLink={data.fifthSection.button.link}
        />
      </div>
      <InnerCta data={data.sixthSection} />
    </>
  );
};

export default Index;
