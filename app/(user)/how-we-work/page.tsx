import Index from "@/app/components/client/how-we-work/Index";
import { GetHowWeWorkResult } from "@/app/types/how-we-work";
import { getHowWeWork } from "@/lib/services/how-we-work.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHowWeWork();
  return buildMetadata(data.howWeWork?.seo);
}

const page = async () => {
  const data: GetHowWeWorkResult = await getHowWeWork();
  return (
    <>
      <Index data={data.howWeWork} />
    </>
  );
};

export default page;
