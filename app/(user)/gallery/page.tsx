import Index from "@/app/components/client/gallery/Index";
import { GetGalleryResult } from "@/app/types/gallery";
import { getGallery } from "@/lib/services/gallery.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGallery();
  return buildMetadata(data.gallery?.seo);
}

const page = async () => {
  const data: GetGalleryResult = await getGallery();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
