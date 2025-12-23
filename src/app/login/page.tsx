'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import LoginForm from "@/components/LoginForm"
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast/headless'
import axios from 'axios'
import InstructorLoginForm from '@/components/InstructorLoginForm'
import { SparklesCore } from '@/components/ui/sparkles'

const LoadingSpinner = dynamic(() => import('@/components/Loading'), {
    loading: () => null
})
 
export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [loginAs, setLoginAs] = useState<'student'|'instructor'>('student')
    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    
    const onLogin = useCallback(async () => {
        try {    
            const endPoint = loginAs === 'student' ? '/api/user/login' : '/api/instructor/login'
            setLoading(true)
            await axios.post(endPoint, user)
            
            if(loginAs === 'student'){
                toast.success('Login success')
                router.push('/')
            } else {
                toast.success('Instructor login success')
                router.push('/instructor')
            } 
        } catch (error: any) {
            toast.error(error.response?.data?.error || error.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }, [user, loginAs, router])
    
    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0))
    }, [user.email, user.password])
    
    const isStudent = useMemo(() => loginAs === 'student', [loginAs])
    return (
        <>
        {loading && <LoadingSpinner />}
        <div className="flex w-full h-screen overflow-hidden bg-black">
            <div className='w-full flex items-center justify-center lg:w-1/2 overflow-y-auto py-4 px-4 relative z-10'>
                {isStudent ? (
                    <LoginForm user={user} setUser={setUser} onLogin={onLogin} buttonDisabled={buttonDisabled} setLoginAs={setLoginAs} />
                ) : (
                    <InstructorLoginForm user={user} setUser={setUser} onLogin={onLogin} buttonDisabled={buttonDisabled} setLoginAs={setLoginAs} />
                )}
            </div>
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center overflow-hidden">
                <div className="w-full absolute inset-0 h-screen">
                    <SparklesCore
                        id="login-sparkles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                        speed={1}
                    />
                </div>
                <div className="relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
                    <p className="text-gray-300">Continue your learning journey</p>
                </div>
            </div>
        </div>
        </>
    )
}