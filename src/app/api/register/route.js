import bcrypt from "bcrypt"
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB()

        const data = await req.json()

        const existingUser = await User.findOne({ email: data.email })

        if(existingUser){
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            )
        }

        let role

        if(data.email.endsWith('@lecturer.edu')){
            role = "lecturer"
        }else{
            role = "student"   
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = new User({
            firstName: data.name,
            lastName: data.name,
            email: data.email,
            password: hashedPassword,
            role: role
        })

        await user.save()
        return NextResponse.json(
            { message: "User created successfully" },
            { status: 200 }
        )

    }catch(error){
        return NextResponse.json(
            {
                message: "Unable to create user",
                error: error.message
            },
            { status: 500 }
        )
    }
}