"use client";

import { cn } from "@/lib/utils";
import { HerkeyRemoteUser } from "@/type";
import {
    useIsConnected,
    useJoin,
    useLocalScreenTrack,
    useRemoteUsers
} from "agora-rtc-react";
import { LogOut, Mic, MicOff, ScreenShare, ScreenShareOff, Video, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AttendeeCard from "./AttendeeCard";
import LocalUserScreenShare from "./LocalUserScreenShare";
import LocalUserVideo from "./LocalUserVideo";

const HostView = ({ sessionId, token, UID, currentSession, currentUser, chatToken, screenToken }: { sessionId: string, token: string, UID: string; currentSession: any, currentUser: any; chatToken: string; screenToken: string }) => {
    console.log({ chatToken })
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
    const [screenShare, setShareScreen] = useState(false);
    const { screenTrack, error } = useLocalScreenTrack(screenShare, {}, "auto");
    // Get remote users
    const remoteUsers: HerkeyRemoteUser[] = useRemoteUsers();
    const remoteUsersWithOutScreen = useMemo(() => remoteUsers.filter(user => user.uid !== 10000), [remoteUsers]);
    console.log({ remoteUsersWithOutScreen })
    const handleLeaveMeeting = () => {
        setCalling(false);
        router.push(`/sessions/${sessionId}`);
    }
    const currentParticipants = currentSession?.attributes?.participants
    const onCloseScreenShare = () => {
        setShareScreen(false)
    }

    useEffect(() => {
        setShareScreen(false);
    }, [error]);

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
        <div className={cn("grid grid-cols-1 grid-rows-1 relative", {
            "grid-cols-[auto_200px]  grid-rows-[unset] gap-4": remoteUsers?.length >= 1
        })}>
            <div className={cn("absolute top-0 left-0 h-[120px] w-[200px] m-2 hidden z-50", {
                "block": screenShare
            })}>
                <LocalUserVideo micOn={micOn} cameraOn={cameraOn} />
            </div>
            <div>
                {!screenShare ? <LocalUserVideo micOn={micOn} cameraOn={cameraOn} currentUser={currentUser} />
                    : <LocalUserScreenShare screenShareOn={screenShare} onCloseScreenShare={onCloseScreenShare} screenTrack={screenTrack} appConfig={{
                        appId,
                        channel,
                        token: screenToken
                    }}
                    />}
            </div>

            <div className="flex flex-col h-full w-full gap-y-2 overflow-y-auto">
                {remoteUsersWithOutScreen.map((user: any) => (
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
                        "border border-lightBurgundy bg-burgundy text-lightBurgundy": !screenShare
                    })}
                    onClick={() => setShareScreen(!screenShare)}
                >
                    {!screenShare ?
                        <div title="Turn off video">
                            <ScreenShareOff />
                        </div>
                        :
                        <div title="Turn on video">
                            <ScreenShare />

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
            <div className="flex items-center justify-end">
            </div>
        </div>
    </div>

};

export default HostView;
