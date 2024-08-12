import { connect } from "@/config/dbConfig";
import Question from "@/model/questionModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req:NextRequest){
    try {
        const reqBody=await req.json()
        const {question,A,B,C,D,answer}=reqBody
        const isExistingQ=await Question.findOne({question})  
        if(isExistingQ){
            return NextResponse.json({error:"Question already exist"},{status:400})
        }
        const newQuestion=new Question({
            question,answer,A,B,C,D
        })
        const questionData=await newQuestion.save()
        if(!questionData){
            return NextResponse.json({error:"something went wroung"},{status:400})
        }
        return NextResponse.json({message:"Question added successfully"},{status:201})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}

