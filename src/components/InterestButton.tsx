"use client"
import { AUTH_POST } from '@/app/actions-server';
import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react'
const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const InterestButton = ({ sessionId, isInterested }: { sessionId: string, isInterested: boolean }) => {
    const [loading, setLoading] = useState(false)
    const addUserToSession = async (id: string) => {
        try {
            setLoading(true);
            const url = new URL(`${baseAPIURL}/api/event-participants/`);
            const payload = {
                "event": id,
                "type": "PARTICIPANT",
                "active": true
            };
            await AUTH_POST(url.toString(), payload, "sessions");
            setLoading(false);
        } catch (error) {
            console.log({ pp: error })
            setLoading(false);
            throw error
        }
    }
    if (loading)
        return (
            <button className='min-w-[112px] md:min-w-[200px] h-[40px] bg-green rounded-[12px] text-pureWhite' disabled>
                Loading
            </button>
        )
    if (isInterested)
        return (
            <button className='min-w-[112px] md:min-w-[200px] h-[40px] bg-pureWhite rounded-[12px] text-green border border-green flex items-center justify-center gap-x-3 px-2' onClick={() => addUserToSession(sessionId)} disabled>
                <CheckCircle />
                Interested
            </button>
        )
    return (
        <button className='min-w-[112px] md:min-w-[200px] h-[40px] bg-green rounded-[12px] text-pureWhite flex items-center justify-center gap-x-3 px-2' onClick={() => addUserToSession(sessionId)} >
            Interested
        </button>
    )
}

export default InterestButton