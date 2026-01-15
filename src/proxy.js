import { NextResponse } from "next/server"

export default function proxy(req) {
    const { pathname } = req.nextUrl

    if(pathname.startsWith('/admin')){
        const token = req.cookies.get('token')?.value

        if(!token){
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}