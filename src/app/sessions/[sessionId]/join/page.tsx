/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic"
export const maxDuration = 60;
;

import { AUTH_GET, AUTH_POST } from "@/app/actions-server";
import HostView from "@/components/HostView";
import ParticipantView from "@/components/ParticipantView";
import AgoraHostProvider from "@/providers/AgoraHost";
// import ParticipantView from "@/components/ParticipantView";

const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL!;


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
export default async function Join({
  params,
}: {
  params: any;
}) {
  const sessionId = await params.sessionId;

  const currentSession = await getSession(sessionId);
  const agoraSession = await getAgoraToken(sessionId)
  const token = agoraSession.token;
  const UID = agoraSession.uid;
  const currentUser = currentSession?.attributes?.participants?.find((participant: any) => participant?.user_id === UID);
  const isHost = currentUser?.type === "HOST"
  const hostUID = currentSession?.attributes?.participants?.find((participant: any) => participant?.type === "HOST")?.user_id;
  return (
    <AgoraHostProvider>
      {isHost ?
        <HostView sessionId={sessionId} token={token} UID={UID} currentSession={currentSession} currentUser={currentUser} /> :
        <ParticipantView sessionId={sessionId} token={token} UID={UID} currentSession={currentSession} currentUser={currentUser} hostUID={hostUID} />}
    </AgoraHostProvider>
  );
}
