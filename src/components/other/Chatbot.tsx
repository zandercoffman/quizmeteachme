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
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"



export function Chatbot({
    inStudy
}: {
    inStudy: boolean
}) {

    const [isStudying, setIsStudying] = useState(inStudy);
    useEffect(() => {
        setIsStudying(inStudy)
    }, [inStudy])

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
                <MessageSection messages={messages} />
                <ChatBox handleSubmit={handleSubmit} input={input} handleInputChange={handleInputChange} inStudy={isStudying} />
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
            <ScrollArea className="max-h-full">
                {messages.map((message, index) => {
                    return <div className="flex items-start mb-4" key={index}>
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                        <div className="bg-white p-3 rounded-lg shadow">
                            <p>{message.content}</p>
                        </div>
                    </div>
                })}
            </ScrollArea>

        </div>
    </>
}

function ChatBox({
    handleSubmit,
    input,
    handleInputChange,
    inStudy
}: {
    handleSubmit: FormEventHandler<HTMLFormElement>,
    input: string,
    handleInputChange: ChangeEventHandler<HTMLInputElement>,
    inStudy: boolean
}) {

    const [inStudyWHAT, setToStudy] = useState<boolean>(inStudy);
    useEffect(() => {
        setToStudy(inStudy)
    }, [inStudy])

    return <>
        <div className="bg-gray-100 w-full h-[12%] px-10 py-2 rounded-2xl">
            <form onSubmit={handleSubmit} className="flex flex-row gap-2 w-full">
                <Input
                    name="prompt"
                    value={input}
                    onChange={handleInputChange}
                    disabled={!inStudyWHAT}
                    placeholder="Input your message here" />

                <Button
                    type="submit">
                    <ArrowRight />
                </Button>
            </form>
        </div>
    </>
}