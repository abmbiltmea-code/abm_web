import Index from "../components/client/home/Index";
import { getHome } from "@/lib/services/home.service";
import { GetHomeResult } from "@/app/types/home";

const page = async () => {
  const data: GetHomeResult = await getHome();
  
  return (
    <>
      <Index />
    </>
  );
};

export default page;
