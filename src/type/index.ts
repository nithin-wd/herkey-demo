import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import { Dayjs } from "dayjs";
import { JWT } from "next-auth/jwt";
import { ReactNode } from "react";

interface HerkeyToken extends JWT {
    expires?: Dayjs
}
interface HerkeyUser {
    "id": number,
    "username": string,
    "email": string,
    "first_name": string,
    "last_name": string
    "level"?: string
    "position"?: string
}

interface HerkeyParticipant {
    "id": string,
    "event": string,
    "event_id": string,
    "user": HerkeyUser,
    "user_id": number,
    "active": boolean,
    "type": "HOST" | "PARTICIPANT",
    "created": string,
    "modified": string
}

interface HerkeyAttachment {
    "id": string,
    "attachment_cloud_id": string,
    "event": string,
    "event_id": string,
    "type": "BANNER" | "EVENT_IMAGE",
    "active": boolean,
    "created": string,
    "modified": string,
    "signed_url": string
}

interface HerkeySession {
    "type": string,
    "id": string,
    "attributes": {
        "title": string,
        "description": string,
        "type": "SCHEDULED" | "LIVE" | "COMPLETED",
        "scheduled_date": string,
        "end_date"?: string,
        "created": string,
        "modified": string,
        "active": boolean,
        "stream_session_id": string | null,
        "participants": HerkeyParticipant[],
        "attachments": HerkeyAttachment[]
    }
}

interface HerkeyRemoteUser extends IAgoraRTCRemoteUser {
    _audio_muted_?: boolean,
    _video_muted_?: boolean
}

interface HerkeyMenuItem {
    label: string,
    icon: ReactNode,
    link: string,
    type: "link" | "button" | "accordion",
    id: string,
    linkType?: "internal" | "external",
    subMenus?: HerkeyMenuItem[]
}
interface HerkeyChatToken{
    app:string;
    user:string;
}
export type { HerkeyToken, HerkeyUser, HerkeyParticipant, HerkeyAttachment, HerkeySession, HerkeyRemoteUser, HerkeyMenuItem,HerkeyChatToken }
