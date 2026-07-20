import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Careers from "@/app/models/Careers";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const doc = await Careers.findOne(
      { "thirdSection.jobs._id": id },
      { "thirdSection.jobs.$": 1 },
    );

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { data: doc.thirdSection.jobs[0], message: "Job fetched successfully" },
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
      setObj[`thirdSection.jobs.$[job].${key}`] = body[key];
    }

    const updated = await Careers.findOneAndUpdate(
      { "thirdSection.jobs._id": id },
      { $set: setObj },
      { new: true, arrayFilters: [{ "job._id": id }] },
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    revalidateTag("Careers", "default");

    const job = updated.thirdSection.jobs.find(
      (j: { _id: { toString: () => string } }) => j._id.toString() === id,
    );

    return NextResponse.json(
      { data: job, message: "Job updated successfully" },
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

    const updated = await Careers.findOneAndUpdate(
      {},
      { $pull: { "thirdSection.jobs": { _id: id } } },
      { new: true },
    );

    revalidateTag("Careers", "default");

    return NextResponse.json(
      { data: updated, message: "Job deleted successfully" },
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
