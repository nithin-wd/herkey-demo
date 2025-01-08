
export const dynamic = 'force-dynamic';
import { AUTH_GET } from "@/app/actions-server";
import SessionTabs from "@/components/SessionTabs";
import LiveSession from "@/components/session-cards/LiveSession";
import ScheduledSession from "@/components/session-cards/ScheduledSession";
import { HerkeySession } from "@/type";
import PastSession from "@/components/session-cards/PastSession";
import dayjs from "dayjs";
// import Image from "next/image";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getSessions = async (type: "all" | "my") => {
  try {

    const url = new URL(`${baseURL}/api/events/`);
    const sessions = await AUTH_GET(url.toString(), {
      revalidate: 36000,
      tags: ["sessions", type],
    })
    return sessions?.data
  } catch (error) {
    throw error
  }
}

export default async function Sessions({ searchParams }: { searchParams: any }) {
  const { tab } = await searchParams;
  const sessions = await getSessions(tab);

  return (
    <>
      <SessionTabs activeTab={tab} />
      {/* <div className="bg-pureWhite px-2 md:px-[20px] font-[500] text-[16px]">Live</div> */}
      <div className="flex flex-col gap-y-[2px] relative mb-[2px]">
        {sessions?.map((session: any) =>
          <CardSwitcher key={session?.id} session={session} />
        )}
        <button className="flex justify-center items-center w-full absolute bottom-[-20px]">
          <div className="border border-burgundy bg-pureWhite px-2 py-1 rounded-[8px] mb-2 text-burgundy text-[12px]">View more</div>
        </button>

      </div>
      <div className="bg-pureWhite h-[20px]" />


    </>
  );
}
const CardSwitcher = ({ session }: { session: HerkeySession }) => {
  const eventType = session?.attributes?.type
  const scheduledDate = session?.attributes?.scheduled_date;
  const isScheduled = dayjs(scheduledDate).isBefore(dayjs());
  const isLive = !isScheduled && eventType !== "COMPLETED";
  const isPast = !isScheduled && eventType === "COMPLETED";
  if (isScheduled)
    return <ScheduledSession session={session} />
  if (isPast)
    return <PastSession session={session} />
  if (isLive)
    return <LiveSession session={session} />
  return <LiveSession session={session} />
}