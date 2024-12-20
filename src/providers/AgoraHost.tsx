"use client"
import React from 'react';
import AgoraRTC, { AgoraRTCProvider, AgoraRTCScreenShareProvider } from "agora-rtc-react";


export const client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role: "host" });
export const screenClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
       
const AgoraHostProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AgoraRTCProvider client={client}>
      <AgoraRTCScreenShareProvider client={screenClient}>
        {children}
      </AgoraRTCScreenShareProvider>
    </AgoraRTCProvider>
  )
}

export default AgoraHostProvider