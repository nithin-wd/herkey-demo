/* eslint-disable @typescript-eslint/no-explicit-any */
import Icons from '@/components/icons'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;


const SessionDetails = async ({ params }: { params: any }) => {
    const { sessionId } = await params
    return (
        <div className='bg-pureWhite p-[20px] flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-x-2">
                    <Link href={`${baseURL}/sessions`}>
                        <Icons.BackButton />
                    </Link>
                    <div className='bg-lightBurgundy text-blackBerry rounded-[6px] px-[12px] py-[6px] text-[12px] font-[400]'>Wed, 27 Aug 24 | 12:30 PM</div>
                    <div className='bg-lightBurgundy text-blackBerry rounded-[6px] px-[12px] py-[6px] text-[12px] font-[400]'>1 hr 15 m</div>
                </div>
                <div>
                    <Icons.Share />
                </div>
            </div>
            <div>Open to Her Rising 2023: India Conclave +5 more</div>
            <div className='w-full h-[240px] border rounded-2xl text-burgundy flex justify-center items-center'>Video</div>
            <div className='flex gap-x-2'>
                <div className='text-[16px] font-[500] text-black'>Visualizing Data: Infographics as Assets and digital records in ERMS</div>
                <div>
                    <Image src={"/placeholder-session-image.png"} width={108} height={60} alt='' />
                </div>
            </div>
            <div className='text-darkGray text-[14px]'>Asking for a promotion can be a nerve-wracking experience, but with the right approach and effective communication skills, you can increase your chances of success. You will have  a step-by-step guide on how to ask for a promotion and improve your communication skills.</div>
            <button className='text-burgundy font-[500] w-fit'>Add to calendar</button>
            <div>Interested Participants (16)</div>
            <div>{sessionId}</div>
        </div>
    )
}

export default SessionDetails