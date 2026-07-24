import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CareerEnquiry from "@/app/models/CareerEnquiry";
import { verifyAdmin } from "@/lib/verifyAdmin";

// GET: list all applications, newest first
export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const docs = await CareerEnquiry.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { data: docs, message: "Applications fetched successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: bulk delete, body = { ids: string[] }
export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "No ids provided" }, { status: 400 });
    }

    const result = await CareerEnquiry.deleteMany({ _id: { $in: ids } });

    return NextResponse.json(
      { message: `${result.deletedCount} applications deleted successfully`, deletedCount: result.deletedCount },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}