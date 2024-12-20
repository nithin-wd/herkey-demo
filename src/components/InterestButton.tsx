"use client"
import { AUTH_POST } from '@/app/actions-server';
import React, { useState } from 'react'
const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const InterestButton = ({ sessionId }: { sessionId: string }) => {
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
            const res = await AUTH_POST(url.toString(), payload, "sessions");
            console.log({ res })
            setLoading(false);
        } catch (error) {
            console.log({ pp: error })
            setLoading(false);
            throw error
        }
    }
    return (
        <button className='min-w-[112px] md:min-w-[200px] h-[40px] bg-green rounded-[12px] text-pureWhite' onClick={() => addUserToSession(sessionId)}>{loading ? "Loading" : "Interested"}</button>
    )
}

export default InterestButton