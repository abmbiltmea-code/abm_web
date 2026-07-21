import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/app/models/News";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const doc = await News.findOne({ "items._id": id }, { "items.$": 1 });

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { data: doc.items[0], message: "News item fetched successfully" },
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

    const updated = await News.findOneAndUpdate(
      { "items._id": id },
      { $set: setObj },
      { new: true, arrayFilters: [{ "item._id": id }] },
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    revalidateTag("News", "default");

    const item = updated.items.find(
      (i: { _id: { toString: () => string } }) => i._id.toString() === id,
    );

    return NextResponse.json(
      { data: item, message: "News item updated successfully" },
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
      { $pull: { items: { _id: id } } },
      { new: true },
    );

    revalidateTag("News", "default");

    return NextResponse.json(
      { data: updated, message: "News item deleted successfully" },
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