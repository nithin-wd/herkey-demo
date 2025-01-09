import { cn } from '@/lib/utils';
import { LocalUser, useLocalMicrophoneTrack, useLocalCameraTrack, usePublish, useRTCClient } from 'agora-rtc-react'
import { MicOff } from 'lucide-react';
import React, { useEffect } from 'react'

const LocalUserVideo = ({
  cameraOn, micOn, currentUser, isHost = false
}: any) => {
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn, {
    encoderConfig: "1080p_5",
    // Set the video transmission optimization mode to prioritize quality ("detail"), or smoothness ("motion")
    optimizationMode: "detail"
  });
  const client = useRTCClient()
  usePublish([localMicrophoneTrack, localCameraTrack], cameraOn || micOn, client);
  useEffect(() => {
    if (localMicrophoneTrack)
      localMicrophoneTrack.setEnabled(micOn);
  }, [micOn, localMicrophoneTrack])

  return (
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
      <span className="absolute text-[12px] font-medium text-lightBurgundy bottom-[12px] left-[12px]">{isHost ? "You" : `${currentUser?.user?.first_name} ${currentUser?.user?.last_name}`}</span>
    </LocalUser>
  )
}

export default LocalUserVideo