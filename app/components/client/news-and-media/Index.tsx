import InnerBanner from "../common/InnerBanner";
// import { bannerData, featuredNews, sectionHeaderData, newsList } from "./data";
import SectionHeader from "../common/SectionHeader";
import FeaturedNews from "./sections/FeaturedNews";
import NewsList from "./sections/NewsList";
import { Suspense } from "react";
import { GetNewsResult } from "@/app/types/news";

const Index = ({ data }: { data: GetNewsResult }) => {
  return (
    <>
      <InnerBanner data={data.bannerSection} />
      <SectionHeader
        labelTitle={data.firstSection.sectionLabel}
        sectionTitle={data.firstSection.title}
        sectionDescription={data.firstSection.description}
        titleClassName="max-w-[25ch]"
        descriptionClassName="max-w-[65ch] 3xl:max-w-[85ch]"
        className="pt-[29px] md:pt-70 3xl:pt-[73px] pb-[30px] md:pb-120 3xl:pb-150"
      />
      {/* <FeaturedNews {...featuredNews} /> */}
      <Suspense fallback={null}>
        <NewsList news={data} />
      </Suspense>
    </>
  );
};

export default Index;
