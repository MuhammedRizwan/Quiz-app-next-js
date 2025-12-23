import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })
        
        // Clear the token cookie
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        
        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

