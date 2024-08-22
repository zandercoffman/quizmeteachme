"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { TabsDemo } from "./other/Tabs"
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { ArrowLeftRight, BookOpen, BookOpenCheck, Clock, GraduationCap, Loader, PenSquare, PlayCircle, Sparkles } from "lucide-react"
import { Input } from "./ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

enum MeTypes {
  Quiz,
  Teach
}

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }]

const chartConfig = {
  desktop: {
    label: "Incorrect",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Correct",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function RightSide({
  setTopic,
  mode,
  setMode,
  setInStudy,
  inStudy
}: {
  setTopic: Function,
  mode: MeTypes | null,
  setMode: Function,
  setInStudy: Function,
  inStudy: boolean
}) {
  const tabs = [
    {
      title: "Overview",
      value: "Overview",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Overview Tab</p>
          <Overview mode={mode} setMode={setMode} setInStudy={setInStudy} inStudy={inStudy} />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Services tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return <>
    <TabsDemo tabs={tabs} />
    <div className="lg:hidden">
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>

  </>
}

const DummyContent = () => {
  return (
    <>
      hello
    </>
  );
};

const Overview = ({
  mode,
  setMode,
  setInStudy,
  inStudy
}: {
  mode: MeTypes | null,
  setMode: Function,
  setInStudy: Function,
  inStudy: boolean
}) => {

  const recommendations = {
    quiz: [
      { title: "Multiple-choice quiz on React Hooks basics", action: "startMultipleChoice" },
      { title: "Coding challenge using useEffect", action: "startCodingChallenge" },
      { title: "Match useState examples with their outputs", action: "startMatchingExercise" },
      { title: "Fill in the blanks in custom hook implementations", action: "startFillInBlanks" }
    ],
    teach: [
      { title: "Watch a video tutorial on advanced React Hooks", action: "watchVideo" },
      { title: "Read official React documentation on Hooks", action: "readDocumentation" },
      { title: "Practice implementing useContext in a sample project", action: "startPracticeProject" },
      { title: "Explore a case study on optimizing performance with useMemo", action: "exploreCaseStudy" }
    ]
  }

  const [cur, setCur] = useState<MeTypes | null>(mode);
  const [curbool, setCurBool] = useState<boolean>(inStudy);

  useEffect(() => {
    setCur(mode);
  }, [mode])

  useEffect(() => {
    setCurBool(inStudy);
  }, [inStudy])

  const toggleMode = () => {
    setMode(cur === MeTypes.Quiz ? MeTypes.Teach : MeTypes.Quiz)
    setCur(cur === MeTypes.Quiz ? MeTypes.Teach : MeTypes.Quiz)
  }

  return <>
    {
      curbool ? <>
        <div className="size-full p-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-row">
              {cur == MeTypes.Quiz ? <PenSquare className="mr-2" /> : <BookOpen className="mr-2" />}
              <h1 className="text-base">{cur === MeTypes.Quiz ? 'Quiz' : 'Learn'}: {"Title"}</h1>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleMode}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Switch to {cur === MeTypes.Quiz ? 'Learn' : 'Quiz'}
            </Button>
          </div>

          <Card>
            <CardContent className="flex flex-col gap-1">
              <Accordion type="single" collapsible defaultValue="item-2">
                {
                  cur === MeTypes.Quiz && <>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-base">
                        <span className="flex flex-row gap-2">
                          <Loader />
                          Progress
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-row gap-2">
                        <Chart />
                      </AccordionContent>
                    </AccordionItem>
                  </>
                }
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    <span className="flex flex-row gap-2">
                      <Sparkles />
                      Reccomendations
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-1">
                    {cur !== null && recommendations[cur === MeTypes.Quiz ? "quiz" : "teach"].map((item: { action: any; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, index: Key | null | undefined) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-3 px-4"
                      >
                        <PlayCircle className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0" />
                        <span>{item.title}</span>
                      </Button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>


            </CardContent>
          </Card>

        </div>
      </> : <>
        <div className="size-full p-2 flex flex-col gap-4">
          <p className="text-base">Select your mode.</p>
          <div className="flex flex-row gap-3 shadow-lg">
            <Button className="p-10 w-1/2  border-white border text-2xl flex flex-row gap-3 rounded-2xl transition-all cursor-pointer"
              style={
                {
                  backgroundColor: cur == MeTypes.Quiz ? "white" : "transparent",
                  color: cur == MeTypes.Quiz ? "#7e22ce" : "white"
                }
              }

              onClick={() => {
                setMode(MeTypes.Quiz);
                setCur(MeTypes.Quiz)
              }}>
              <BookOpenCheck className="w-8 h-8" />
              <span className="font-medium">Quiz</span>
            </Button>
            <Button className="p-10 w-1/2  text-2xl border-white border flex flex-row gap-3 rounded-2xl transition-all cursor-pointer"
              style={
                {
                  backgroundColor: cur == MeTypes.Teach ? "white" : "transparent",
                  color: cur == MeTypes.Teach ? "#7e22ce" : "white"
                }
              }
              onClick={() => {
                setMode(MeTypes.Teach)
                setCur(MeTypes.Teach)
              }}>
              <GraduationCap className="w-8 h-8" />
              <span className="font-medium">Teach</span>
            </Button>
          </div>
          <div className="flex mt-2 flex-row gap-3">
            <Input
              placeholder="Enter your topic here.." />
            <Button variant={"secondary"} onClick={() => {
              setInStudy(true);
              setCurBool(true)
            }}>
              Start {
                cur == MeTypes.Quiz ? "Testing" : "Studying"
              }
            </Button>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              History
            </h3>
          </div>
        </div>
      </>
    }
  </>
}

function Chart() {
  return <>
    <ChartContainer
      config={chartConfig}
      className=" aspect-square w-full max-w-[250px]"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {chartData[0].mobile}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground"
                    >
                      Questions Right
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-desktop)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="mobile"
          fill="var(--color-mobile)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  </>
}