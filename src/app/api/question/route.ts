import { connect } from '@/config/dbConfig'
import Question from '@/model/questionModel'
import { NextRequest, NextResponse } from 'next/server'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams
        const queryId = Math.floor(Number(searchParams.get('id')))
        
        if (queryId < 1 || isNaN(queryId)) {
            return NextResponse.json({ error: "Invalid question ID" }, { status: 400 })
        }

        // Use skip with lean() for better performance
        // For better performance with large datasets, consider using cursor-based pagination
        const question = await Question.findOne()
            .sort({ _id: 1 })
            .skip(queryId - 1)
            .lean()
            .exec();
        
        if (!question) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 })
        }

        // Cache headers for better performance
        return NextResponse.json(
            { question },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
                },
            }
        )
    } catch (error: any) {
        console.error('Error fetching question:', error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
    }
}
