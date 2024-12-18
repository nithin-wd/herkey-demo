"use client"
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ErrorAlert = ({ error }: { error: any }) => {
    const router = useRouter()
    const handleCloseError = () => {
        router.replace("/auth/login")
    }
    return (
        <>
            {error && <div className="fixed bottom-2 right-2 rounded-md shadow-md bg-burgundy text-pearlWhite p-3 flex items-center gap-x-2">
                <button onClick={handleCloseError}>
                    <X />
                </button>
                <div>{error}</div>
            </div>
            }
        </>
    )
}

export default ErrorAlert