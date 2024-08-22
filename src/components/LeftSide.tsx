"use client"
import { BotMessageSquare, Info, User } from "lucide-react";
import { Badge } from "./ui/badge";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useChat, Message } from 'ai/react';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import Markdown from 'react-markdown'

enum MeTypes {
    Quiz,
    Teach
  }

export default function LeftSide({
    topic,
    mode,
    inStudy
}: {
    topic: string,
    mode: MeTypes | null,
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
                content: "Hello! I'm your AI tutor, here to help you learn and grow. Whether you're tackling new concepts or reviewing what you've learned, I'm here to guide you every step of the way. Let's make learning an exciting journey together!",
                id: '1'
            },
            {
                role: "assistant",
                content: "On the right, you will see a form. Fill that out and you can get started on your study journey.",
                id: '2'
            },
        ]
    });

    return (
        <div className="flex flex-col gap-3 h-full mx-2">
            <div className="flex flex-row gap-2">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    quizme/teachme
                </h3>
                <Badge>.vercel.app</Badge>
                <Dialog>
                    <DialogTrigger><Info /></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
            <div className="flex flex-col gap-2 size-full">
                <MessageSection messages={messages} />
                <div className="bg-gray-100 w-full h-[12%] px-10 py-2 rounded-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-row gap-2 w-full">
                        <Input
                            name="prompt"
                            value={input}
                            onChange={handleInputChange}
                            disabled={!isStudying}
                            placeholder={!isStudying ? "Select your mode and topic first." : "Input your message here"} />

                        <Button
                            type="submit"
                            disabled={!isStudying}>
                            <ArrowRight />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function MessageSection({
    messages
}: {
    messages: Message[]
}) {
    return <>
        <div className="bg-gray-100 w-full h-[88%] px-10 py-6 rounded-2xl ">
            <ScrollArea className="max-h-[70vh] w-[40vw] overflow-auto">
                {messages.map((message, index) => {
                    return <div className={"flex flex-row items-center mb-4 !ml-auto w-full " + (message.role == 'user' ? "justify-start flex-row-reverse" : "")}  key={index}>
                        <div className={"w-10 h-10 rounded-full bg-gray-300 mr-4 " + message.role == 'user' ? "ml-2" : "mr-2"}>
                            {message.role == 'user' ? <User /> : <BotMessageSquare />}
                        </div>
                        <div className={" p-3 rounded-2xl shadow max-w-[70%] " + (message.role == 'user' ? "bg-gray-500 text-white" : "bg-white")}>
                            <Markdown>{message.content}</Markdown>
                        </div>
                    </div>
                })}
            </ScrollArea>

        </div>
    </>
}