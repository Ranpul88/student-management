import bcrypt from "bcrypt"
import { connectDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import User from "@/models/User";

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
        let userID

        if(data.email.endsWith('@lecturer.edu')){
            role = "lecturer"
            userID = "LEC0001"
            const lastLecturer = await User.findOne({ role: "lecturer" }).sort({ createdAt: -1 })
            if(lastLecturer!=null){
                const lastUserIDNumber = (parseInt(lastLecturer.userID.replace("LEC", "")))
                const newUserID = "LEC" + (lastUserIDNumber + 1).toString().padStart(4, "0")
                userID = newUserID
            }

        }else{
            role = "student"
            userID = "STU0001"
            const lastStudent = await User.findOne({ role: "student" }).sort({ createdAt: -1 })
            if(lastStudent!=null){
                const lastUserIDNumber = (parseInt(lastStudent.userID.replace("STU", "")))
                const newUserID = "STU" + (lastUserIDNumber + 1).toString().padStart(4, "0")
                userID = newUserID
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        
        console.log(role)
        console.log(userID)

        const user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userID: userID,
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