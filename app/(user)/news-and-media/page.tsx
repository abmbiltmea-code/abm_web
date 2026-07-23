import Index from "@/app/components/client/news-and-media/Index";
import { GetNewsResult } from "@/app/types/news";
import { getNews } from "@/lib/services/news.service";

const page = async () => {
  const data: GetNewsResult = await getNews();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
