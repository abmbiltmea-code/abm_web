import Index from "@/app/components/client/project-details/Index";
import { getProjectBySlug } from "@/lib/services/project.service";

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
