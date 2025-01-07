import clsx from "clsx";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";


interface MediaControlProps {
  calling?: boolean;
  isHost?: boolean;
  micOn?: boolean;
  cameraOn?: boolean;
  shareScreen?: boolean;
  setMic?: () => void;
  setShareScreen?: () => void;
  setCamera?: () => void;
  setCalling?: () => void;
}
/* Camera and Microphone Controls */
export const MediaControl = ({
  calling,
  micOn,
  cameraOn,
  shareScreen,
  isHost,
  setMic,
  setCamera,
  setCalling,
  setShareScreen,
}: MediaControlProps) => (
  <>
    <div className="inset-0 top-a flex justify-center items-center gap-3 px-6 py-3 bg-#21242c c-coolgray-3">
      <div className="flex-1 flex top-0 left-0 h-full items-center gap-3 px-6 py-3">
        {setMic && (
          <button className="btn" onClick={() => setMic()}>
            {micOn ? <Mic /> : <MicOff />}
          </button>
        )}
        {setCamera && (
          <button className="btn" onClick={() => setCamera()}>
            {cameraOn ? <Video /> : <VideoOff />}
          </button>
        )}
        {isHost && setShareScreen && (
          <button className="btn" onClick={() => setShareScreen()}>
            {shareScreen ? <Video /> : <VideoOff />}
          </button>
        )}
      </div>
      {setCalling && (
        <button
          className={clsx("btn btn-phone", { "btn-phone-active": calling })}
          onClick={() => setCalling()}
        >
          {calling ? "Cut" : "Call"}
        </button>
      )}
    </div>
  </>
);