import { connect } from '@/config/dbConfig'
import Question from '@/model/questionModel'
import { NextRequest, NextResponse } from 'next/server'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await connect();
        
        // Fetch all questions sorted by creation date (newest first)
        const questions = await Question.find()
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        
        return NextResponse.json(
            { questions },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0',
                },
            }
        )
    } catch (error: any) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
    }
}

