import connectDB from "@/lib/mongodb";
import GalleryModel from "@/app/models/Gallery";
import { unstable_cache } from "next/cache";
import type { GetGalleryResult } from "@/app/types/gallery";

export const getGallery = unstable_cache(
  async (): Promise<GetGalleryResult> => {
    await connectDB();

    const gallery = await GalleryModel.findOne({}).lean();

    if (!gallery) throw new Error("Gallery page not found");

    const galleryDoc = gallery as any;

    // Hidden categories (and the items inside them) are not shown on the site
    const allCategories = (galleryDoc.categories ?? []).filter(
      (c: any) => !c.isHidden,
    );
    const visibleCategoryIds = new Set(
      allCategories.map((c: any) => String(c._id)),
    );
    const allItems = galleryDoc.items ?? [];

    const items = allItems
      .filter(
        (i: any) =>
          !i.isHidden &&
          (!i.category || visibleCategoryIds.has(String(i.category))),
      )
      .map((i: any) => {
        const category = allCategories.find(
          (c: any) => String(c._id) === String(i.category),
        );
        return {
          _id: String(i._id),
          title: i.title,
          images: i.images ?? [],
          category: category
            ? { _id: String(category._id), title: category.title }
            : null,
        };
      });

    return JSON.parse(
      JSON.stringify({
        gallery: galleryDoc,
        categories: allCategories.map((c: any) => ({
          _id: String(c._id),
          title: c.title,
        })),
        items,
      }),
    );
  },
  ["Gallery"],
  { tags: ["Gallery"] },
);