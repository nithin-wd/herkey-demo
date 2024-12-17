"use client"
import React from 'react';
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";


const client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role: "host" });
const AgoraHostProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AgoraRTCProvider client={client}>
        {children}
    </AgoraRTCProvider>
  )
}

export default AgoraHostProvider