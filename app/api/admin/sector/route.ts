import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Sector from "@/app/models/Sector";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    const doc = await Sector.findOne({});

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { data: doc, message: "Sectors page fetched successfully" },
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

    const updated = await Sector.findOneAndUpdate(
      {},
      {
        $set: {
          seo: body.seo,
          bannerSection: body.bannerSection,
          firstSection: body.firstSection,
          "secondSection.isHidden": body.secondSection?.isHidden,
          thirdSection: body.thirdSection,
          fourthSection: body.fourthSection,
          fifthSection: body.fifthSection,
        },
      },
      { upsert: true, new: true },
    );

    revalidateTag("Sector", "default");

    return NextResponse.json(
      { data: updated, message: "Sectors page updated successfully" },
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