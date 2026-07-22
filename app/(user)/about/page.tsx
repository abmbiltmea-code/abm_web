import Index from "@/app/components/client/about/Index";
import { GetAboutResult } from "@/app/types/about";
import { getAbout } from "@/lib/services/about.service";

const page = async () => {
  const data: GetAboutResult = await getAbout();

  return (
    <>
      <Index data={data.about} />
    </>
  );
};

export default page;
