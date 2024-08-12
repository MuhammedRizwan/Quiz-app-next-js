'use client'
import React, { useState, useEffect } from 'react'
import LoginForm from "@/components/LoginForm"
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast/headless'
import axios from 'axios'
import LoadingSpinner from '@/components/Loading'
import InstructorLoginForm from '@/components/InstructorLoginForm'
 
export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [loginAs,setLoginAs]=useState<'student'|'instructor'>('student')
    const [loading,setLoading]=useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const onLogin = async () => {
        try {    
            let endPoint; 
            if(loginAs === 'student'){
                endPoint = '/api/user/login'
            }else{
                endPoint ='/api/instructor/login'
            }    
            setLoading(true)
            const response=await axios.post(endPoint,user)
            if(loginAs === 'student'){
                toast.success('Login success')
                router.push('/')
            }else{
                toast.success('instructor Login success')
            router.push('/instructor')
            } 
            
        } catch (error: any) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <>
        {loading && <LoadingSpinner />}
        <div className="flex w-full h-screen">
            <div className='w-full flex items-center justify-center lg:w-1/2'>
                {loginAs == 'student' ?
                <LoginForm user={user} setUser={setUser} onLogin={onLogin} buttonDisabled={buttonDisabled} setLoginAs={setLoginAs} />:
                <InstructorLoginForm user={user} setUser={setUser} onLogin={onLogin} buttonDisabled={buttonDisabled} setLoginAs={setLoginAs} />
            }
            </div>
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin" />
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>
        </div>
        </>
    )
}