import connectDB from "@/lib/mongodb";
import HowWeWorkModel from "@/app/models/HowWeWork";
import { unstable_cache } from "next/cache";
import type { GetHowWeWorkResult } from "@/app/types/how-we-work";

export const getHowWeWork = unstable_cache(
  async (): Promise<GetHowWeWorkResult> => {
    await connectDB();

    const howWeWork = await HowWeWorkModel.findOne({}).lean();

    if (!howWeWork) throw new Error("How We Work page not found");

    return JSON.parse(JSON.stringify({ howWeWork }));
  },
  ["HowWeWork"],
  { tags: ["HowWeWork"] },
);