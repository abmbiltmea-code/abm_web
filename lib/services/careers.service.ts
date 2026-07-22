import connectDB from "@/lib/mongodb";
import CareersModel from "@/app/models/Careers";
import { unstable_cache } from "next/cache";
import type { GetCareersResult, JobDoc } from "@/app/types/careers";

export const getCareers = unstable_cache(
  async (): Promise<GetCareersResult> => {
    await connectDB();

    const careers = await CareersModel.findOne({}).lean();

    if (!careers) throw new Error("Careers page not found");

    const careersDoc = careers as any;

    const jobs = (careersDoc.thirdSection?.jobs ?? []).filter(
      (j: any) => !j.isHidden,
    );

    return JSON.parse(
      JSON.stringify({
        careers: careersDoc,
        jobs,
      }),
    );
  },
  ["Careers"],
  { tags: ["Careers"] },
);

export const getJobBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<JobDoc> => {
      await connectDB();

      const careers = (await CareersModel.findOne({}).lean()) as any;

      if (!careers) throw new Error("Careers page not found");

      const job = careers.thirdSection?.jobs?.find(
        (j: any) => j.slug === slug,
      );

      if (!job) throw new Error(`Job not found: ${slug}`);

      return JSON.parse(JSON.stringify(job));
    },
    ["Job-slug", slug],
    { tags: ["Careers"] },
  )();