import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Home() {
  return (
    <main className="px-16 py-10 h-screen w-screen overflow-hidden">
      <div className="flex flex-col size-full lg:flex-row gap-4">
        <ResizablePanelGroup className="!flex-col lg:!flex-row" direction={"horizontal"}>
          <ResizablePanel className=" lg:w-auto">
            <LeftSide />
          </ResizablePanel>
          <ResizableHandle withHandle className="max-h-[80vh] my-auto hidden lg:flex" />
          <ResizablePanel>
            <RightSide />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
