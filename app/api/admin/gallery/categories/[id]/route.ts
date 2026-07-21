import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
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

    const updated = await Gallery.findOneAndUpdate(
      { "categories._id": id },
      { $set: { "categories.$[cat].title": body.title } },
      { new: true, arrayFilters: [{ "cat._id": id }] },
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    revalidateTag("Gallery", "default");

    const category = updated.categories.find(
      (c: { _id: { toString: () => string } }) => c._id.toString() === id,
    );

    return NextResponse.json(
      { data: category, message: "Category updated successfully" },
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

    const updated = await Gallery.findOneAndUpdate(
      {},
      { $pull: { categories: { _id: id } } },
      { new: true },
    );

    // Unset the category on any items that referenced the deleted category
    await Gallery.updateOne(
      {},
      { $set: { "items.$[item].category": null } },
      { arrayFilters: [{ "item.category": id }] },
    );

    revalidateTag("Gallery", "default");

    return NextResponse.json(
      { data: updated, message: "Category deleted successfully" },
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