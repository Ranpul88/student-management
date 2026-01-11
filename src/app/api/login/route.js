import User from "@/models/User"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongoDB"

export async function POST(req){
    connectDB()
    
    const { email, password } = await req.json()

    try {
        const user = await User.findOne({ email: email })

        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return NextResponse.json({ message: "Incorrect password" }, { status: 401 })
        }
        
        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isEmailVerified: user.isEmailVerified
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "150h" })
        

        const response = NextResponse.json(
            {
                message: "User logged in successfully",
                role: user.role
            },
            { status: 200 }
        )

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    }catch(error){
        return NextResponse.json(
            { message: "Error logging in", error: error.message },
            { status: 500 }
        )
    }
}