import { connectDB } from "@/lib/mongoDB";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req){
    connectDB()

    try {
        const lecturers = await Users.find({ role: "lecturer" })
        return NextResponse.json(lecturers, { status: 200 })
    }catch(error){
        return NextResponse.json(
            { message: "Error fetching lecturers", error: message.error },
            { status: 500 }
        )
    }
}