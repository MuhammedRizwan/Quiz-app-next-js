import { connect } from "@/config/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody
        const user = await User.findOne({ email })
        console.log(user);
        
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 })
        }
        if (user.role != 'instructor') {
            return NextResponse.json({ error: 'Not an Instructor' }, { status: 400 })
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" })
        }
        const tokenData = {
            id: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" })
        const response = NextResponse.json({
            message: 'Instructor login successful',
            success: true
        })
        console.log(response);

        response.cookies.set('token', token, { httpOnly: true })
        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}