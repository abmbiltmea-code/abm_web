import connectDB from "@/lib/mongodb";
import NewsModel from "@/app/models/News";
import { unstable_cache } from "next/cache";
import type {
  GetNewsResult,
  NewsListItem,
  NewsDetail,
} from "@/app/types/news";

function resolveCategory(categoryId: any, categories: any[]) {
  const category = categories.find(
    (c: any) => String(c._id) === String(categoryId),
  );
  return category ? { _id: String(category._id), title: category.title } : null;
}

export const getNews = unstable_cache(
  async (): Promise<GetNewsResult> => {
    await connectDB();

    const newsDoc = (await NewsModel.findOne({}).lean()) as any;

    if (!newsDoc) throw new Error("News page not found");

    const allCategories = newsDoc.categories ?? [];
    const allItems = newsDoc.items ?? [];

    const items: NewsListItem[] = allItems
      .filter((i: any) => !i.isHidden)
      .map((i: any) => ({
        _id: String(i._id),
        title: i.title,
        slug: i.slug,
        date: i.date,
        thumbImage: i.thumbImage,
        thumbImageAlt: i.thumbImageAlt,
        category: resolveCategory(i.category, allCategories),
      }))
      .sort(
        (a: NewsListItem, b: NewsListItem) =>
          new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
      );

    return JSON.parse(
      JSON.stringify({
        categories: allCategories.map((c: any) => ({
          _id: String(c._id),
          title: c.title,
        })),
        items,
      }),
    );
  },
  ["News"],
  { tags: ["News"] },
);

export const getNewsBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<NewsDetail> => {
      await connectDB();

      const newsDoc = (await NewsModel.findOne({}).lean()) as any;

      if (!newsDoc) throw new Error("News page not found");

      const allCategories = newsDoc.categories ?? [];
      const item = newsDoc.items?.find((i: any) => i.slug === slug);

      if (!item) throw new Error(`News item not found: ${slug}`);

      return JSON.parse(
        JSON.stringify({
          _id: String(item._id),
          isHidden: item.isHidden,
          title: item.title,
          slug: item.slug,
          date: item.date,
          thumbImage: item.thumbImage,
          thumbImageAlt: item.thumbImageAlt,
          content: item.content,
          category: resolveCategory(item.category, allCategories),
        }),
      );
    },
    ["News-slug", slug],
    { tags: ["News"] },
  )();