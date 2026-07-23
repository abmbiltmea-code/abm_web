import InnerBanner from "../common/InnerBanner";
import InnerCta from "../common/InnerCta";
import SectionHeader from "../common/SectionHeader";
import ProjectsMain from "./sections/Main";
import { Suspense } from "react";
import { GetProjectsResult } from "@/app/types/project";

const Index = ({ data }: { data: GetProjectsResult }) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <SectionHeader
        labelTitle={data.firstSection.sectionLabel}
        sectionTitle={data.firstSection.title}
        sectionDescription={data.firstSection.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[82ch]"
        className="pt-[29px] md:pt-70 3xl:pt-[73px] pb-[30px] md:pb-120 3xl:pb-150"
      />
      <Suspense>
        <ProjectsMain data={data} />
      </Suspense>
      <InnerCta data={data.secondSection} />
    </>
  );
};

export default Index;
