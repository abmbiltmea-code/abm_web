import InnerBanner from "../common/InnerBanner";
import GalleryShowcase from "./sections/GalleryShowcase";
import { GetGalleryResult } from "@/app/types/gallery";

const Index = ({ data }: { data: GetGalleryResult }) => {
  return (
    <>
      <InnerBanner data={data.gallery.bannerSection} />
      <GalleryShowcase data={data} />
    </>
  );
};

export default Index;
