'use client'
import Link from 'next/link'
import { SparklesCore } from '@/components/ui/sparkles'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios from 'axios'
import LogoutButton from '@/components/LogoutButton'

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check')
        setIsLoggedIn(response.data.isLoggedIn || false)
      } catch (error) {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Sparkles Background */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="home-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Logout Button - Top Right */}
      {!loading && isLoggedIn && (
        <div className="absolute top-4 right-4 z-30">
          <LogoutButton />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <h1 className="md:text-7xl text-4xl lg:text-9xl font-bold text-center text-white mb-8">
          Welcome to Mind Bender!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Practice makes a man perfect, and quizzes sharpen your mind. Let&apos;s get started on the path to perfection!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/quiz/1" className="inline-block bg-white text-black py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-violet-200 transition">
            Get Started
          </Link>
          {!loading && !isLoggedIn && (
            <button onClick={()=>router.push('/login')} className="inline-block bg-violet-500 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-violet-600 transition">
              Login
            </button>
          )}
        </div>
      </div>

      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-1/4" />
    </div>
  );
}
