import { connectDB } from "@/lib/mongoDB"

export async function GET(req){
    await connectDB()

    try {
        const course = await Course.findOne({ courseName: req.params.courseName })
        return NextResponse.json(course, { status: 200 })
    }catch(error){
        return NextResponse.json(
            { message: "Error fetching course", error: error.message },
            { status: 500 }
        )
    }
}