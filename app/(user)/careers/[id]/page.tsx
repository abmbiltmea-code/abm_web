import Index from "@/app/components/client/career-details/Index";
import { getJobBySlug } from "@/lib/services/careers.service";

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
