import { connectDB } from "@/lib/mongoDB";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export async function POST(req){
    await connectDB()

    try {
        const data = await req.json()
    
        const event = new Event(data)
        await event.save()
        return NextResponse.json(
            { message: "event saved successfully" },
            { status: 201 }
        )
    }catch(error){
        return NextResponse.json(
            { message: "Error saving event", error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(req){
    await connectDB()

    try {
        const today = new Date().toISOString().split('T')[0]

        const events = await Event.find({ date: { $gte: today } }).sort({ date: 1, time: 1 })
        return NextResponse.json( events, { status: 200 } )
        
    }catch(error){
        return NextResponse.json(
            { message: "Error fetching events", error: error.message },
            { status: 500 }
        )
    }
}