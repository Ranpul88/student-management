import { connectDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function GET(req){
    connectDB()

    try {
        const students = await User.find({ role: "student" })
        return NextResponse.json(students, { status: 200 })
    }catch(error){
        return NextResponse.json(
            { message: "Error fecthing students", error: error.message },
            { status: 500 }
        )
    }
}