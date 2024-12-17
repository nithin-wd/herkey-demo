/* eslint-disable @typescript-eslint/no-explicit-any */
import Icons from '@/components/icons'
import { sessions } from '@/lib/const';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { metadata as rootMetaData } from "@/app/layout"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;

// set dynamic metadata
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const { sessionId } = await params
    const currentSession: any = sessions?.find(session => session?.id === sessionId);
    return {
        ...rootMetaData,
        title: currentSession.title,
        description: currentSession.description,
    };
}

const SessionDetails = async ({ params }: { params: any }) => {

    const { sessionId } = await params
    const currentSession = sessions?.find(session => session?.id === sessionId);
    return (
        <div className='bg-pureWhite p-2 md:p-[20px] flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-x-2">
                    <Link href={`${baseURL}/sessions`} className='mr-1 hover:bg-pearlWhite rounded  p-2'>
                        <Icons.BackButton />
                    </Link>
                    <div className='bg-lightBurgundy text-blackBerry rounded-[6px] px-[12px] py-[6px] text-[12px] font-[400]'>Wed, 27 Aug 24 | 12:30 PM</div>
                    <div className='bg-lightBurgundy text-blackBerry rounded-[6px] px-[12px] py-[6px] text-[12px] font-[400]'>1 hr 15 m</div>
                </div>
                <div>
                    <Icons.Share />
                </div>
            </div>
            <div>{currentSession?.title}</div>
            <Link  href={`${baseURL}/sessions/${sessionId}/join`} className='w-full h-[240px] border rounded-2xl text-burgundy flex justify-center items-center'>Join</Link>
            <div className='flex gap-x-2'>
                <div className='text-[16px] font-[500] text-black'>{currentSession?.subHeading}</div>
                <div>
                    <Image src={"/placeholder-session-image.png"} width={108} height={60} alt='' />
                </div>
            </div>
            <div className='text-darkGray text-[14px]'>{currentSession?.description}</div>
            <button className='text-burgundy font-[500] w-fit'>Add to calendar</button>
            <div>{`Interested Participants (${currentSession?.participants?.length})`}</div>
         <div>{currentSession?.participants?.map(participant=>{
            return <div key={JSON.stringify(participant)}>{participant?.user?.name}</div>
         })}</div>
        </div>
    )
}

export default SessionDetails