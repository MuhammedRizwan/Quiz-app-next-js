import { connect } from "@/config/dbConfig";
import Question from "@/model/questionModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await connect();
        const reqBody=await req.json()
        const {question,A,B,C,D,answer}=reqBody
        
        if (!question || !A || !B || !C || !D || !answer) {
            return NextResponse.json({error:"All fields are required"},{status:400})
        }
        
        // Validate answer is one of the valid options
        if (!['A', 'B', 'C', 'D'].includes(answer.toUpperCase())) {
            return NextResponse.json({error:"Answer must be A, B, C, or D"},{status:400})
        }
        
        const isExistingQ=await Question.findOne({question}).lean()  
        if(isExistingQ){
            return NextResponse.json({error:"Question already exists"},{status:400})
        }
        const newQuestion=new Question({
            question,
            answer: answer.toUpperCase(),
            A,
            B,
            C,
            D
        })
        const questionData=await newQuestion.save()
        if(!questionData){
            return NextResponse.json({error:"Something went wrong"},{status:400})
        }
        return NextResponse.json({message:"Question added successfully"},{status:201})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}

