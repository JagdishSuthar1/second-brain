import { Card, CardContent } from "../ui/card";

export default function MainPage() {
    return (
        <div className="w-full h-[99vh]">
            <Card className="rounded-none w-full h-full bg-[#191919] border-none">
                <CardContent className="flex flex-row gap-2">
                    <div className="w-[47%] flex flex-col justify-center pl-12">
                        <span className="text-5xl  text-amber-50 font-semibold">Build Your Second Brain. Remember Everything. Think Clearly.</span>
                        <span className="text-1xl mt-4 italic text-amber-50">Capture ideas, organize knowledge, and think clearly—effortlessly. Our second brain app helps you turn scattered thoughts into structured insights, so you can focus on what matters most.</span>
                    </div>
                    <div className="w-[50%] h-full">
                        <img className="w-full object-cover" src="/brainlanding.png" alt="" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}