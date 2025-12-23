import { connect } from '@/config/dbConfig'
import User from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        await connect();
        const reqBody = await req.json()
        const { userName, email, password} = reqBody
        
        if (!userName || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }
        
        const user = await User.findOne({ email }).lean()
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }
        const salt =await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt)
        const newUser=new User({
            userName,
            email,
            password:hashedPassword,
            role:'student'
        })
        const savedUser=await newUser.save()
        return NextResponse.json({
            message:"user created successfully",
            success:true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}