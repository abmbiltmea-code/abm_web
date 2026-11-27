import Index from "@/app/components/client/project-details/Index";
import { getProjectBySlug } from "@/lib/services/project.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectBySlug(id);
  return buildMetadata(project.seo, { title: `${project.title} | ABM` });
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getProjectBySlug(id);
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
