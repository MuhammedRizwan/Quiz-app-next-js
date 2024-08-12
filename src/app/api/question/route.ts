import { connect } from '@/config/dbConfig'
import Question from '@/model/questionModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const query = Math.floor(Number(searchParams.get('id')))
        const question = await Question.findOne().skip(query-1).sort({ _id: 1 });                
        if (!question) {
            return NextResponse.json({ error: "something went wroung" }, { status: 400 })
        }
        return NextResponse.json({ question })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
