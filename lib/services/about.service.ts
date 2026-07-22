import connectDB from "@/lib/mongodb";
import AboutModel from "@/app/models/About";
import { unstable_cache } from "next/cache";
import type { GetAboutResult } from "@/app/types/about";

export const getAbout = unstable_cache(
  async (): Promise<GetAboutResult> => {
    await connectDB();

    const about = await AboutModel.findOne({}).lean();

    if (!about) throw new Error("About not found");

    return JSON.parse(JSON.stringify({ about }));
  },
  ["About"],
  { tags: ["About"] },
);