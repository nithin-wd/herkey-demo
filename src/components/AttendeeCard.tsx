"use client"
import { cn } from '@/lib/utils'
import { RemoteUser } from 'agora-rtc-react'
import { MicOff } from 'lucide-react'
import React, { useMemo } from 'react'

const AttendeeCard = ({ user,herkeyUser }: any) => {
    const userMicOff = useMemo(() => user?._audio_muted_, [user?._audio_muted_]);
    const userCameraOff = useMemo(() => user?._video_muted_, [user?._video_muted_]);
    return (
        <div
            className="flex flex-col items-center justify-center w-full h-full max-h-[112px]"
            key={user.uid}
        >
            <RemoteUser
                user={user}
                className="rounded-xl relative border border-lightBurgundy"
            >
                <div className={cn("bg-[#a77a91] absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center user-select-none", {
                    "hidden": !userCameraOff
                })}>

                    <div className="h-[60px] w-[60px] rounded-full bg-burgundy text-lightBurgundy flex justify-center items-center">{herkeyUser.user?.first_name?.charAt(0)}</div>

                </div>
                {userMicOff && <span className="absolute text-[12px] top-2 right-2 h-[20px] w-[20px] rounded-full bg-lightBurgundy flex justify-center items-center">
                    <MicOff className="text-burgundy scale-[0.6]" />
                </span>}
                <span className="absolute text-[12px] font-medium text-lightBurgundy bottom-2 left-2">{`${herkeyUser.user?.first_name} ${herkeyUser.user?.last_name}`}</span>
            </RemoteUser>
        </div>
    )
}

export default AttendeeCard