import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Careers from "@/app/models/Careers";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    const doc = await Careers.findOne({});

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { data: doc, message: "Careers fetched successfully" },
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

    const updated = await Careers.findOneAndUpdate(
      {},
      {
        $set: {
          seo: body.seo,
          bannerSection: body.bannerSection,
          firstSection: body.firstSection,
          "secondSection.isHidden": body.secondSection?.isHidden,
          "secondSection.title": body.secondSection?.title,
          "secondSection.items": body.secondSection?.items,
          "thirdSection.isHidden": body.thirdSection?.isHidden,
          "thirdSection.title": body.thirdSection?.title,
          "thirdSection.subTitle": body.thirdSection?.subTitle,
          "thirdSection.description": body.thirdSection?.description,
          "thirdSection.mail": body.thirdSection?.mail,
        },
      },
      { upsert: true, new: true },
    );

    revalidateTag("Careers", "default");

    return NextResponse.json(
      { data: updated, message: "Careers page updated successfully" },
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