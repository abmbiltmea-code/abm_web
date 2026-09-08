import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Projects";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function PATCH(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { order } = (await request.json()) as { order: string[] };

    if (!Array.isArray(order) || order.length === 0) {
      return NextResponse.json({ message: "Invalid order" }, { status: 400 });
    }

    const doc = await Project.findOne({});
    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const itemsById = new Map(
      doc.items.map((item: { _id: { toString: () => string } }) => [
        item._id.toString(),
        item,
      ]),
    );

    if (
      order.length !== itemsById.size ||
      new Set(order).size !== order.length ||
      !order.every((id) => itemsById.has(id))
    ) {
      return NextResponse.json(
        { message: "Order does not match existing items" },
        { status: 400 },
      );
    }

    doc.items = order.map((id) => itemsById.get(id));
    await doc.save();

    revalidateTag("Project", "default");
    revalidateTag("Home", "default");

    return NextResponse.json(
      { data: doc.items, message: "Projects reordered successfully" },
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
