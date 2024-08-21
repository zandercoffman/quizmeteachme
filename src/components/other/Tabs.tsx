"use client";

import Image from "next/image";
import { Tabs } from "../ui/tabs";

export function TabsDemo(
    {
        tabs
    } : {
        tabs: any
    }
) {

  return (
    <div className="h-[20rem] mx-2 hidden lg:flex md:h-[40rem] [perspective:1000px] relative b flex-col max-w-5xl w-full  items-start justify-start mb-40">
      <Tabs tabs={tabs} />
    </div>
  );
}