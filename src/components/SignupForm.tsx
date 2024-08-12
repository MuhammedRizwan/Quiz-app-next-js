import Link from "next/link"
import React, { ChangeEvent, Dispatch, SetStateAction } from "react"

interface signupFormProps {
    user: {
        userName: string,
        email: string,
        password: string
    };
    setUser: Dispatch<SetStateAction<{
        userName: string,
        email: string,
        password: string,
    }>>;
    onSignup: () => void;
    buttonDisabled: boolean
    setSignupAs: Dispatch<SetStateAction<'student'|'instructor'>>
}

const SignupForm: React.FC<signupFormProps> = ({ user, setUser, onSignup, buttonDisabled,setSignupAs }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }
    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
            <h1 className="text-5xl font-semibold text-center">Quiz App</h1>
            <p className="font-medium text-lg text-gray-500 mt-4 text-center">welcome to the Signup Page</p>
            <div className="mt-8">
                <div>
                    <label htmlFor="" className="text-lg font-medium">User name</label>
                    <input name="userName" value={user.userName} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" type="text" placeholder="Enter your username" />
                </div>
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
                <button onClick={onSignup} disabled={buttonDisabled}  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Sign up</button>
                <h3 className="mt-4 text-gray-700 text-center font-medium active:scale-[.98] active:duration-75 transition-all">Already have an account?{" "}<Link href='/login' className="text-violet-500 font-semibold hover:text-pink-400">Sign in</Link></h3>
            </div>
            <div className="flex absolute items-center justify-center mt-8">
                <button onClick={()=>setSignupAs('instructor')} className="mx-16 bg-violet-500 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign up as Instructor
                </button>
            </div>
        </div>
    )
}

export default SignupForm