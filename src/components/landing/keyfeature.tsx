import {  CardContent, CardHeader } from "../ui/card";
import { motion} from "framer-motion"


export default function KeyFeature() {
  const features = [
    {
      title: "Smart Note Creation",
      description:
        "Capture your thoughts in any form — text, images, videos, or links. Whether it's a tweet or a document, your second brain stores it all effortlessly.",
      icon: "FileText",
    },
    {
      title: "Lightning-Fast Search",
      description:
        "Find anything in seconds. Search across your entire knowledge base with natural language — no tags or folders needed.",
      icon: "Search",
    },
    {
      title: "AI-Powered Note Fusion",
      description:
        "Select multiple notes and let AI generate a clear, concise summary. Perfect for research, project briefs, or revisiting long threads.",
      icon: "Sparkles",
    },
    {
      title: "Superbrain Chat",
      description:
        "A shared AI space where teams, friends, or communities can connect notes, ask questions, and build collective intelligence together.",
      icon: "MessagesSquare",
    },
  ];

  return (
    <section className="p-9 bg-[radial-gradient(ellipse_at_bottom,_#facc15,_#222222,_#000000)]  w-full relative overflow-x-clip">
        <div className="mt-17 md:mt-5 flex justify-center bg-gradient-to-b from-cyan-500 to-emerald-300 text-transparent bg-clip-text">
          <h1 className="text-5xl font-bold ">Key Features</h1>
        </div>{" "}
        <div className="mt-5 px-3 flex flex-col gap-5 md:flex-row justify-center items-center  md:gap-5 md:flex-wrap  py-5">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col p-3 shadow-[0_2px_12px_#546644] border-2 gap-3 h-53 w-85 sm:w-100 md:w-full/2 md:h-full/2 bg-[#eeeeee55] rounded-2xl "
              whileHover={{scale : 1.03}}
            >
              <CardHeader className="text-center text-[17px] text-black font-bold py-1">
                {item.title}
              </CardHeader>
              <CardContent className="text-[17px] text-white">
                {item.description}
              </CardContent>
            </motion.div>
          ))}
        </div>
    </section>
  );
}
