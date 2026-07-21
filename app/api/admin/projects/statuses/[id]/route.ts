import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Projects";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

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

    const updated = await Project.findOneAndUpdate(
      { "statuses._id": id },
      { $set: { "statuses.$[st].title": body.title } },
      { new: true, arrayFilters: [{ "st._id": id }] },
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    revalidateTag("Project", "default");

    const status = updated.statuses.find(
      (s: { _id: { toString: () => string } }) => s._id.toString() === id,
    );

    return NextResponse.json(
      { data: status, message: "Status updated successfully" },
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

    const updated = await Project.findOneAndUpdate(
      {},
      { $pull: { statuses: { _id: id } } },
      { new: true },
    );

    await Project.updateOne(
      {},
      { $set: { "items.$[item].status": null } },
      { arrayFilters: [{ "item.status": id }] },
    );

    revalidateTag("Project", "default");

    return NextResponse.json(
      { data: updated, message: "Status deleted successfully" },
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