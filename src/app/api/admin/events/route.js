import { connectDB } from "@/lib/mongoDB";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export async function POST(req){
    await connectDB()

    try {

        let eventID = "EVT0001"

        const lastEvent = await Event.findOne({}).sort({ createdAt: -1 })

        if(lastEvent!=null){
            const lastEventIDNumber = (parseInt(lastEvent.eventId.replace("EVT", "")))
            const newEventID = "EVT" + (lastEventIDNumber + 1).toString().padStart(4, "0")
            eventID = newEventID
        }

        const data = await req.json()
    
        const event = new Event({
            eventId: eventID,
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
            location: data.location
        })
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

export async function DELETE(req){
    await connectDB()

    try {
        const data = await req.json()
        await Event.deleteOne({ eventId: data.eventID })
        return NextResponse.json( { message: "Event deleted successfully" }, { status: 200 } )
    }catch(error){
        return NextResponse.json(
            { message: "Error deleting event", error: error.message },
            { status: 500 }
        )
    }
}