'use client'
import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useResult from '@/context/context'
import { SparklesCore } from '@/components/ui/sparkles'
import LogoutButton from '@/components/LogoutButton'
import axios from 'axios'

export default function FinishPage() {
    const { correct, wrong, resetResults } = useResult()
    const router = useRouter()
    const [totalQuestions, setTotalQuestions] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch total question count
        const getTotalCount = async () => {
            try {
                const response = await axios.get('/api/question/count')
                setTotalQuestions(response.data.totalCount || 0)
            } catch (error) {
                console.error('Error fetching question count:', error)
            } finally {
                setLoading(false)
            }
        }
        getTotalCount()
    }, [])

    // Calculate statistics
    const totalAnswered = useMemo(() => correct + wrong, [correct, wrong])
    const percentage = useMemo(() => {
        if (totalAnswered === 0) return 0
        return Math.round((correct / totalAnswered) * 100)
    }, [correct, totalAnswered])

    const handleStartNewQuiz = () => {
        resetResults()
        router.push('/quiz/1')
    }

    const handleGoHome = () => {
        resetResults()
        router.push('/')
    }

    // Determine performance message
    const getPerformanceMessage = () => {
        if (totalAnswered === 0) return { message: 'No questions answered', color: 'text-gray-400' }
        if (percentage >= 90) return { message: 'Outstanding!', color: 'text-green-400' }
        if (percentage >= 75) return { message: 'Excellent!', color: 'text-green-300' }
        if (percentage >= 60) return { message: 'Good Job!', color: 'text-yellow-300' }
        if (percentage >= 50) return { message: 'Not Bad!', color: 'text-yellow-400' }
        return { message: 'Keep Practicing!', color: 'text-orange-400' }
    }

    const performance = getPerformanceMessage()

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center">
                <div className="text-white text-base">Loading results...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden py-10 px-4">
            {/* Logout Button - Top Right */}
            <div className="absolute top-4 right-4 z-30">
                <LogoutButton />
            </div>

            {/* Sparkles Background */}
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="finish-sparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-2xl max-w-md mx-auto relative z-10 w-full">
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                        Quiz Complete! 🎉
                    </h1>
                    <p className={`text-lg md:text-xl font-semibold ${performance.color} mb-2`}>
                        {performance.message}
                    </p>
                </div>

                {/* Score Circle */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                        <svg className="transform -rotate-90 w-full h-full">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                className="text-gray-200"
                            />
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
                                className={`transition-all duration-1000 ${
                                    percentage >= 75 ? 'text-green-500' :
                                    percentage >= 50 ? 'text-yellow-500' : 'text-red-500'
                                }`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl md:text-4xl font-bold text-gray-800">
                                {percentage}%
                            </span>
                            <span className="text-xs text-gray-500 mt-1">Score</span>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
                        <div className="text-2xl font-bold text-green-600 mb-1">{correct}</div>
                        <div className="text-xs font-semibold text-green-700">Correct Answers</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 text-center border-2 border-red-200">
                        <div className="text-2xl font-bold text-red-600 mb-1">{wrong}</div>
                        <div className="text-xs font-semibold text-red-700">Wrong Answers</div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="bg-gray-50 rounded-lg p-3 mb-6 text-center">
                    <div className="text-xl font-bold text-gray-800 mb-1">
                        {totalAnswered} / {totalQuestions}
                    </div>
                    <div className="text-xs text-gray-600">Questions Answered</div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={handleStartNewQuiz}
                        className="bg-violet-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-violet-600 transition shadow-md text-sm"
                    >
                        Start New Quiz
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600 transition shadow-md text-sm"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    )
}

