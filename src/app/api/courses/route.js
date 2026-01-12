import { connectDB } from "@/lib/mongoDB";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

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