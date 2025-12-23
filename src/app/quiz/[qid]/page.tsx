'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import axios from 'axios'
import dynamic from 'next/dynamic'
import useResult from '@/context/context'
import { SparklesCore } from '@/components/ui/sparkles'
import LogoutButton from '@/components/LogoutButton'

const LoadingSpinner = dynamic(() => import('@/components/Loading'), {
    loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
})

interface QuestionData {
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    answer: string;
}

const initialQuestion: QuestionData = {
    question: '',
    A: '',
    B: '',
    C: '',
    D: '',
    answer: ''
};

const initialColor = {
    A: 'bg-gray-100 hover:bg-violet-100',
    B: 'bg-gray-100 hover:bg-violet-100',
    C: 'bg-gray-100 hover:bg-violet-100',
    D: 'bg-gray-100 hover:bg-violet-100'
};

export default function Questions({ params }: {
    params: { qid: string }
}) {
    const { correct, wrong, addCorrect, addWrong, resetResults } = useResult()
    const [question, setQuestion] = useState<QuestionData>(initialQuestion);
    const [loading, setLoading] = useState<boolean>(true)
    const [nextButton, setNextButton] = useState<boolean>(true)
    const [color, setColor] = useState(initialColor)
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [totalQuestions, setTotalQuestions] = useState<number>(0)
    
    // Reset results when starting a new quiz (question 1)
    useEffect(() => {
        if (params.qid === '1') {
            resetResults();
        }
    }, [params.qid, resetResults]);
    
    // Fetch total question count
    useEffect(() => {
        const getTotalCount = async () => {
            try {
                const response = await axios.get('/api/question/count');
                setTotalQuestions(response.data.totalCount || 0);
            } catch (error) {
                console.error('Error fetching question count:', error);
            }
        };
        getTotalCount();
    }, []);
    
    useEffect(() => {
        let isMounted = true;
        const getQuestionData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/question?id=${params.qid}`);
                if (isMounted) {
                    const data = response.data;
                    setQuestion(data.question);
                    setLoading(false)
                    setButtonDisabled(false)
                    setNextButton(true)
                    setColor(initialColor)
                }
            } catch (error) {
                console.error('Error fetching question data:', error);
                if (isMounted) {
                    setLoading(false)
                    // If question not found, redirect to finish
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        // Question doesn't exist, treat as last question
                    }
                }
            }
        };
        getQuestionData();
        
        return () => {
            isMounted = false;
        };
    }, [params.qid]);
    
    const handleAnswer = useCallback((answerClicked: string[]) => {
        const key = answerClicked[1] as 'A' | 'B' | 'C' | 'D';
        // Fix: Compare the key (A, B, C, D) with question.answer, not the option text
        const isCorrect = key === question.answer;
        
        if (isCorrect) {
            addCorrect();
        } else {
            addWrong();
        }
        
        // Fix: Compare question.answer with the key ('A', 'B', 'C', 'D'), not with option text
        const newColor = {
            A: question.answer === 'A' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400',
            B: question.answer === 'B' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400',
            C: question.answer === 'C' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400',
            D: question.answer === 'D' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'
        };
        
        // Highlight the selected wrong answer in violet
        if (!isCorrect) {
            newColor[key] = 'bg-violet-500 hover:bg-violet-400';
        }
        
        setColor(newColor);
        setButtonDisabled(true);
        setNextButton(false);
    }, [question, addCorrect, addWrong]);
    
    const currentQuestionNum = Number(params.qid);
    const nextQuestionId = useMemo(() => currentQuestionNum + 1, [currentQuestionNum]);
    const isLastQuestion = useMemo(() => {
        // If totalQuestions is 0, we haven't loaded it yet, so check if next question exists
        if (totalQuestions === 0) {
            return false; // Wait for count to load
        }
        return currentQuestionNum >= totalQuestions;
    }, [currentQuestionNum, totalQuestions]);
    
    const displayTotal = totalQuestions > 0 ? totalQuestions : '?';
    return (
        <>
            {loading && <LoadingSpinner />}
            <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden py-10 px-4">
                {/* Logout Button - Top Right */}
                <div className="absolute top-4 right-4 z-30">
                    <LogoutButton />
                </div>
                
                {/* Sparkles Background */}
                <div className="w-full absolute inset-0 h-screen">
                    <SparklesCore
                        id="quiz-sparkles"
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
                
                {/* Content */}
                <div className="bg-white rounded-lg p-8 shadow-xl max-w-lg mx-auto relative z-10 w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Quiz Question {params.qid}</h2>
                    <span className="text-sm text-gray-500">{params.qid}/{displayTotal}</span>
                </div>
                <div className="mb-4 text-sm text-gray-600">
                    <span className="font-semibold text-green-600">Correct: {correct}</span>
                    <span className="mx-4">|</span>
                    <span className="font-semibold text-red-600">Wrong: {wrong}</span>
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
                    {nextButton ? (
                        <button disabled className="bg-gray-400 text-white py-2 px-6 rounded-lg font-semibold cursor-not-allowed">
                            Answer to continue
                        </button>
                    ) : isLastQuestion || (totalQuestions > 0 && nextQuestionId > totalQuestions) ? (
                        <Link href="/quiz/finish" className="bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600 transition inline-block">
                            Finish Quiz
                        </Link>
                    ) : (
                        <Link href={`/quiz/${nextQuestionId}`} className="bg-violet-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-violet-600 transition inline-block">
                            Next Question
                        </Link>
                    )}
                </div>
                </div>
            </div>
        </>
    );
}