import { connectDB } from "@/config/db";
import DonarList from "@/models/donarModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request:NextRequest){

    try {
        const reqBody = await request.json();
        // const userId = await getDataFromToken(request);

            /* ------------------------------- save blood record ------------------------------ */
        const donarList = new DonarList(reqBody);
        await donarList.save();
        return NextResponse.json({
        success: true,
        message: "New Blood Donar Record Added",
        },{status: 201});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}