import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export default function proxy(req) {
    const { pathname } = req.nextUrl

    if(pathname.startsWith('/admin')){
        const token = req.cookies.get('token')?.value
        const user = jwt.verify(token, process.env.JWT_SECRET)

        if(!token && user.role !== 'admin'){
            return NextResponse.redirect(new URL('/auth/login?error:', req.url))
        }


        if(user.role !== 'admin'){
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}