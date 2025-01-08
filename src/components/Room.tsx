import { cn } from "@/lib/utils";
import {
    LocalUser,
    RemoteUser,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish
} from "agora-rtc-react";
import type { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";
import LocalUserVideo from "./LocalUserVideo";

interface RoomProps {
    renderAction?: () => ReactNode;
    renderLocalUser?: () => ReactNode;
    remoteUsers: any[];
    micOn: boolean;
    cameraOn: boolean;
    showUserInfo?: boolean;
    shareScreen?: boolean;

}

export function Room({
    micOn,
    cameraOn,
    remoteUsers,
    shareScreen
}: RoomProps) {
    console.log({remoteUsers})
    // const selfPublished = micOn || cameraOn;


    return (
        <div className={cn("grid grid-cols-1 grid-rows-1 relative h-[calc(100vh-92px)]", {
            "grid-cols-[auto_200px] grid-rows-[unset] gap-4": true
        })}>
            <LocalUserVideo
                cameraOn={cameraOn}
                micOn={micOn}
            />

            <ScrollArea className="h-full">
                <div className="flex flex-col h-full w-full gap-y-2 overflow-y-auto">
                    {remoteUsers.map((user: any) => (
                        <RemoteUser
                            key={user.uid}
                            user={user}
                            className="flex flex-col items-center justify-center w-full h-full max-h-[112px] min-h-[112px]  rounded-xl relative border border-lightBurgundy"
                        />
                    ))}
                </div>
            </ScrollArea>

        </div>
    );
}