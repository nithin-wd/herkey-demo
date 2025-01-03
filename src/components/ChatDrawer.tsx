
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import AgoraRTM from "agora-rtm-sdk";
import { useEffect, useRef, useState } from "react";

const { RTM } = AgoraRTM;

const ChatDrawer = ({ appId, userId, chatToken, msChannelName }: { appId: string, userId: string, chatToken: string, msChannelName: string }) => {
    const [rtmClient, setRtmClient] = useState<any>();
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeRTM = async () => {
            try {
                console.log("HERKEY: initializing");
                // Initialize RTM instance
                const rtm = new RTM(appId, userId, { useStringUserId: true, logLevel: "debug" });
                setRtmClient(rtm);
                console.log("HERKEY: rtm client created");


                // Log in to RTM server
                const res = await rtm.login({ token: chatToken });
                console.log("HERKEY: ", { res })
                console.log("HERKEY: Logged in to RTM server");

                // Subscribe to the channel
                console.log(`HERKEY: Subscribed to channel: ${msChannelName}`);
                await rtm.subscribe(msChannelName);
                console.log(`Subscribed to channel: ${msChannelName}`);

                // Add event listeners
                console.log("HERKEY: message event listener initiated");
                rtm.addEventListener("message", (event) => {
                    setMessages((prev) => [
                        ...prev,
                        { sender: event.publisher, text: event.message },
                    ]);
                });
                console.log("HERKEY: message event listener successful");
                console.log("HERKEY: presence event listener initiated");
                rtm.addEventListener("presence", (event: any) => {
                    const infoMessage =
                        event.eventType === "SNAPSHOT"
                            ? "I Join"
                            : `${event.publisher} is ${event?.type}`;
                    setMessages((prev) => [...prev, { sender: "INFO", text: infoMessage }]);
                });
                console.log("HERKEY: presence event listener successful");
                console.log("HERKEY: status event listener initiated");

                rtm.addEventListener("status", (event) => {
                    const statusInfo = `Connection state: ${event.state}, Reason: ${event.reason}`;
                    setMessages((prev) => [
                        ...prev,
                        { sender: "INFO", text: statusInfo },
                    ]);
                });
                console.log("HERKEY: status event listener successful");
                console.log("HERKEY: login initiated");

            } catch (error) {
                console.error("HERKEY: RTM initialization error:", error);
            }
        };

        initializeRTM();

        // return () => {
        // if (rtmClient) rtmClient.logout();
        // };
    }, [appId, userId, chatToken, msChannelName]);
    console.log("HERKEY :", rtmClient)
    const sendMessage = async () => {
        console.log("clicked send");
        console.log({ inputMessage });
        console.log({ rtmClient });
        if (inputMessage.trim() && rtmClient) {
            try {
                const res = await rtmClient.publish(msChannelName, inputMessage);
                console.log({ res })
                setMessages((prev) => [
                    ...prev,
                    { sender: "You", text: inputMessage },
                ]);
                setInputMessage("");
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button >Open</button>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle hidden></SheetTitle>
                <div className="grid grid-rows-[40px_auto_40px] h-[calc(100vh-40px)] p-0 m-0">
                    <div className="">Chat</div>
                    {messages?.length > 0 ? <div className="flex-1 p-4 overflow-y-auto bg-gray-50 border">
                        {messages?.map((msg: any, index: number) => (
                            <div
                                key={index}
                                className={`my-2 p-2 rounded ${msg.sender === "You"
                                    ? "bg-blue-100 text-blue-800 self-end"
                                    : msg.sender === "INFO"
                                        ? "bg-gray-200 text-gray-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                            >
                                <strong>{msg.sender}:</strong> {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div> : <div>empty</div>}
                    <div className="">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
export default ChatDrawer