import Index from "@/app/components/client/construction-division/Index";
import { getDivisionById } from "@/lib/services/division.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const division = await getDivisionById(id);
  return buildMetadata(division.seo, { title: `${division.name} | ABM` });
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getDivisionById(id);
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
