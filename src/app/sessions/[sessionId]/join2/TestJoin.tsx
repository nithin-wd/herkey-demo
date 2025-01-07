"use client"
import AttendeeCard from "@/components/AttendeeCard";
import { MediaControl } from "@/components/MediaControl";
import { Room } from "@/components/Room";
import {
  useJoin,
  useRemoteUsers
} from "agora-rtc-react";
import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";



const TestJoin = ({ appId, channel, token, UID, currentSession }: any) => {
  const [calling, setCalling] = useState(false);


  const { isLoading, isConnected, error } = useJoin(
    {
      appid: appId,
      channel: channel,
      token: token,
      uid: UID,
    },
    calling,
  );
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const [shareScreen, setShareScreen] = useState(false);

  // remote
  const remoteUsers = useRemoteUsers();

  const renderRemoteUsers = () => {
    return (
      <div className="flex flex-col h-full gap-y-2 overflow-auto">
        {[...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers, ...remoteUsers,].map((user: any,index:number) => (
          <AttendeeCard key={index} user={user} herkeyUser={user} />
        ))}
      </div>
    );
  };

  if (error) return <div className="h-screen w-screen flex justify-center items-center">Failed please reload</div>
  if (!isLoading && !isConnected) return <WelcomeScreen setCalling={setCalling} currentSession={currentSession} />
  if (isLoading && !isConnected) return <div className="h-screen w-screen flex justify-center items-center">Please Wait</div>
  return (
    <div className="h-screen w-screen grid grid-rows-[auto_40px] p-4 gap-y-4">
      <div className="h-full">
        {calling && <Room cameraOn={cameraOn} micOn={micOn} renderRemoteUsers={renderRemoteUsers} shareScreen={shareScreen} />}
      </div>
      <MediaControl
        calling={calling}
        cameraOn={cameraOn}
        micOn={micOn}
        shareScreen={shareScreen}
        isHost={false}
        setCalling={() => {
          setCalling(a => !a);
        }}
        setCamera={() => {
          setCamera(a => !a);
        }}
        setShareScreen={() => {
          setShareScreen(a => !a);
        }}
        setMic={() => {
          setMic(a => !a);
        }}
      />
    </div>
  );
};

export default TestJoin;