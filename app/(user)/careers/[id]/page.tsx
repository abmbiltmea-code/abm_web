import Index from "@/app/components/client/career-details/Index";
import { getJobBySlug } from "@/lib/services/careers.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobBySlug(id);
  return buildMetadata(job.seo, { title: `${job.title} | ABM` });
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getJobBySlug(id);
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
