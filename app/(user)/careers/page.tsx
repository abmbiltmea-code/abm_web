import Index from "@/app/components/client/careers/Index";
import { GetCareersResult } from "@/app/types/careers";
import { getCareers } from "@/lib/services/careers.service";

const page = async () => {
  const data: GetCareersResult = await getCareers();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
