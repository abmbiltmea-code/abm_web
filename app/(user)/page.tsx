import Index from "../components/client/home/Index";
import { getHome } from "@/lib/services/home.service";
import { GetHomeResult } from "@/app/types/home";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome();
  return buildMetadata(data.home?.seo);
}

const page = async () => {
  const data: GetHomeResult = await getHome();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
