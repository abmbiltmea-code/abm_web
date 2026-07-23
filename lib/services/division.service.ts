import connectDB from "@/lib/mongodb";
import DivisionModel from "@/app/models/Divisions";
import { unstable_cache } from "next/cache";
import type { DivisionDetail } from "@/app/types/division";

export const getDivisionById = (id: string) =>
  unstable_cache(
    async (): Promise<DivisionDetail> => {
      await connectDB();

      const division = (await DivisionModel.findOne({
        slug: id,
      }).lean()) as any;

      if (!division) throw new Error(`Division not found: ${id}`);

      return JSON.parse(
        JSON.stringify({
          _id: String(division._id),
          name: division.name,
          slug: division.slug,
          isHidden: division.isHidden,
          seo: division.seo,
          homePageSection: division.homePageSection,
          bannerSection: division.bannerSection,
          firstSection: division.firstSection,
          secondSection: division.secondSection,
          thirdSection: division.thirdSection,
          fourthSection: division.fourthSection,
          fifthSection: division.fifthSection,
          sixthSection: division.sixthSection,
          seventhSection: division.seventhSection,
          createdAt: division.createdAt,
          updatedAt: division.updatedAt,
        }),
      );
    },
    ["Division", id],
    { tags: ["Division"] },
  )();
