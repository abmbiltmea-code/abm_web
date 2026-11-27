import Index from "@/app/components/client/news-and-media/Index";
import { GetNewsResult } from "@/app/types/news";
import { getNews } from "@/lib/services/news.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getNews();
  return buildMetadata(data.seo);
}

const page = async () => {
  const data: GetNewsResult = await getNews();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
