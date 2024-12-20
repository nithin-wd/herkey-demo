"use client"
import React from 'react';
import AgoraRTC, { AgoraRTCProvider, AgoraRTCScreenShareProvider } from "agora-rtc-react";


const client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role: "host" });
const AgoraHostProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AgoraRTCProvider client={client}>
      <AgoraRTCScreenShareProvider client={client}>
        {children}
      </AgoraRTCScreenShareProvider>
    </AgoraRTCProvider>
  )
}

export default AgoraHostProvider