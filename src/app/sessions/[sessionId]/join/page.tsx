/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic"
export const maxDuration = 60;
;

import HostView from "@/components/HostView";
import { sessions } from "@/lib/const";
import AgoraHostProvider from "@/providers/AgoraHost";
// import ParticipantView from "@/components/ParticipantView";
const getSession = async (sessionId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-session/${sessionId}/host`);
  const data = await response.json();
  return data

}
export default async function Join({
  params,
}: {
  params: any;
}) {
  const sessionId = await params.sessionId;

  const currentSession = sessions?.find(session => session?.id === sessionId);
  const session = await getSession(sessionId)
  const token = session.data.token;
  const UID = session.data.UID;
  return (
    <AgoraHostProvider>
      <HostView sessionId={sessionId} token={token} UID={UID} currentSession={currentSession} />
      {/* <ParticipantView /> */}
    </AgoraHostProvider>
  );
}
