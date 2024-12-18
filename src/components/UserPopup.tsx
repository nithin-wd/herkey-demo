"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const UserPopup = () => {
    const session = useSession();
    const user = session?.data?.user;

    const handleLogout=()=>{
        signOut({redirect:true,callbackUrl:"/"})
    }
    return (
        <button className='text-white flex flex-col items-center' onClick={handleLogout}>
            <div className='bg-[#FFFFFF14] h-[32px] w-[32px] rounded-[12px] flex justify-center items-center relative'>
                {user?.name?.charAt(0)}
            </div>
            <div className='text-[12px]'>Me </div>
        </button>
    )
}

export default UserPopup