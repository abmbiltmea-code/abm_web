import Index from "@/app/components/client/sectors/Index";
import { GetSectorResult } from "@/app/types/sector";
import { getSector } from "@/lib/services/sector.service";

const page = async () => {
  const data: GetSectorResult = await getSector();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
