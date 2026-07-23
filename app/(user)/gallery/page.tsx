import Index from "@/app/components/client/gallery/Index";
import { GetGalleryResult } from "@/app/types/gallery";
import { getGallery } from "@/lib/services/gallery.service";

const page = async () => {
  const data: GetGalleryResult = await getGallery();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
