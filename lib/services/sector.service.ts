import connectDB from "@/lib/mongodb";
import SectorModel from "@/app/models/Sector";
import { unstable_cache } from "next/cache";
import type { GetSectorResult } from "@/app/types/sector";

export const getSector = unstable_cache(
  async (): Promise<GetSectorResult> => {
    await connectDB();

    const sector = await SectorModel.findOne({}).lean();

    if (!sector) throw new Error("Sector page not found");

    const sectorDoc = sector as any;

    const visibleSectors =
      sectorDoc.secondSection?.sectors?.filter((s: any) => !s.isHidden) ?? [];

    return JSON.parse(
      JSON.stringify({
        sector: sectorDoc,
        sectors: visibleSectors,
      }),
    );
  },
  ["Sector"],
  { tags: ["Sector"] },
);