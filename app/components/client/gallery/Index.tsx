import InnerBanner from "../common/InnerBanner";
import { bannerData } from "./data";
import GalleryShowcase from "./sections/GalleryShowcase";

const Index = () => {
  return (
    <>
      <InnerBanner {...bannerData} />
      <GalleryShowcase />
    </>
  );
};

export default Index;
