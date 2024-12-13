"use client"
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-y-2'>
        <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
        <p className='text-lg text-gray-500'>The page you are looking for does not exist.</p>
        <Link href="/sessions" className='bg-blue-500 hover:bg-blue-700 text-pureWhite px-4 py-2 rounded-md'>Go back to the sessions page</Link>
    </div>
  )
}

export default NotFound
