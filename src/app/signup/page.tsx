"use client";
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import SignupForm from '@/components/SignupForm';
import toast from 'react-hot-toast';
import axios from 'axios';
import InstructorSignupForm from '@/components/InstructorSignupForm';
import { SparklesCore } from '@/components/ui/sparkles';

const LoadingSpinner = dynamic(() => import('@/components/Loading'), {
    loading: () => null
})

export default function SignupPage() {
    const router = useRouter();
    const [signupAs, setSignupAs] = useState<'student' | 'instructor'>('student')
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    
    const onSignup = useCallback(async () => {
        try {
            setLoading(true)
            const endPoint = signupAs === 'student' ? '/api/user/signup' : '/api/instructor/signup'
            await axios.post(endPoint, user)
            
            if (signupAs === 'student') {
                toast.success('Account created')
                router.push('/')
            } else {
                toast.success('Instructor account created')
                router.push('/instructor')
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || error.message || 'Signup failed')
        } finally {
            setLoading(false)
        }
    }, [user, signupAs, router])
    
    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0 && user.userName.length > 0))
    }, [user.email, user.password, user.userName])
    
    const isStudent = useMemo(() => signupAs === 'student', [signupAs])
    return (
        <>
            {loading && <LoadingSpinner />}
            <div className="flex w-full h-screen overflow-hidden bg-black">
                <div className='w-full flex items-center justify-center lg:w-1/2 overflow-y-auto py-4 px-4 relative z-10'>
                    {isStudent ? (
                        <SignupForm user={user} setUser={setUser} onSignup={onSignup} buttonDisabled={buttonDisabled} setSignupAs={setSignupAs} />
                    ) : (
                        <InstructorSignupForm user={user} setUser={setUser} onSignup={onSignup} buttonDisabled={buttonDisabled} setSignupAs={setSignupAs} />
                    )}
                </div>
                <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center overflow-hidden">
                    <div className="w-full absolute inset-0 h-screen">
                        <SparklesCore
                            id="signup-sparkles"
                            background="transparent"
                            minSize={0.6}
                            maxSize={1.4}
                            particleDensity={100}
                            className="w-full h-full"
                            particleColor="#00ff00"
                            speed={0.5}
                        />
                    </div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">Join Us!</h2>
                        <p className="text-gray-300">Start your learning journey today</p>
                    </div>
                </div>
            </div>
        </>
    )
}