import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import DonarList from "@/models/donarModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { id, updatedField } = await request.json();

    // Check if the ID is provided
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required for updating",
        },
        { status: 400 }
      );
    }

    // Check if the updatedField is provided
    if (!updatedField) {
      return NextResponse.json(
        {
          success: false,
          message: "Field to update is required",
        },
        { status: 400 }
      );
    }

    // Use findByIdAndUpdate to update the specific field
    const updatedDonar = await DonarList.findByIdAndUpdate(
      id,
      { $set: updatedField },
      { new: true } // Return the updated document
    );

    if (!updatedDonar) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User field updated successfully",
      updatedDonar,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Something wrong with Update API",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
