import Index from "@/app/components/client/sectors/Index";
import { GetSectorResult } from "@/app/types/sector";
import { getSector } from "@/lib/services/sector.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSector();
  return buildMetadata(data.sector?.seo);
}

const page = async () => {
  const data: GetSectorResult = await getSector();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
