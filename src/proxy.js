import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export default function proxy(req) {
    const { pathname } = req.nextUrl

    if(pathname.startsWith('/admin')){
        const token = req.cookies.get('token')?.value
        
        if(!token){
            return NextResponse.redirect(new URL('/auth/login?error=login_required', req.url))
        }
        
        const user = jwt.verify(token, process.env.JWT_SECRET)

        if(user.role !== 'admin'){
            return NextResponse.redirect(new URL('/?error=unauthorized', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}