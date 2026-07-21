import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Sector from "@/app/models/Sector";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const updated = await Sector.findOneAndUpdate(
      {},
      { $push: { "secondSection.sectors": body } },
      { upsert: true, new: true },
    );

    revalidateTag("Sector", "default");

    const sector =
      updated.secondSection.sectors[updated.secondSection.sectors.length - 1];

    return NextResponse.json(
      { data: sector, message: "Sector created successfully" },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}