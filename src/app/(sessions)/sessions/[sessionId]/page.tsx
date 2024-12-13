/* eslint-disable @typescript-eslint/no-explicit-any */
import Icons from '@/components/icons'
import Link from 'next/link'
import React from 'react'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;


const SessionDetails = ({ params }: { params: any }) => {
    const { sessionId } = params
    return (
        <div className='bg-pureWhite p-[20px]'>
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
            <div>{sessionId}</div>
        </div>
    )
}

export default SessionDetails