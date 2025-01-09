
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { HerkeyParticipant, HerkeySession } from "@/type";
import AgoraRTM from "agora-rtm-sdk";
import { MessageSquare, SendHorizontal } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

const { RTM } = AgoraRTM;

const ChatDrawer = ({ appId, userId, chatToken, msChannelName, currentSession }: { appId: string, userId: string, chatToken: string, msChannelName: string, currentSession: HerkeySession }) => {
    const [rtmClient, setRtmClient] = useState<any>();
    const [messages, setMessages] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentParticipants: HerkeyParticipant[] = currentSession?.attributes?.participants;
    const [chatStatus, setChatStatus] = useState("CONNECTING");


    useEffect(() => {
        const initializeRTM = async () => {
            try {
                console.log("HERKEY: initializing", appId, userId, { useStringUserId: true, logLevel: "debug", heartbeatInterval: 5 });
                // Initialize RTM instance
                const rtm = new RTM(appId, userId?.toString(), { useStringUserId: true, logLevel: "debug", heartbeatInterval: 5 });
                setRtmClient(rtm);
                console.log("HERKEY: rtm client created");
                // Subscribe to the channel


                // Add event listeners
                console.log("HERKEY: message event listener initiated");
                rtm.addEventListener("message", (event) => {

                    const sender = currentParticipants?.find((participant: HerkeyParticipant) => participant?.user_id?.toString() === event.publisher)?.user
                    setMessages((prev) => [
                        ...prev,
                        { sender: sender, text: event.message },
                    ]);
                });

                console.log("HERKEY: message event listener successful");
                console.log("HERKEY: presence event listener initiated");
                rtm.addEventListener("presence", (event: any) => {
                    const sender = currentParticipants?.find((participant: HerkeyParticipant) => participant?.user_id?.toString() === event.publisher)?.user

                    setLogs((prev) => [...prev, { sender, event, type: "presence" }]);
                });
                console.log("HERKEY: presence event listener successful");
                console.log("HERKEY: status event listener initiated");

                rtm.addEventListener("status", (event) => {
                    setChatStatus(event?.state);
                    const statusInfo = `Connection state: ${event.state}, Reason: ${event.reason}`;
                    setLogs((prev) => [
                        ...prev,
                        { sender: "INFO", state: event.state, text: statusInfo },
                    ]);
                });
                console.log("HERKEY: status event listener successful");
                console.log("HERKEY: login initiated");
                // Log in to RTM server
                const res = await rtm.login({ token: chatToken });
                console.log("HERKEY: ", { res })
                console.log("HERKEY: Logged in to RTM server");
                console.log(`HERKEY: Subscribed to channel: ${msChannelName}`);
                const subRes = await rtm.subscribe(msChannelName);
                console.log({ RTM: subRes })
                console.log(`Subscribed to channel: ${msChannelName}`);
            } catch (error) {
                console.error("HERKEY: RTM initialization error:", error);
            }
        };

        initializeRTM();
        return () => {
            if (rtmClient) rtmClient.logout();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appId, userId, chatToken, msChannelName, currentParticipants]);
    console.log("HERKEY: LOGS", chatStatus, logs)
    const sendMessage = async (e: FormEvent) => {
        e.preventDefault();
        console.log("clicked send");
        console.log({ inputMessage });
        console.log({ rtmClient });
        if (inputMessage.trim() && rtmClient) {
            try {
                const res = await rtmClient.publish(msChannelName, inputMessage);
                console.log({ HERKEY: { res } })
                setInputMessage("");
            } catch (error) {
                console.error("Failed to send message:", error);
                console.log({ HERKEY: { error } })

            }
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Sheet open={true}>
            <SheetTrigger asChild>
                <button
                    className={cn("p-2 bg-red-600 text-burgundy hover:bg-red-700 bg-lightBurgundy rounded-md w-[48px] h-[48px] flex justify-center items-center")}
                >
                    <MessageSquare />
                </button>
            </SheetTrigger>
            <SheetContent className="bg-lightGray p-0 m-0">
                <SheetTitle hidden></SheetTitle>
                <div className="grid grid-rows-[40px_auto_40px] h-[calc(100vh-16px)] pt-3 px-4 pb-1">
                    <div className="text-burgundy text-[20px] font-[500] flex items-center gap-x-2 mt-3 my-6">
                        <div>In-call Messages</div>
                        <div className={cn("h-[10px] w-[10px] rounded-full", {
                            "bg-orange-400": chatStatus === "CONNECTING",
                            "bg-red": chatStatus === "FAILED",
                            "bg-green": chatStatus === "CONNECTED",
                        })}></div></div>
                    {messages?.length > 0 ?
                        <ScrollArea className="overflow-y-auto bg-gray-50">
                            <div className="flex flex-col gap-y-2">
                                {messages?.map((msg: any, index: number) => <MessageItem msg={msg} key={index} isYou={msg.sender?.id === userId} />)}
                                <div ref={messagesEndRef}></div>
                            </div>
                        </ScrollArea>
                        :
                        <div className="text-darkGray text-[14px] text-center border-darkGray bg-bgGray p-4 rounded h-fit">No messages yet</div>
                    }
                    <form className="border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 flex w-full overflow-hidden bg-pearlWhite" onSubmit={sendMessage}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="w-full p-2 border-none outline-none bg-transparent"
                        />
                        <button
                        disabled={inputMessage?.length===0}
                            type="submit"
                            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-darkGray"
                        >
                         <SendHorizontal/>
                        </button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    )
}
export default ChatDrawer

const MessageItem = ({ msg, isYou }: any) => {

    return (
        <div
            className={cn("flex flex-row items-start gap-x-2 ", { "flex-row-reverse": isYou })}
        >
            <div className={cn("h-[40px] w-[40px] min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] rounded-full bg-lightBurgundy text-burgundy  border-burgundy font-[700] flex justify-center items-center", { "bg-bgGray text-darkGray  border-darkGray ": isYou })}>{msg.sender?.first_name?.charAt(0)}</div>
            <div className={cn("flex flex-col bg-lightBurgundy text-burgundy border-burgundy rounded p-2 w-full", { "bg-bgGray text-darkGray  border-darkGray ": isYou })}>
                <div className="text-[10px] font-[600]">{msg.sender?.first_name ?? "INFO"}</div>
                <div className="text-[16px] font-[400]"> {msg.text}</div>
            </div>

        </div>

    )
}