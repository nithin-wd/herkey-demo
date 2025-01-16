"use client"
import React, { useEffect, useMemo, useState } from 'react'
import InterestButton from './InterestButton';
import Link from 'next/link';
import dayjs from 'dayjs';
import { HerkeyParticipant, HerkeySession, HerkeyUser } from '@/type';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;

const SessionButton = ({ currentSession, host, sessionId, userId }: { currentSession: HerkeySession, host: HerkeyUser | undefined, sessionId: string, userId: number }) => {
    const [timeLeft, setTimeLeft] = useState(0);


    const isInterested = !!currentSession?.attributes?.participants?.find((participant: HerkeyParticipant) => participant?.user_id === userId);
    const isHost = host?.id === userId;

    const scheduledDate = useMemo(() => dayjs(currentSession?.attributes?.scheduled_date), [currentSession?.attributes?.scheduled_date]);
    const endDate = useMemo(() => currentSession?.attributes?.end_date ? dayjs(currentSession?.attributes?.end_date) : scheduledDate.add(1, "hour"), [scheduledDate, currentSession?.attributes?.end_date]);
   
    useEffect(() => {
        const interval = setInterval(() => {
            const remainingSeconds = scheduledDate.diff(dayjs(), 'seconds');
            setTimeLeft(remainingSeconds);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [scheduledDate]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isScheduled = useMemo(() => scheduledDate.isAfter(dayjs()), [timeLeft]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isCompleted = useMemo(() => endDate.isBefore(dayjs()), [endDate, timeLeft]);

    if (isScheduled && !isHost) 
        return <InterestButton sessionId={sessionId} isInterested={isInterested} />
    if (isCompleted) 
        return <div className='min-w-[112px] md:min-w-[200px] h-[40px]  bg-[#F5F5F5] rounded-[12px] text-darkGray flex justify-center items-center'>Past</div>
    if (!isCompleted && !isScheduled) 
        return <Link href={`${baseURL}/sessions/${sessionId}/join`} className='min-w-[112px] md:min-w-[200px] h-[40px] bg-green rounded-[12px] text-pureWhite flex justify-center items-center'>Join</Link>
    if (isHost && isScheduled)
        return <Link href={`${baseURL}/sessions/${sessionId}/join`} className='min-w-[112px] md:min-w-[200px] h-[40px] bg-green rounded-[12px] text-pureWhite flex justify-center items-center px-2'>Start the session</Link>
}

export default SessionButton