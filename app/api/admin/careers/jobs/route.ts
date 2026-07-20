import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Careers from "@/app/models/Careers";
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

    const updated = await Careers.findOneAndUpdate(
      {},
      { $push: { "thirdSection.jobs": body } },
      { upsert: true, new: true },
    );

    revalidateTag("Careers", "default");

    const job =
      updated.thirdSection.jobs[updated.thirdSection.jobs.length - 1];

    return NextResponse.json(
      { data: job, message: "Job created successfully" },
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