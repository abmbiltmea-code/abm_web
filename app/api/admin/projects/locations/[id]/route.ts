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
      { "locations._id": id },
      { $set: { "locations.$[loc].title": body.title } },
      { new: true, arrayFilters: [{ "loc._id": id }] },
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    revalidateTag("Project", "default");
        revalidateTag("Home", "default");

    const location = updated.locations.find(
      (l: { _id: { toString: () => string } }) => l._id.toString() === id,
    );

    return NextResponse.json(
      { data: location, message: "Location updated successfully" },
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
      { $pull: { locations: { _id: id } } },
      { new: true },
    );

    await Project.updateOne(
      {},
      { $set: { "items.$[item].location": null } },
      { arrayFilters: [{ "item.location": id }] },
    );

    revalidateTag("Project", "default");
        revalidateTag("Home", "default");

    return NextResponse.json(
      { data: updated, message: "Location deleted successfully" },
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