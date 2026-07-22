import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Home from "@/app/models/Home";
import Sector from "@/app/models/Sector";
import Project from "@/app/models/Projects";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    await connectDB();

    const doc = await Home.findOne({}).populate({
      path: "thirdSection.divisionIds",
      select: "name slug homePageSection",
    });

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const home = doc.toObject();
    const sectorDoc = await Sector.findOne({}, { "secondSection.sectors": 1 });
    const allSectors = sectorDoc?.secondSection?.sectors || [];
    const selectedIds = (home.fourthSection?.sectorIds || []).map(
      (id: unknown) => String(id),
    );
    home.fourthSection.sectors = allSectors.filter(
      (s: { _id: { toString: () => string } }) =>
        selectedIds.includes(s._id.toString()),
    );

    const projectDoc = await Project.findOne({}, { items: 1 });
    const allProjects = projectDoc?.items || [];
    home.sixthSection.featuredProjects = allProjects.filter(
      (p: { featured?: boolean; isHidden?: boolean }) =>
        p.featured && !p.isHidden,
    );

    return NextResponse.json(
      { data: home, message: "Home page fetched successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const updated = await Home.findOneAndUpdate(
      {},
      {
        $set: {
          seo: body.seo,
          firstSection: body.firstSection,
          secondSection: body.secondSection,
          "thirdSection.isHidden": body.thirdSection?.isHidden,
          "thirdSection.sectionLabel": body.thirdSection?.sectionLabel,
          "thirdSection.title": body.thirdSection?.title,
          "thirdSection.description": body.thirdSection?.description,
          "thirdSection.divisionIds": body.thirdSection?.divisionIds,
          "fourthSection.isHidden": body.fourthSection?.isHidden,
          "fourthSection.sectionLabel": body.fourthSection?.sectionLabel,
          "fourthSection.title": body.fourthSection?.title,
          "fourthSection.description": body.fourthSection?.description,
          "fourthSection.sectorIds": body.fourthSection?.sectorIds,
          fifthSection: body.fifthSection,
          "sixthSection.isHidden": body.sixthSection?.isHidden,
          "sixthSection.sectionLabel": body.sixthSection?.sectionLabel,
          "sixthSection.title": body.sixthSection?.title,
          "sixthSection.description": body.sixthSection?.description,
          "sixthSection.button": body.sixthSection?.button,
          seventhSection: body.seventhSection,
          eighthSection: body.eighthSection,
        },
      },
      { upsert: true, new: true },
    );

    revalidateTag("Home", "default");

    return NextResponse.json(
      { data: updated, message: "Home page updated successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
