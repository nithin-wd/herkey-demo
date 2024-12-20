"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AC from "agora-chat";


const appKey = process.env.NEXT_PUBLIC_AGORA_APP_CHAT_KEY!;
const token = process.env.NEXT_PUBLIC_AGORA_APP_CHAT_TOKEN!;
const ChatView = ({ UID }: { UID: string }) => {
    const [message, setMessage] = useState<any>("");
    const [logs, setLogs] = useState<any[]>([]);
    const chatClient = useRef<any>(null);


    // Logs out.
    // const handleLogout = () => {
    //     chatClient.current.close();
    //     setPeerId("");
    // };

    // Sends a peer-to-peer message.
   



   
    return (
        <Sheet>
            <SheetTrigger className={cn("px-4 py-2 bg-red-600 text-burgundy hover:bg-red-700 bg-lightBurgundy rounded-md w-[48px] h-[48px] flex justify-center items-center", {
                "border border-lightBurgundy bg-burgundy text-lightBurgundy": false
            })}>
                <MessageSquare className="scale-[1.4]" />
            </SheetTrigger>
            <SheetContent side={"right"} className="bg-burgundy">
                <SheetHeader >
                    <SheetTitle className="text-pureWhite">Chat</SheetTitle>
                    <SheetDescription>

                        <div
                            style={{
                                width: "500px",
                                display: "flex",
                                gap: "10px",
                                flexDirection: "column",
                            }}
                        >
                            <div>Agora Chat Examples</div>

                            <div>Welcome, {UID}</div>

                            <div>
                                <label>Peer message: </label>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Input message"
                                />
                                {/* <button onClick={handleSendMessage}>Send</button> */}
                            </div>


                            <div>Operation log</div>
                            <div
                                style={{
                                    height: "300px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    textAlign: "left",
                                }}
                            >
                                {logs.map((log, index) => (
                                    <div key={index}>{log}</div>
                                ))}
                            </div>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default ChatView