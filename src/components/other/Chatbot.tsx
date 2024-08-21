"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useChat, Message } from 'ai/react';

export function Chatbot() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        keepLastMessageOnError: true,
        initialMessages: [
            {
                role: "assistant",
                content: "WHAT happened?",
                id: 'hello'
            } satisfies Message
        ]
      });

    return (
        <>
            <div className="flex flex-col gap-2 size-full">
                <MessageSection messages={messages}/>
                <ChatBox />
            </div>
        </>
    );
}

function MessageSection({
    messages
}: {
    messages: Message[]
}) {
    return <>
        <div className="bg-gray-100 w-full h-[88%] px-10 py-6 rounded-2xl ">
            {messages.map((message, index) => {
                return <div className="flex items-start mb-4" key={index}>
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div className="bg-white p-3 rounded-lg shadow">
                        <p>{message.content}</p>
                    </div>
                </div>
            })}
        </div>
    </>
}

function ChatBox() {
    return <>
        <div className="bg-gray-100 w-full h-[12%] px-10 py-4 rounded-2xl">
            Hello
        </div>
    </>
}