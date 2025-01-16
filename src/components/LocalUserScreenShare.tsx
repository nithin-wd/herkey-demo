import type { ILocalAudioTrack, ILocalTrack, ILocalVideoTrack } from "agora-rtc-react";
import AgoraRTC, {
  AgoraRTCScreenShareProvider,
  LocalAudioTrack,
  LocalVideoTrack,
  useJoin,
  usePublish,
  useTrackEvent,
} from "agora-rtc-react";
import { useEffect, useState } from "react";


interface ShareScreenProps {
  screenShareOn: boolean;
  screenTrack: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack] | null;
  onCloseScreenShare: () => void;
  appConfig: any
}

export const ScreenShare = ({
  screenShareOn,
  screenTrack,
  onCloseScreenShare,
  appConfig
}: ShareScreenProps) => {
  const [client] = useState(() => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));

  //screen share
  const [screenVideoTrack, setScreenVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [screenAudioTrack, setScreenAudioTrack] = useState<ILocalAudioTrack | null>(null);

  //join room
  useJoin(
    {
      appid: appConfig?.appId,
      channel: appConfig.channel,
      token: appConfig.token,
      uid: appConfig?.screenShareUID,
    },
    screenShareOn,
    client,
  );

  //get screen share video track and audio track
  useEffect(() => {
    if (!screenTrack) {
      setScreenAudioTrack(null);
      setScreenVideoTrack(null);
    } else {
      if (Array.isArray(screenTrack)) {
        setScreenVideoTrack(
          screenTrack.filter(
            (track: ILocalTrack) => track.trackMediaType === "video",
          )[0] as ILocalVideoTrack,
        );
        setScreenAudioTrack(
          screenTrack.filter(
            (track: ILocalTrack) => track.trackMediaType === "audio",
          )[0] as ILocalAudioTrack,
        );
      } else {
        setScreenVideoTrack(screenTrack);
      }
    }
  }, [screenTrack]);

  //publish screen share
  usePublish([screenVideoTrack, screenAudioTrack], screenShareOn, client);

  //screen share closed
  useTrackEvent(screenVideoTrack, "track-ended", () => {
    console.log("screen sharing ended");
    onCloseScreenShare();
  });

  return (
    <AgoraRTCScreenShareProvider client={client}>
      {screenShareOn && screenVideoTrack && (
        <LocalVideoTrack
          disabled={!screenShareOn}
          play={screenShareOn}
          track={screenVideoTrack}
        />
      )}
      {screenAudioTrack && <LocalAudioTrack disabled={!screenShareOn} track={screenAudioTrack} />}
    </AgoraRTCScreenShareProvider>
  );
};

export default ScreenShare;