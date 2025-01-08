export const dynamic = "force-dynamic";

import Agora from "agora-access-token";
import { NextRequest } from "next/server";
const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!
const appCertificate = process.env.NEXT_PUBLIC_AGORA_APP_PC!

const getSession = (sessionId: string) => {
  const token = Agora.RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    sessionId,
    10000, // UID 0 for anonymous users
    Agora.RtcRole.PUBLISHER , // Host privileges
    Math.floor(Date.now() / 1000) + 3600 // Token expiry (1 hour)
  );

  return token;
};
export async function GET(_req: NextRequest, { params }: { params: any }) {
  const { sessionId } = await params
  try {
    const data = getSession(sessionId)
    return new Response(
      JSON.stringify({
        status: true,
        message: "success",
        data
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",

        }
      }
    );
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
