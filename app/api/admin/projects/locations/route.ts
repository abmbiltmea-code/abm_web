import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Projects";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const updated = await Project.findOneAndUpdate(
      {},
      { $push: { locations: body } },
      { upsert: true, new: true },
    );

    revalidateTag("Project", "default");
        revalidateTag("Home", "default");

    const location = updated.locations[updated.locations.length - 1];

    return NextResponse.json(
      { data: location, message: "Location created successfully" },
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