import Index from "@/app/components/client/about/Index";
import { GetAboutResult } from "@/app/types/about";
import { getAbout } from "@/lib/services/about.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAbout();
  return buildMetadata(data.about?.seo);
}

const page = async () => {
  const data: GetAboutResult = await getAbout();

  return (
    <>
      <Index data={data.about} />
    </>
  );
};

export default page;
