import connectDB from "@/lib/mongodb";
import CertificationsModel from "@/app/models/Certifications";
import { unstable_cache } from "next/cache";
import type { GetCertificationsResult } from "@/app/types/certifications";

export const getCertifications = unstable_cache(
  async (): Promise<GetCertificationsResult> => {
    await connectDB();

    const certifications = await CertificationsModel.findOne({}).lean();

    if (!certifications) throw new Error("Certifications page not found");

    return JSON.parse(JSON.stringify({ certifications }));
  },
  ["Certifications"],
  { tags: ["Certifications"] },
);