import Index from "@/app/components/client/news-details/Index";
import { getNewsBySlug } from "@/lib/services/news.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsBySlug(id);
  return buildMetadata(article.seo, { title: `${article.title} | ABM` });
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getNewsBySlug(id);
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
