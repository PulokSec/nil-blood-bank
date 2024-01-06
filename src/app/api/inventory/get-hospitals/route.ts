import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";
import Inventory from "@/models/inventoryModel";

connectDB()

export async function GET(request:NextRequest){

    try {
        const organisation = await getDataFromToken(request);

    /* ---------------------- Donar related to organisation --------------------- */
      const hospitalId = await Inventory.distinct("hospital", {
        organisation,
      });

      const hospitals = await User.find({ _id: { $in: hospitalId } });
  
      return NextResponse.json({
        success: true,
        message: "Hospital Record Fetched Successfully",
        hospitals,
      },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}
