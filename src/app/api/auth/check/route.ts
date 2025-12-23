import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value || ''
        
        if (!token) {
            return NextResponse.json({ isLoggedIn: false })
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string; role?: string }
            return NextResponse.json({ 
                isLoggedIn: true,
                role: decoded.role || 'student'
            })
        } catch (error) {
            return NextResponse.json({ isLoggedIn: false })
        }
    } catch (error: any) {
        return NextResponse.json({ isLoggedIn: false })
    }
}

