import connectDB from "@/lib/mongodb";
import ProjectModel from "@/app/models/Projects";
import SectorModel from "@/app/models/Sector";
import "@/app/models/Divisions";
import { unstable_cache } from "next/cache";
import type {
  GetProjectsResult,
  ProjectListItem,
  ProjectDetail,
} from "@/app/types/project";

function resolveProjects(
  items: any[],
  locations: any[],
  statuses: any[],
  sectorsById: Map<string, any>,
  divisionsById: Map<string, any>,
) {
  return items.map((p: any) => {
    const location = locations.find(
      (l: any) => String(l._id) === String(p.location),
    );
    const status = statuses.find(
      (s: any) => String(s._id) === String(p.status),
    );
    const sector = p.sector ? sectorsById.get(String(p.sector)) : null;
    const division = p.division ? divisionsById.get(String(p.division)) : null;

    return {
      _id: String(p._id),
      isHidden: p.isHidden,
      title: p.title,
      slug: p.slug,
      featured: p.featured,
      thumbImage: p.thumbImage,
      thumbImageAlt: p.thumbImageAlt,
      images: p.images ?? [],
      client: p.client,
      consultant: p.consultant,
      duration: p.duration,
      projectValue: p.projectValue,
      content: p.content,
      scopeOfWorks: p.scopeOfWorks ?? { items: [] },
      location: location
        ? { _id: String(location._id), title: location.title }
        : null,
      status: status ? { _id: String(status._id), title: status.title } : null,
      sector: sector ? { _id: String(sector._id), title: sector.title } : null,
      division: division
        ? {
            _id: String(division._id),
            name: division.name,
            slug: division.slug,
          }
        : null,
      cta: p.cta ?? {},
    };
  });
}

export const getProjects = unstable_cache(
  async (): Promise<GetProjectsResult> => {
    await connectDB();

    const [projectDoc, sectorDoc] = await Promise.all([
      ProjectModel.findOne({})
        .populate({ path: "items.division", select: "name slug" })
        .lean(),
      SectorModel.findOne({}, { "secondSection.sectors": 1 }).lean(),
    ]);

    if (!projectDoc) throw new Error("Projects page not found");

    const doc = projectDoc as any;
    const allItems = doc.items ?? [];
    const allLocations = doc.locations ?? [];
    const allStatuses = doc.statuses ?? [];
    const allSectors = (sectorDoc as any)?.secondSection?.sectors ?? [];

    const sectorsById = new Map<string, any>(
      allSectors.map((s: any) => [String(s._id), s]),
    );
    const divisionsById = new Map<string, any>();
    allItems.forEach((p: any) => {
      if (p.division && typeof p.division === "object") {
        divisionsById.set(String(p.division._id), p.division);
      }
    });
    const normalizedItems = allItems.map((p: any) => ({
      ...p,
      division:
        p.division && typeof p.division === "object"
          ? p.division._id
          : p.division,
    }));

    const resolved = resolveProjects(
      normalizedItems,
      allLocations,
      allStatuses,
      sectorsById,
      divisionsById,
    ).filter((p) => !p.isHidden);

    const projects: ProjectListItem[] = resolved.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      featured: p.featured,
      thumbImage: p.thumbImage,
      thumbImageAlt: p.thumbImageAlt,
      location: p.location,
      status: p.status,
      sector: p.sector,
      division: p.division,
    }));

    return JSON.parse(
      JSON.stringify({
        seo: doc.seo,
        bannerSection: doc.bannerSection,
        firstSection: doc.firstSection,
        secondSection: doc.secondSection,
        locations: allLocations.map((l: any) => ({
          _id: String(l._id),
          title: l.title,
        })),
        statuses: allStatuses.map((s: any) => ({
          _id: String(s._id),
          title: s.title,
        })),
        sectors: allSectors.map((s: any) => ({
          _id: String(s._id),
          title: s.title,
        })),
        divisions: Array.from(divisionsById.values()).map((d: any) => ({
          _id: String(d._id),
          name: d.name,
          slug: d.slug,
        })),
        projects,
      }),
    );
  },
  ["Project"],
  { tags: ["Project"] },
);

export const getProjectBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<ProjectDetail> => {
      await connectDB();

      const [projectDoc, sectorDoc] = await Promise.all([
        ProjectModel.findOne({})
          .populate({ path: "items.division", select: "name slug" })
          .lean(),
        SectorModel.findOne({}, { "secondSection.sectors": 1 }).lean(),
      ]);

      if (!projectDoc) throw new Error("Projects page not found");

      const doc = projectDoc as any;
      const allItems = doc.items ?? [];
      const allLocations = doc.locations ?? [];
      const allStatuses = doc.statuses ?? [];
      const allSectors = (sectorDoc as any)?.secondSection?.sectors ?? [];

      const sectorsById = new Map<string, any>(
        allSectors.map((s: any) => [String(s._id), s]),
      );
      const divisionsById = new Map<string, any>();
      allItems.forEach((p: any) => {
        if (p.division && typeof p.division === "object") {
          divisionsById.set(String(p.division._id), p.division);
        }
      });

      const normalizedItems = allItems.map((p: any) => ({
        ...p,
        division:
          p.division && typeof p.division === "object"
            ? p.division._id
            : p.division,
      }));

      // Resolve every project (needed to score + pick related ones)
      const resolvedAll = resolveProjects(
        normalizedItems,
        allLocations,
        allStatuses,
        sectorsById,
        divisionsById,
      );

      const current = resolvedAll.find((p) => p.slug === slug);
      if (!current) throw new Error(`Project not found: ${slug}`);

      const relatedProjects: ProjectListItem[] = resolvedAll
        .filter((p) => p._id !== current._id && !p.isHidden)
        .map((p) => {
          let score = 0;
          if (p.sector?._id && p.sector._id === current.sector?._id) score += 1;
          if (p.division?._id && p.division._id === current.division?._id) score += 1;
          if (p.location?._id && p.location._id === current.location?._id) score += 1;
          return { p, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(({ p }) => ({
          _id: p._id,
          title: p.title,
          slug: p.slug,
          featured: p.featured,
          thumbImage: p.thumbImage,
          thumbImageAlt: p.thumbImageAlt,
          location: p.location,
          status: p.status,
          sector: p.sector,
          division: p.division,
        }));

      return JSON.parse(
        JSON.stringify({ ...current, relatedProjects }),
      );
    },
    ["Project-slug", slug],
    { tags: ["Project"] },
  )();
