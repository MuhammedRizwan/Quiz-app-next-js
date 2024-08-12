import { connect } from '@/config/dbConfig'
import User from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        console.log(reqBody);
        const { userName, email, password} = reqBody
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "user already exit" }, { status: 400 })
        }
        const salt =await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt)
        const newUser=new User({
            userName,
            email,
            password:hashedPassword,
            role:'instructor'
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