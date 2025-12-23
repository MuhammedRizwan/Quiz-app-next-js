import { connect } from '@/config/dbConfig'
import Question from '@/model/questionModel'
import { NextRequest, NextResponse } from 'next/server'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams
        const questionId = searchParams.get('id')
        
        if (!questionId) {
            return NextResponse.json({ error: "Question ID is required" }, { status: 400 })
        }
        
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        
        if (!deletedQuestion) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 })
        }
        
        return NextResponse.json(
            { message: "Question deleted successfully" },
            { status: 200 }
        )
    } catch (error: any) {
        console.error('Error deleting question:', error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
    }
}

