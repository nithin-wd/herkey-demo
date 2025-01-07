import { cn } from "@/lib/utils";
import {
    LocalUser,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish
} from "agora-rtc-react";
import type { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface RoomProps {
    renderAction?: () => ReactNode;
    renderLocalUser?: () => ReactNode;
    renderRemoteUsers?: () => ReactNode;
    micOn: boolean;
    cameraOn: boolean;
    showUserInfo?: boolean;
    shareScreen?: boolean;
}

export function Room({
    micOn,
    cameraOn,
    renderRemoteUsers,
    shareScreen
}: RoomProps) {
    // const selfPublished = micOn || cameraOn;

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    return (
        <div className={cn("grid grid-cols-1 grid-rows-1 relative h-[calc(100vh-92px)]", {
            "grid-cols-[auto_200px] grid-rows-[unset] gap-4": true
        })}>
            <LocalUser
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                className="rounded-xl relative"
            />

            <ScrollArea className="h-full">
                {renderRemoteUsers ? renderRemoteUsers() : undefined}
            </ScrollArea>

        </div>
    );
}