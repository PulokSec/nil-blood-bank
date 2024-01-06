import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import DonarList from "@/models/donarModel";

connectDB()

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    // Use a regular expression for partial search
    const result = await DonarList.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // case-insensitive
        { address: { $regex: query, $options: "i" } },
        { bloodGroup: { $regex: query, $options: "i" } },
        { lastDonated: { $regex: query, $options: "i" } },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Search successful",
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Something wrong with Search API",
        error: error.message,
      },
      { status: 500 }
    );
  }
}