'use client'

import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import { SparklesCore } from '@/components/ui/sparkles'
import LogoutButton from '@/components/LogoutButton'


export default function AddQuestion() {
  const router = useRouter()
  const [questionData, setQuestionData] = useState({
    question: '',
    answer: '',
    A: '',
    B: '',
    C: '',
    D: ''
  })
  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Auto-uppercase for answer field
    const processedValue = name === 'answer' ? value.toUpperCase().trim() : value
    setQuestionData((prev) => ({
      ...prev,
      [name]: processedValue
    }))
  }

  const createQuestion = async () => {
    try {
      // Validate all fields are filled
      if (!questionData.question || !questionData.answer || !questionData.A || !questionData.B || !questionData.C || !questionData.D) {
        toast.error('All fields are required')
        return
      }
      
      // Validate answer is A, B, C, or D
      const answerUpper = questionData.answer.toUpperCase().trim()
      if (!['A', 'B', 'C', 'D'].includes(answerUpper)) {
        toast.error('Answer must be A, B, C, or D')
        return
      }
      
      await axios.post('/api/instructor/add', {
        ...questionData,
        answer: answerUpper
      })
      toast.success('Question added successfully')
      // Reset form
      setQuestionData({
        question: '',
        answer: '',
        A: '',
        B: '',
        C: '',
        D: ''
      })
      router.push('/instructor')
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message || 'Failed to add question')
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
          id="add-question-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00ff00"
          speed={0.5}
        />
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-lg p-8 shadow-lg relative z-10 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Question</h2>
        </div>
      <form>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-sm text-red-700" htmlFor="question">
            Question:
          </label>
          <input
            value={questionData.question}
            onChange={handle}
            name='question'
            id="question"
            type="text"
            placeholder="Enter your question"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-sm text-green-500" htmlFor="answer">
            Answer (A, B, C, or D):
          </label>
          <input
            value={questionData.answer}
            onChange={handle}
            name='answer'
            id="answer"
            type="text"
            placeholder="Enter answer (A, B, C, or D)"
            maxLength={1}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm uppercase"
            style={{ textTransform: 'uppercase' }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm" htmlFor="option1">
              Option 1:
            </label>
            <input
              value={questionData.A}
              onChange={handle}
              name="A"
              id="option1"
              type="text"
              placeholder="Enter option 1"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm" htmlFor="option2">
              Option 2:
            </label>
            <input
              value={questionData.B}
              onChange={handle}
              name="B"
              id="option2"
              type="text"
              placeholder="Enter option 2"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm" htmlFor="option3">
              Option 3:
            </label>
            <input
              value={questionData.C}
              onChange={handle}
              name='C'
              id="option3"
              type="text"
              placeholder="Enter option 3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm" htmlFor="option4">
              Option 4:
            </label>
            <input
              value={questionData.D}
              onChange={handle}
              name="D"
              id="option4"
              type="text"
              placeholder="Enter option 4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>
        </div>
        <button
          onClick={createQuestion}
          type="button"
          className="w-full py-2.5 bg-violet-500 text-white text-sm font-bold rounded-lg hover:bg-violet-600 transition duration-300 ease-in-out"
        >
          Add Question
        </button>
      </form>
      </div>
    </div>

  )
}