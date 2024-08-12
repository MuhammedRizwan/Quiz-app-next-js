"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SignupForm from '@/components/SignupForm';
import LoadingSpinner from '@/components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import InstructorSignupForm from '@/components/InstructorSignupForm';

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
    const onSignup = async () => {
        try {
            setLoading(true)
            let endPoint
            if (signupAs == 'student') {
                endPoint = '/api/user/signup'
            } else {
                endPoint = 'api/instructor/signup'
            }
            const response = await axios.post(endPoint, user)
            if (signupAs == 'student') {
                toast.success('account created')
                router.push('/')
            } else {
                toast.success('instructor account created')
                router.push('/instructor')
            }
        } catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.userName.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <>
            <div className="flex w-full h-screen">
                <div className='w-full flex items-center justify-center lg:w-1/2'>
                    {signupAs == 'student' ?
                        <SignupForm user={user} setUser={setUser} onSignup={onSignup} buttonDisabled={buttonDisabled} setSignupAs={setSignupAs} /> :
                        <InstructorSignupForm user={user} setUser={setUser} onSignup={onSignup} buttonDisabled={buttonDisabled} setSignupAs={setSignupAs} />}
                </div>
                <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
                    <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin" />
                    <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
                </div>
            </div>
        </>
    )
}