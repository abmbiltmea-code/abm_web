import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/app/models/News";
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

    const updated = await News.findOneAndUpdate(
      { "categories._id": id },
      { $set: { "categories.$[cat].title": body.title } },
      { new: true, arrayFilters: [{ "cat._id": id }] },
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    revalidateTag("News", "default");

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

    const updated = await News.findOneAndUpdate(
      {},
      { $pull: { categories: { _id: id } } },
      { new: true },
    );

    await News.updateOne(
      {},
      { $set: { "items.$[item].category": null } },
      { arrayFilters: [{ "item.category": id }] },
    );

    revalidateTag("News", "default");

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
