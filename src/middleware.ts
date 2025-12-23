import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'
    const token = req.cookies.get('token')?.value || ''
    
    // Validate token and get user info
    let decodedToken: any = null
    if (token) {
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string; role?: string }
        } catch (error) {
            // Invalid token, treat as no token
            decodedToken = null
        }
    }
    
    // If user has valid token and tries to access home page, redirect based on role
    if (path === '/' && decodedToken) {
        if (decodedToken.role === 'instructor') {
            return NextResponse.redirect(new URL('/instructor', req.nextUrl))
        } else {
            // Default to quiz for students
            return NextResponse.redirect(new URL('/quiz/1', req.nextUrl))
        }
    }
    
    // If user has valid token and tries to access public pages, redirect to appropriate page
    if (isPublicPath && decodedToken) {
        if (decodedToken.role === 'instructor') {
            return NextResponse.redirect(new URL('/instructor', req.nextUrl))
        } else {
            return NextResponse.redirect(new URL('/quiz/1', req.nextUrl))
        }
    }
    
    // If user doesn't have token and tries to access protected pages, redirect to login
    if (!isPublicPath && path !== '/' && !decodedToken) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    
    // Allow the request to continue
    return NextResponse.next()
}
export const config = {
    matcher: [
        '/',
        '/signup',
        '/login'
    ]
};