'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function LogoutButton() {
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

    const handleLogout = async () => {
        try {
            await axios.post('/api/user/logout')
            toast.success('Logged out successfully')
            setIsLoggedIn(false)
            router.push('/')
            router.refresh()
        } catch (error: any) {
            toast.error('Failed to logout')
        }
    }

    if (loading) return null

    if (!isLoggedIn) return null

    return (
        <button
            onClick={handleLogout}
            className="inline-block bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition text-sm"
        >
            Logout
        </button>
    )
}

