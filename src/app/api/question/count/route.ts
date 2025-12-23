import { connect } from '@/config/dbConfig'
import Question from '@/model/questionModel'
import { NextRequest, NextResponse } from 'next/server'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await connect();
        
        // Get total count of questions
        const totalCount = await Question.countDocuments();
        
        return NextResponse.json(
            { totalCount },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0',
                },
            }
        )
    } catch (error: any) {
        console.error('Error fetching question count:', error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
    }
}

