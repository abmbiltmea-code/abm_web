import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import { bannerData, sectionHeaderData, ctaData } from "./data";
import SectionHeader from "../common/SectionHeader";
import ProjectsMain from "./sections/Main";
import { Suspense } from "react";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <SectionHeader
        labelTitle={sectionHeaderData.label}
        sectionTitle={sectionHeaderData.title}
        sectionDescription={sectionHeaderData.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[82ch]"
        className="pt-[29px] md:pt-70 3xl:pt-[73px] pb-[30px] md:pb-120 3xl:pb-150"
      />
      <Suspense>
        <ProjectsMain />
      </Suspense>
      <InnerCta {...ctaData} />
    </>
  );
};

export default Index;
