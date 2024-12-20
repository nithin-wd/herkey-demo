"use client";

import { useEffect, useState } from "react";
import {
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    useIsConnected,
    useRemoteUsers,
    useJoin,
    usePublish,
    LocalUser,
} from "agora-rtc-react";
import { cn } from "@/lib/utils";
import { LogOut, Mic, MicOff, Video, VideoOff } from "lucide-react";
import AttendeeCard from "./AttendeeCard";
import { useRouter } from "next/navigation";

const HostView = ({ sessionId, token, UID, currentSession, currentUser }: { sessionId: string, token: string, UID: string; currentSession: any, currentUser: any; }) => {
    const router = useRouter()
    const [calling, setCalling] = useState(true);
    const isConnected = useIsConnected(); // Store the user's connection status

    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
    const channel = sessionId; // Define your channel name
    // const token = process.env.NEXT_PUBLIC_AGORA_TOKEN!;


    // Join the channel
    useJoin({ appid: appId, channel, token: token || null, uid: UID, }, calling);


    // Manage microphone and camera states
    const [micOn, setMic] = useState(false);
    const [cameraOn, setCamera] = useState(false);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);

    // Publish local tracks
    usePublish([localMicrophoneTrack, localCameraTrack]);
    useEffect(() => {
        if (localMicrophoneTrack)
            localMicrophoneTrack.setEnabled(micOn)
    }, [micOn, localMicrophoneTrack])
    // Get remote users
    const remoteUsers = useRemoteUsers();
    const handleLeaveMeeting = () => {
        setCalling(false);
        router.push(`/sessions/${sessionId}`);
    }
    const currentParticipants = currentSession?.attributes?.participants

    if (!isConnected) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
                <button
                    className={`px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700`}
                    onClick={() => setCalling(true)}
                >
                    Please wait initiating connection
                </button>
            </div>
        );
    }
    return <div className="grid grid-rows-[60px_auto_60px] h-screen w-screen p-4 gap-y-2">
        <div className="text-lightBurgundy text-[28px] font-[500] flex items-center">{currentSession?.attributes?.title}</div>
        <div className={cn("grid grid-cols-1 grid-rows-1", {
            "grid-cols-[auto_200px]  grid-rows-[unset] gap-4": remoteUsers?.length >= 1
        })}>
            <LocalUser
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                className="rounded-xl relative"

            >
                <div className={cn("bg-[#a77a91] absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center user-select-none", {
                    "hidden": cameraOn
                })}>
                    <div className="h-[200px] w-[200px] rounded-full bg-burgundy text-lightBurgundy flex justify-center items-center text-[64px]">{currentUser?.user?.first_name?.charAt(0)}</div>

                </div>
                {!micOn && <span className="absolute text-[12px] top-2 right-2 h-[24px] w-[24px] rounded-full bg-lightBurgundy flex justify-center items-center">
                    <MicOff className="text-burgundy scale-[0.8]" />
                </span>}
                <span className="absolute text-[12px] font-medium text-lightBurgundy bottom-[12px] left-[12px]">{`${currentUser?.user?.first_name} ${currentUser?.user?.last_name}`}</span>
            </LocalUser>
            <div className="flex flex-col h-full w-full gap-y-2 overflow-y-auto">
                {remoteUsers.map((user: any) => (
                    <AttendeeCard key={user?.uid} user={user} herkeyUser={currentParticipants?.find((participant: any) => participant?.user_id === user?.uid)} />
                ))}
            </div>

        </div>
        {/* Host controls */}
        <div className="grid grid-cols-[100px_auto_100px] justify-between gap-4 items-center">
            <div>

            </div>
            <div className="flex items-center gap-x-4">
                <button
                    className={cn("px-4 py-2 bg-red-600 text-burgundy hover:bg-red-700 bg-lightBurgundy rounded-md w-[48px] h-[48px] flex justify-center items-center", {
                        "border border-lightBurgundy bg-burgundy text-lightBurgundy": micOn
                    })} onClick={() => setMic((prev) => !prev)}
                >
                    {!micOn ?
                        <div title="Turn off mic">
                            <MicOff />
                        </div>
                        :
                        <div title="Turn on mic">
                            <Mic />

                        </div>
                    }
                </button>
                <button
                    className={cn("px-4 py-2 bg-red-600 text-burgundy hover:bg-red-700 bg-lightBurgundy rounded-md w-[48px] h-[48px] flex justify-center items-center", {
                        "border border-lightBurgundy bg-burgundy text-lightBurgundy": cameraOn
                    })}
                    onClick={() => setCamera((prev) => !prev)}
                >
                    {!cameraOn ?
                        <div title="Turn off video">
                            <VideoOff />
                        </div>
                        :
                        <div title="Turn on video">
                            <Video />

                        </div>
                    }
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-burgundy hover:bg-red-700 bg-lightBurgundy rounded-md w-[48px] h-[48px] flex justify-center items-center"
                    onClick={handleLeaveMeeting}
                >
                    <div title="Leave the session">
                        <LogOut />
                    </div>
                </button>
            </div>
            <div></div>
        </div>
    </div>

};

export default HostView;
