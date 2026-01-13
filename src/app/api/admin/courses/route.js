import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import Course from "@/models/Course";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req){
    connectDB()

    try {
        const data = await req.json()

        const existingCourse = await Course.findOne({ courseName: data.courseName })

        if(existingCourse){
            return NextResponse.json(
                { message: "Course already exists" },
                { status: 400 }
            )
        }

        const course = new Course(data)
        await course.save()
        return NextResponse.json(
            {message: "Course created successfully"},
            { status: 201 })
    }catch(error){
        return NextResponse.json(
            { message: "Error fetching courses", error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(req){
    connectDB()

    try {
        const session = await getServerSession(authOptions)

        if(!session || session.user.role !== "admin"){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const courses = await Course.find({})
        return NextResponse.json(courses, { status: 200 })
    }catch(error){
        return NextResponse.json(
            { message: "Error fetching courses", error: error.message },
            { status: 500 }
        )
    }
}