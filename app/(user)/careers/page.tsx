import Index from "@/app/components/client/careers/Index";
import { GetCareersResult } from "@/app/types/careers";
import { getCareers } from "@/lib/services/careers.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCareers();
  return buildMetadata(data.careers?.seo);
}

const page = async () => {
  const data: GetCareersResult = await getCareers();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
