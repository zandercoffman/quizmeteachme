"use client"

import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useState, useEffect } from 'react'

export enum MeTypes {
  Quiz,
  Teach
}

export default function Home() {

  const [topic, setTopic] = useState<string>("");
  const [mode, setMode] = useState<MeTypes | null>(MeTypes.Teach);
  const [inStudy, setInStudy] = useState<boolean>(false);

  const [right, setRight] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);

  return (
    <main className="px-16 py-10 h-screen w-screen overflow-hidden">
      <div className="flex flex-col size-full lg:flex-row gap-4">
        <div className="flex flex-col lg:flex-row size-full">
          <div className="w-full lg:w-1/2 h-full">
            <LeftSide
              topic={topic}
              mode={mode} 
              inStudy={inStudy}/>
          </div>
          <div className="w-full lg:w-1/2 h-full">
            <RightSide
              setTopic={setTopic}
              mode={mode}
              setMode={setMode} 
              setInStudy={setInStudy}
              inStudy={inStudy}/>
          </div>
        </div>
      </div>
    </main>
  );
}
