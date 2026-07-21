import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const doc = await Gallery.findOne(
      { "items._id": id },
      { "items.$": 1 },
    );

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { data: doc.items[0], message: "Item fetched successfully" },
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
      setObj[`items.$[item].${key}`] = body[key];
    }

    const updated = await Gallery.findOneAndUpdate(
      { "items._id": id },
      { $set: setObj },
      { new: true, arrayFilters: [{ "item._id": id }] },
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    revalidateTag("Gallery", "default");

    const item = updated.items.find(
      (i: { _id: { toString: () => string } }) => i._id.toString() === id,
    );

    return NextResponse.json(
      { data: item, message: "Item updated successfully" },
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
      { $pull: { items: { _id: id } } },
      { new: true },
    );

    revalidateTag("Gallery", "default");

    return NextResponse.json(
      { data: updated, message: "Item deleted successfully" },
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