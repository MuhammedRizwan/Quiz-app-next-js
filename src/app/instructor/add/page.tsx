'use client'
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'


export default function addQuestion() {
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
    setQuestionData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const createQuestion = async () => {
    const response = await axios.post('/api/instructor/add', questionData)
    toast.success('question added')
    router.push('/instructor')
  }
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg h-3/4 m-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add Question</h2>
      </div>
      <form>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-red-700" htmlFor="question">
            Question:
          </label>
          <input
            value={questionData.question}
            onChange={handle}
            name='question'
            id="question"
            type="text"
            placeholder="Enter your question"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-green-500" htmlFor="answer">
            Answer:
          </label>
          <input
            value={questionData.answer}
            onChange={handle}
            name='answer'
            id="answer"
            type="text"
            placeholder="Enter your answer"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="option1">
              Option 1:
            </label>
            <input
              value={questionData.A}
              onChange={handle}
              name="A"
              id="option1"
              type="text"
              placeholder="Enter option 1"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="option2">
              Option 2:
            </label>
            <input
              value={questionData.B}
              onChange={handle}
              name="B"
              id="option2"
              type="text"
              placeholder="Enter option 2"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="option3">
              Option 3:
            </label>
            <input
              value={questionData.C}
              onChange={handle}
              name='C'
              id="option3"
              type="text"
              placeholder="Enter option 3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="option4">
              Option 4:
            </label>
            <input
              value={questionData.D}
              onChange={handle}
              name="D"
              id="option4"
              type="text"
              placeholder="Enter option 4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
        <button
          onClick={createQuestion}
          type="button"
          className="w-full py-3 bg-violet-500 text-white font-bold rounded-lg hover:bg-violet-600 transition duration-300 ease-in-out"
        >
          Add Question
        </button>
      </form>
    </div>

  )
}