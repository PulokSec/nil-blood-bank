import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import DonarList from "@/models/donarModel";



connectDB()

export async function GET(request:NextRequest){

    try {
        const donarData = await DonarList
                .find({ role: "donar" })
                .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            Toatlcount: donarData.length,
            message: "Donar List Fetched Successfully",
            donarData,

        },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}