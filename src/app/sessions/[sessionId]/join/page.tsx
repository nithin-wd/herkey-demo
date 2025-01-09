
export const dynamic = "force-dynamic"
export const maxDuration = 60;

import { AUTH_GET, AUTH_POST, UN_AUTH_GET } from "@/app/actions-server";
import HostView from "@/components/HostView";
import ParticipantView from "@/components/ParticipantView";
import authOptions from "@/lib/options";
import AgoraHostProvider from "@/providers/AgoraHost";
import { HerkeyParticipant } from "@/type";
import { getServerSession } from "next-auth";
// import ParticipantView from "@/components/ParticipantView";

const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;


const getSession = async (id: string) => {
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
const getAgoraToken = async (event_id: string) => {
  try {

    const url = new URL(`${baseAPIURL}/api/agora-token/`);
    const payload = { event_id };

    const sessions = await AUTH_POST(url.toString(), payload)
    return sessions?.data;
  } catch (error) {
    throw error
  }
}
const getAgoraScreenToken = async (event_id: string) => {
  try {
    const url = new URL(`${baseURL}/api/get-screen-session/${event_id}`);
    const sessions = await UN_AUTH_GET(url.toString())
    return sessions?.data;
  } catch (error) {
    throw error
  }
}
// const getAgoraSignalToken = async (userId: string) => {
//   try {
//     const url = new URL(`${baseURL}/api/get-signal-session/${userId}`);
//     const sessions = await UN_AUTH_GET(url.toString())
//     return sessions?.data;
//   } catch (error) {
//     throw error
//   }
// }



const addUserToSession = async (sessionId: string) => {
  try {

    const url = new URL(`${baseAPIURL}/api/event-participants/`);
    const payload = {
      "event": sessionId,
      "type": "PARTICIPANT",
      "active": true
    };
    await AUTH_POST(url.toString(), payload)

  } catch (error) {
    console.log({ pp: error })
    throw error
  }
}
export default async function Join({
  params,
}: {
  params: any;
}) {
  try {
    const session = await getServerSession(authOptions);
    const urlParams = await params;
    const sessionId = urlParams.sessionId;
    const currentSession = await getSession(sessionId);
    
    const currentUser = currentSession?.attributes?.participants?.find((participant: HerkeyParticipant) => participant?.user_id === session?.user?.id);
    if (!currentUser) await addUserToSession(sessionId)
      const isHost = currentUser?.type === "HOST"
    const hostUID = currentSession?.attributes?.participants?.find((participant: HerkeyParticipant) => participant?.type === "HOST")?.user_id;
    
    const agoraSession = await getAgoraToken(sessionId);
    const token = agoraSession.rtc_token?.token;
    const chatToken = agoraSession.rtm_token?.token;
    // const chatId=session?.user?.email?.split("@")?.[0]
    // const chatToken =  await getAgoraSignalToken(session?.user?.id);
    const screenToken = await getAgoraScreenToken(sessionId);

    return (
      <AgoraHostProvider>
        {isHost ?
          <HostView sessionId={sessionId} token={token} UID={session?.user?.id} currentSession={currentSession} currentUser={currentUser} chatToken={chatToken} screenToken={screenToken}/> :
          <ParticipantView sessionId={sessionId} token={token} UID={session?.user?.id} currentSession={currentSession} currentUser={currentUser} hostUID={hostUID} chatToken={chatToken} />}
      </AgoraHostProvider>
    );
  } catch (_error: any) {
    return <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div>Access Denied</div>
    </div>
  }
}
