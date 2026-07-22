import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Sector from "@/app/models/Sector";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const doc = await Sector.findOne(
      { "secondSection.sectors._id": id },
      { "secondSection.sectors.$": 1 },
    );

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        data: doc.secondSection.sectors[0],
        message: "Sector fetched successfully",
      },
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const setObj: Record<string, unknown> = {};
    for (const key of Object.keys(body)) {
      setObj[`secondSection.sectors.$[sector].${key}`] = body[key];
    }

    const updated = await Sector.findOneAndUpdate(
      { "secondSection.sectors._id": id },
      { $set: setObj },
      { new: true, arrayFilters: [{ "sector._id": id }] },
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    revalidateTag("Sector", "default");
    revalidateTag("Home", "default");
    revalidateTag("Project", "default");

    const sector = updated.secondSection.sectors.find(
      (s: { _id: { toString: () => string } }) => s._id.toString() === id,
    );

    return NextResponse.json(
      { data: sector, message: "Sector updated successfully" },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const updated = await Sector.findOneAndUpdate(
      {},
      { $pull: { "secondSection.sectors": { _id: id } } },
      { new: true },
    );

    revalidateTag("Sector", "default");
    revalidateTag("Home", "default");
    revalidateTag("Project", "default");

    return NextResponse.json(
      { data: updated, message: "Sector deleted successfully" },
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