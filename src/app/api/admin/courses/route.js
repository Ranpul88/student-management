import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import Course from "@/models/Course";

export async function POST(req){
    await connectDB()

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
            { message: "Error creating courses", error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(req){
    await connectDB()

    try {
        const courses = await Course.find({})
        return NextResponse.json(courses, { status: 200 })
    }catch(error){
        return NextResponse.json(
            { message: "Error fetching courses", error: error.message },
            { status: 500 }
        )
    }
}

export async function PUT(req){
    await connectDB()

    try {
        const data = await req.json()

        await Course.updateOne({ courseID: data.courseName }, { $set: {  description: data.description, mode: data.mode, delivery: data.delivery, entryRequirements: data.entryRequirements, intakes: data.intakes, availability: data.availability} })
        return NextResponse.json( { message: "Course updated successfully" }, { status: 200 } )
    } catch (error) {
        
    }
}