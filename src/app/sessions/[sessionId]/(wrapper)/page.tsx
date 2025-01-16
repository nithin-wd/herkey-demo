
import { AUTH_GET } from '@/app/actions-server';
import { metadata as rootMetaData } from "@/app/layout";
import CountDown from '@/components/CountDown';
import Icons from '@/components/icons';
import SessionButton from '@/components/SessionButton';
import Badge from '@/components/svgx/Badge';
import authOptions from '@/lib/options';
import { cn, readableTime } from '@/lib/utils';
import { HerkeyParticipant, HerkeySession } from '@/type';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;

const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getSession = async (id: string): Promise<HerkeySession> => {
    try {

        const url = new URL(`${baseAPIURL}/api/events/${id}/`);
        const sessions = await AUTH_GET(url.toString(), {
            revalidate: 60,
            tags: ["sessions", id],
        })
        return sessions?.data;
    } catch (error) {
        throw error
    }
}
// set dynamic metadata
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const { sessionId } = await params
    const currentSession: HerkeySession = await getSession(sessionId)
    return {
        ...rootMetaData,
        title: currentSession.attributes?.title,
        description: currentSession.attributes?.description,
    };
}



const SessionDetails = async ({ params }: { params: any }) => {
    const { sessionId } = await params;
    const nextSession = await getServerSession(authOptions);
    const userId = nextSession?.user?.id
    const currentSession: HerkeySession = await getSession(sessionId);
    const host = currentSession?.attributes?.participants?.find((participant: HerkeyParticipant) => participant?.type === "HOST")?.user;    
    const bannerURL = currentSession?.attributes?.attachments?.find((attachment) => attachment?.type === "BANNER")?.signed_url;
    const eventImageURL = currentSession?.attributes?.attachments?.find((attachment) => attachment?.type === "EVENT_IMAGE")?.signed_url;
   


    return (
        <div className='bg-pureWhite p-2 md:p-[20px] flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-x-2">
                    <Link href={`${baseURL}/sessions`} className='mr-1 hover:bg-pearlWhite rounded  p-2'>
                        <Icons.BackButton />
                    </Link>
                    <div className='bg-lightBurgundy text-blackBerry rounded-[6px] px-[12px] py-[6px] text-[12px] font-[400]'>{readableTime(currentSession?.attributes?.scheduled_date)}</div>
                    <CountDown scheduledDate={currentSession?.attributes?.scheduled_date} />
                </div>
                <div>
                    <Icons.Share />
                </div>
            </div>
            <div>{currentSession?.attributes?.title}</div>
            {bannerURL &&
                <picture>
                    <img src={bannerURL} alt='' className='mb-2 object-contain' />
                </picture>
            }
            {/* <Link href={`${baseURL}/sessions/${sessionId}/join`} className='w-full h-[240px] border rounded-2xl text-burgundy flex justify-center items-center'>Join</Link> */}
            <div className='flex gap-x-2'>

                {/* <div className='text-[16px] font-[500] text-black'>{currentSession?.subHeading}</div> */}
                {eventImageURL &&
                    <picture>
                        <img src={eventImageURL} alt='' className='mb-2 object-contain' />
                    </picture>
                }
            </div>
            <div className='text-darkGray text-[14px]'>{currentSession?.attributes?.description}</div>
            <div className='flex justify-between items-center'>

                <button className='text-burgundy font-[500] w-fit'>Add to calendar</button>
               <SessionButton sessionId={sessionId} userId={userId} host={host} currentSession={currentSession}/>
            </div>
            <div>{`Interested Participants (${currentSession?.attributes?.participants?.length})`}</div>
            <div className='flex flex-col gap-y-2'>{currentSession?.attributes?.participants?.map((participant) => {
                return <div key={participant?.id} className='flex items-center gap-x-6'>
                    <div className="relative w-[70px] flex flex-col items-center">
                        <Image src={"/placeholder-user-image.png"} width={60} height={60} alt='' className="h-[60px] w-[60px] rounded-full relative z-20" />
                        <div className={cn('absolute top-[40px] z-20  hidden justify-center items-center rounded-[4px]', {
                            "flex": participant.type === "HOST"
                        })}>
                            <Badge />
                        </div>

                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex flex-col'>
                            <div className='flex items-center gap-x-2'>
                                {participant.type === "HOST" && <div className='bg-pearlWhite px-2 py-1 rounded text-[12px]'>Host</div>}
                                <div className='text-[16px] text-black font-[500]'>{`${participant?.user?.first_name} ${participant?.user?.last_name}`}</div>
                            </div>
                            <div className='flex gap-x-2 flex-col md:flex-row md:items-center'>
                                <span className='font-[400] text-[12px] md:text-[14px] text-darkGray'>{host?.position ?? "Position"}</span>
                                <span className='font-[500] text-[10px] md:text-[12px] text-burgundy flex items-center gap-x-1'>
                                    <Icons.GraduateHat />
                                    {host?.level ?? "Starter"}</span>
                            </div>
                        </div>
                        <Link href="#" className='min-w-[112px] md:min-w-[120px] h-[40px] bg-green rounded-[12px] text-pureWhite flex justify-center items-center'>Follow</Link>

                    </div>
                </div>
            })}</div>
        </div>
    )
}

export default SessionDetails