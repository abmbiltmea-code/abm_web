import InnerBanner from "../common/InnerBanner";
import { bannerData, featuredNews, sectionHeaderData, newsList } from "./data";
import SectionHeader from "../common/SectionHeader";
import FeaturedNews from "./sections/FeaturedNews";
import NewsList from "./sections/NewsList";
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
        descriptionClassName="max-w-[65ch] 3xl:max-w-[85ch]"
      />
      <FeaturedNews {...featuredNews} />
      <Suspense fallback={null}>
        <NewsList news={newsList} />
      </Suspense>
    </>
  );
};

export default Index;
