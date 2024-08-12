import Link from "next/link"
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'

interface userLoginProps {
    user: {
        email: string,
        password: string
    }
    setUser: Dispatch<SetStateAction<{
        email: string,
        password: string
    }>>
    onLogin: () => void
    buttonDisabled: boolean
    setLoginAs:Dispatch<SetStateAction<'student'|'instructor'>>
}

const LoginForm: FC<userLoginProps> = ({ user, setUser, onLogin, buttonDisabled ,setLoginAs}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {        
        const { name, value } = e.target
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }
    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
            <h1 className="text-5xl font-semibold text-center">Quiz App</h1>
            <p className="font-medium text-lg text-gray-500 mt-4 text-center">welcome to the Login Page</p>
            <div className="mt-8">
                <div>
                    <label htmlFor="" className="text-lg font-medium">Email</label>
                    <input name="email" value={user.email} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" type="text" placeholder="Enter your email" />
                </div>
                <div>
                    <label htmlFor="" className="text-lg font-medium">Password</label>
                    <input name="password" value={user.password} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" type="password" placeholder="Enter your password" />
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
                <button onClick={onLogin} disabled={buttonDisabled} className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Sign in</button>
                <h3 className="mt-1 text-gray-700 text-center font-medium active:scale-[.98] active:duration-75 transition-all">Don't have an account?{" "}<Link href='/signup' className="text-violet-500 font-semibold hover:text-pink-400">Sign up</Link></h3>
            </div>
            <div className="flex absolute items-center justify-center mt-8">
                <button onClick={()=>setLoginAs('instructor')} className="mx-16 bg-violet-500 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Login as Instructor
                </button>
            </div>
        </div>
    )
}
export default LoginForm