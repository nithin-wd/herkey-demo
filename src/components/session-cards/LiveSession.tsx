import Icons from '@/components/icons';
import { HerkeyAttachment, HerkeyParticipant, HerkeySession } from '@/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
const LiveSession = ({ session }: {session:HerkeySession}) => {
    const host = session?.attributes?.participants?.find((participant: HerkeyParticipant) => participant?.type === "HOST")?.user;
    const otherParticipantsCount = session?.attributes?.participants?.filter((participant: HerkeyParticipant) => participant?.type !== "HOST")?.length;
    const bannerURL = session?.attributes?.attachments?.find((attachment: HerkeyAttachment) => attachment?.type === "BANNER")?.signed_url;
    const eventImageURL = session?.attributes?.attachments?.find((attachment: HerkeyAttachment) => attachment?.type === "EVENT_IMAGE")?.signed_url;
    return (
        <div className="px-2 py-4 md:p-[20px] text-black bg-pureWhite flex flex-col gap-y-4 border-b border-b-[#EAEAEA]">
            <div className="flex justify-between">
                <div className='bg-lightBurgundy flex items-center gap-x-[10px] rounded-[6px] w-[68px] h-[28px] justify-center'>
                    <div className='bg-burgundy h-[8px] w-[8px] rounded-full' />
                    <div className='text-blackBerry text-[14px]'>Live</div>
                </div>
                <Icons.Share />
            </div>

            <Link href={`${baseURL}/sessions/${session?.id}`}>
                {bannerURL &&
                    <picture>
                        <img src={bannerURL} alt='' className='mb-2 object-contain' />
                    </picture>
                }

                <div className='text-[14px] md:text-[16px] font-[500] mb-1'>{session?.attributes?.title}</div>
                <div className="flex justify-between gap-x-2">
                    <div className='text-[12px] md:text-[14px]'>{session?.attributes?.description}</div>
                    {eventImageURL &&
                        <picture>
                            <img src={eventImageURL} alt='' className='mb-2 object-contain' />
                        </picture>
                    }

                </div>
            </Link>
            <div className='flex justify-between items-center'>
                <div className='flex gap-x-1 md:gap-x-3 items-center'>
                    <div className="relative w-[70px]">
                        <Image src={"/placeholder-user-image.png"} width={40} height={40} alt='' className="h-[40px] w-[40px] rounded-full relative z-20" />
                        {otherParticipantsCount !== 0 && <div className="absolute top-0 left-[30px] bg-lightBurgundy text-burgundy h-[40px] w-[40px] rounded-full z-10  flex justify-center items-center text-[12px]">{`+${otherParticipantsCount}`}</div>}
                        <div className='absolute top-[30px] z-20 bg-pearlWhite w-[36px] h-[24px] text-[12px] flex justify-center items-center rounded-[4px]'>Host</div>
                    </div>
                    <div>
                        <div className='font-[500] text-[12px] md:text-[16px]'>{`${host?.first_name} ${host?.last_name}`}</div>
                        <div className='flex gap-x-2 flex-col md:flex-row md:items-center'>
                            <span className='font-[400] text-[12px] md:text-[14px] text-darkGray'>{host?.position ?? "Position"}</span>
                            <span className='font-[500] text-[10px] md:text-[12px] text-burgundy flex items-center gap-x-1'>
                                <Icons.GraduateHat />
                                {host?.level ?? "Starter"}</span>
                        </div>
                    </div>
                </div>
                <Link href={`${baseURL}/sessions/${session?.id}/join`} className='min-w-[112px] md:min-w-[200px] h-[40px] bg-green rounded-[12px] text-pureWhite flex justify-center items-center'>Join</Link>
            </div>
        </div>
    )
}

export default LiveSession;