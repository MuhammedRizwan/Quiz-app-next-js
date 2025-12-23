'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { SparklesCore } from '@/components/ui/sparkles'
import axios from 'axios'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'
import LogoutButton from '@/components/LogoutButton'

const LoadingSpinner = dynamic(() => import('@/components/Loading'), {
    loading: () => null
})

interface Question {
    _id: string;
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    answer: string;
    createdAt: string;
}

export default function instructorPage() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    
    const fetchQuestions = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/question/all')
            setQuestions(response.data.questions || [])
        } catch (error: any) {
            console.error('Error fetching questions:', error)
            toast.error('Failed to load questions')
        } finally {
            setLoading(false)
        }
    }, [])
    
    useEffect(() => {
        fetchQuestions()
    }, [fetchQuestions])
    
    const handleDelete = async (questionId: string) => {
        if (!confirm('Are you sure you want to delete this question?')) {
            return
        }
        
        try {
            await axios.delete(`/api/question/delete?id=${questionId}`)
            toast.success('Question deleted successfully')
            // Refresh the list
            fetchQuestions()
        } catch (error: any) {
            console.error('Error deleting question:', error)
            toast.error(error.response?.data?.error || 'Failed to delete question')
        }
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
                    id="instructor-sparkles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={1}
                />
            </div>
            
            {/* Content */}
            <div className="bg-white rounded-lg p-6 shadow-lg relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Questions List</h2>
                    <Link href="/instructor/add" className="bg-violet-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-violet-600 transition text-sm">
                        Add Question
                    </Link>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <LoadingSpinner />
                    </div>
                ) : questions.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No questions found</p>
                        <Link href="/instructor/add" className="inline-block mt-4 bg-violet-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-violet-600 transition text-sm">
                            Add Your First Question
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {questions.map((q, index) => (
                            <div key={q._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-violet-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                #{index + 1}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(q.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-800 mb-3">{q.question}</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className={`p-2 rounded ${q.answer === 'A' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
                                                <span className="font-semibold">A:</span> {q.A}
                                                {q.answer === 'A' && <span className="ml-2 text-green-600 font-bold">✓</span>}
                                            </div>
                                            <div className={`p-2 rounded ${q.answer === 'B' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
                                                <span className="font-semibold">B:</span> {q.B}
                                                {q.answer === 'B' && <span className="ml-2 text-green-600 font-bold">✓</span>}
                                            </div>
                                            <div className={`p-2 rounded ${q.answer === 'C' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
                                                <span className="font-semibold">C:</span> {q.C}
                                                {q.answer === 'C' && <span className="ml-2 text-green-600 font-bold">✓</span>}
                                            </div>
                                            <div className={`p-2 rounded ${q.answer === 'D' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
                                                <span className="font-semibold">D:</span> {q.D}
                                                {q.answer === 'D' && <span className="ml-2 text-green-600 font-bold">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(q._id)}
                                        className="ml-4 bg-red-500 text-white py-1.5 px-3 rounded text-xs font-semibold hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}