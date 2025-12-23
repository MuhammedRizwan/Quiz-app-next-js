import Link from "next/link"
import React, { ChangeEvent, Dispatch, SetStateAction, memo, useCallback } from "react"

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

const SignupForm: React.FC<signupFormProps> = memo(({ user, setUser, onSignup, buttonDisabled, setSignupAs }) => {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }, [setUser])

    const handleInstructorClick = useCallback(() => {
        setSignupAs('instructor')
    }, [setSignupAs])
    return (
        <div className="bg-white px-8 py-12 rounded-3xl border-2 border-gray-200 w-full max-w-md relative">
            <h1 className="text-2xl font-semibold text-center">Quiz App</h1>
            <p className="font-medium text-sm text-gray-500 mt-3 text-center">welcome to the Signup Page</p>
            <div className="mt-6">
                <div>
                    <label htmlFor="" className="text-sm font-medium">User name</label>
                    <input name="userName" value={user.userName} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent text-sm" type="text" placeholder="Enter your username" />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="text-sm font-medium">Email</label>
                    <input name="email" value={user.email} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent text-sm" type="text" placeholder="Enter your email" />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="text-sm font-medium">Password</label>
                    <input name="password" value={user.password} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent text-sm" type="password" placeholder="Enter your password" />
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-y-3">
                <button onClick={onSignup} disabled={buttonDisabled}  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-2.5 rounded-xl bg-violet-500 text-white text-sm font-bold">Sign up</button>
                <h3 className="mt-1 text-gray-700 text-center text-xs font-medium active:scale-[.98] active:duration-75 transition-all">Already have an account?{" "}<Link href='/login' className="text-violet-500 font-semibold hover:text-pink-400">Sign in</Link></h3>
            </div>
            <div className="flex items-center justify-center mt-6">
                <button onClick={handleInstructorClick} className="bg-violet-500 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs" type="button">
                    Sign up as Instructor
                </button>
            </div>
        </div>
    )
})

SignupForm.displayName = 'SignupForm'

export default SignupForm