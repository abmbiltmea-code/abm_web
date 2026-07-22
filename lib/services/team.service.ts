import connectDB from "@/lib/mongodb";
import TeamModel from "@/app/models/Team";
import { unstable_cache } from "next/cache";
import type { GetTeamResult } from "@/app/types/team";

export const getTeam = unstable_cache(
  async (): Promise<GetTeamResult> => {
    await connectDB();

    const team = await TeamModel.findOne({}).lean();

    if (!team) throw new Error("Team not found");

    return JSON.parse(JSON.stringify({ team }));
  },
  ["Team"],
  { tags: ["Team"] },
);