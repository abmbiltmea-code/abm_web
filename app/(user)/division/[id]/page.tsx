import Index from "@/app/components/client/construction-division/Index";
import { getDivisionById } from "@/lib/services/division.service";

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
