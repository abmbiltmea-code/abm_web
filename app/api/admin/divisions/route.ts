import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Division from "@/app/models/Divisions";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    const docs = await Division.find({}, { name: 1, isHidden: 1, slug: 1 }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { data: docs, message: "Divisions fetched successfully" },
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

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const created = await Division.create(body);

    revalidateTag("Division", "default");
    revalidateTag("Home", "default");

    return NextResponse.json(
      { data: created, message: "Division created successfully" },
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