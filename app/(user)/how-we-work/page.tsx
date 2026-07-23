import Index from "@/app/components/client/how-we-work/Index";
import { GetHowWeWorkResult } from "@/app/types/how-we-work";
import { getHowWeWork } from "@/lib/services/how-we-work.service";

const page = async () => {
  const data: GetHowWeWorkResult = await getHowWeWork();
  return (
    <>
      <Index data={data.howWeWork} />
    </>
  );
};

export default page;
