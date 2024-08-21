import { Chatbot } from "./other/Chatbot";
import { Badge } from "./ui/badge";

export default function LeftSide() {
    return (
        <div className="flex flex-col gap-3 h-full mx-2">
            <Title />
            <Chatbot />
        </div>
    );
}

function Title() {
    return (
        <div className="flex flex-row gap-2">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                quizme/teachme
            </h3>
            <Badge>.vercel.app</Badge>
        </div>
    );
}
