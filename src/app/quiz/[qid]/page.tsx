'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import LoadingSpinner from '@/components/Loading'
import { useResult } from '@/context/context'

export default function questions({ params }: {
    params: { qid: string }
}) {
    const { correct, wrong, addCorrect, addWrong } = useResult()
    const [question, setQuestion] = useState({
        question: '',
        A: '',
        B: '',
        C: '',
        D: '',
        answer: ''
    });
    const [loading, setLoading] = useState<boolean>(true)
    const [nextButton, setNextButton] = useState<boolean>(true)
    const [color, setColor] = useState({
        A: 'bg-gray-100 hover:bg-violet-100',
        B: 'bg-gray-100 hover:bg-violet-100',
        C: 'bg-gray-100 hover:bg-violet-100',
        D: 'bg-gray-100 hover:bg-violet-100'
    })
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    useEffect(() => {
        const getQuestionData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/question?id=${params.qid}`);
                const data = response.data;
                setLoading(false)
                setQuestion(data.question);
            } catch (error) {
                console.error('Error fetching question data:', error);
            }
        };
        getQuestionData();
    }, [params.qid]);
    const handleAnswer = (answerClicked: string[]) => {
        const key = answerClicked[1];
        answerClicked[0] == question.answer ? addCorrect() : addWrong();
        setColor({
            A: question.answer === question.A ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400',
            B: question.answer === question.B ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400',
            C: question.answer === question.C ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400',
            D: question.answer === question.D ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'
        });
        if (answerClicked[0] !== question.answer) {
            setColor((prevColor) => ({
                ...prevColor,
                [key]: 'bg-violet-500 hover:bg-violet-400'
            }));
        }
        setButtonDisabled(true)
        setNextButton(false)
    };
    return (
        <>
            {loading && <LoadingSpinner />}
            <div className="bg-white rounded-lg p-8 shadow-xl h-3/4 m-10 max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Quiz Question {params.qid}</h2>
                    <span className="text-sm text-gray-500">{params.qid}/10</span>
                </div>
                <div>
                    corroct:{correct}
                    wrong:{wrong}
                </div>
                <div className="mb-8">
                    <p className="text-lg font-medium text-gray-700 mb-4">{question.question}</p>
                    <div className="space-y-4">
                        <button onClick={() => { handleAnswer([question.A, 'A']) }} className={`w-full text-left flex items-center p-4 rounded-lg cursor-pointer  ${color.A}`} disabled={buttonDisabled} >
                            <span className="font-semibold text-gray-800">A)</span>
                            <p className="ml-2 text-gray-700">{question.A}</p>
                        </button>
                        <button onClick={() => { handleAnswer([question.B, 'B']) }} className={`w-full text-left flex items-center p-4 rounded-lg cursor-pointer  ${color.B}`} disabled={buttonDisabled} >
                            <span className="font-semibold text-gray-800">B)</span>
                            <p className="ml-2 text-gray-700">{question.B}</p>
                        </button>
                        <button onClick={() => { handleAnswer([question.C, 'C']) }} className={`w-full text-left flex items-center p-4 rounded-lg cursor-pointer  ${color.C}`} disabled={buttonDisabled} >
                            <span className="font-semibold text-gray-800">C)</span>
                            <p className="ml-2 text-gray-700">{question.C}</p>
                        </button>
                        <button onClick={() => { handleAnswer([question.D, 'D']) }} className={`w-full text-left flex items-center p-4 rounded-lg cursor-pointer  ${color.D}`} disabled={buttonDisabled} >
                            <span className="font-semibold text-gray-800">D)</span>
                            <p className="ml-2 text-gray-700">{question.D}</p>
                        </button>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="bg-violet-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-violet-600 transition">
                        {nextButton ? (
                            <span>Next Question</span>
                        ) : (
                            <Link href={`/quiz/${Number(params.qid) + 1}`}>Next Question</Link>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}