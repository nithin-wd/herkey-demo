
import { AUTH_GET } from '@/app/actions-server';
import { metadata as rootMetaData } from "@/app/layout";
import Icons from '@/components/icons';
import InterestButton from '@/components/InterestButton';
import authOptions from '@/lib/options';
import { HerkeyParticipant, HerkeySession } from '@/type';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;

const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getSession = async (id: string): Promise<HerkeySession> => {
    try {

        const url = new URL(`${baseAPIURL}/api/events/${id}/`);
        const sessions = await AUTH_GET(url.toString(), {
            revalidate: 36000,
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
    const isHost = host?.id === userId;

    return (
        <div className='bg-pureWhite p-2 md:p-[20px] flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-x-2">
                    <Link href={`${baseURL}/sessions`} className='mr-1 hover:bg-pearlWhite rounded  p-2'>
                        <Icons.BackButton />
                    </Link>
                    <div className='bg-lightBurgundy text-blackBerry rounded-[6px] px-[12px] py-[6px] text-[12px] font-[400]'>{dayjs(currentSession?.attributes?.scheduled_date).format("ddd, DD MMM YY | hh:mm A")}</div>
                    <div className='bg-lightBurgundy text-blackBerry rounded-[6px] px-[12px] py-[6px] text-[12px] font-[400]'>1 hr 15 m</div>
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
                {isHost ?
                    <Link href={`${baseURL}/sessions/${sessionId}/join`} className='min-w-[112px] md:min-w-[200px] h-[40px] bg-green rounded-[12px] text-pureWhite flex justify-center items-center'>Join</Link>
                    :
                    <InterestButton sessionId={sessionId}/>
                }
            </div>
            <div>{`Interested Participants (${currentSession?.attributes?.participants?.length})`}</div>
            <div>{currentSession?.attributes?.participants?.map((participant) => {
                return <div key={JSON.stringify(participant)}>{participant?.user?.username}</div>
            })}</div>
        </div>
    )
}

export default SessionDetails