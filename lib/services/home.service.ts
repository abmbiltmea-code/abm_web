import connectDB from "@/lib/mongodb";
import HomeModel from "@/app/models/Home";
import "@/app/models/Divisions";
import SectorModel from "@/app/models/Sector";
import ProjectModel from "@/app/models/Projects";
import { unstable_cache } from "next/cache";
import type { GetHomeResult } from "@/app/types/home";

export const getHome = unstable_cache(
  async (): Promise<GetHomeResult> => {
    await connectDB();

    const [home, sectorDoc, projectDoc] = await Promise.all([
      HomeModel.findOne({})
        .populate({
          path: "thirdSection.divisionIds",
          select: "name slug homePageSection isHidden",
        })
        .lean(),
      SectorModel.findOne({}, { "secondSection.sectors": 1 }).lean(),
      ProjectModel.findOne({}, { items: 1, locations: 1 }).lean(),
    ]);

    if (!home) throw new Error("Home not found");

    const homeDoc = home as any;

    const divisions =
      homeDoc.thirdSection?.divisionIds
        ?.filter((d: any) => d && !d.isHidden)
        ?.map((d: any) => ({
          _id: String(d._id),
          name: d.name,
          slug: d.slug,
          homePageSection: d.homePageSection,
        })) ?? [];

    const allSectors = (sectorDoc as any)?.secondSection?.sectors ?? [];
    const selectedSectorIds = (homeDoc.fourthSection?.sectorIds ?? []).map(
      (id: any) => String(id),
    );
    const sectors = allSectors
      .filter(
        (s: any) => selectedSectorIds.includes(String(s._id)) && !s.isHidden,
      )
      .map((s: any) => ({
        _id: String(s._id),
        title: s.title,
        thumbnail: s.thumbnail,
        thumbnailAlt: s.thumbnailAlt,
        homePageImage: s.homePageImage,
        homePageImageAlt: s.homePageImageAlt,
        homePageIcon: s.homePageIcon,
        homePageIconAlt: s.homePageIconAlt,
        homePageButton: s.homePageButton,
        homePageDescription: s.homePageDescription,
      }));

    const allProjects = (projectDoc as any)?.items ?? [];
    const allLocations = (projectDoc as any)?.locations ?? [];

    const featuredProjects = allProjects
      .filter((p: any) => p.featured && !p.isHidden)
      .map((p: any) => {
        const location = allLocations.find(
          (l: any) => String(l._id) === String(p.location),
        );
        return {
          _id: String(p._id),
          title: p.title,
          slug: p.slug,
          thumbImage: p.thumbImage,
          thumbImageAlt: p.thumbImageAlt,
          location: location?.title ?? null,
        };
      });

    return JSON.parse(
      JSON.stringify({ home: homeDoc, divisions, sectors, featuredProjects }),
    );
  },
  ["Home"],
  { tags: ["Home"] },
);
