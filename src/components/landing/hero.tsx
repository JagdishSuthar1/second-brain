import { Button } from "../ui/button";
import {easeInOut, motion} from "framer-motion"

export default function Hero() {
    return (
        <section className="py-9 w-full h-230 bg-[radial-gradient(ellipse_at_bottom_left,_#0f0f1a,_#0335,_#0000)]">
            <div className="w-full md:h-full md:flex  ">
            <div className="h-90  p-5 md:w-[60%] md:h-full md:flex md:flex-col md:justify-center lg:w-[60%] lg:px-15">
                <h1 className="text-5xl font-bold bg-gradient-to-b  from-blue-900 to-red-300 bg-clip-text  text-transparent tracking-tight lg:text-7xl">Build Your Second Brain. Remember Everything. Think Clearly</h1>
                <p className="text-[15px] text-blue-800 mt-5 lg:text-[21px] lg:mt-9 ">Capture ideas, organize knowledge, and think clearly—effortlessly. Our second brain app helps you turn scattered thoughts into structured insights, so you can focus on what matters most</p>
                <div className="flex flex-row gap-3 mt-3 tracking-tight">
                    <Button>Get started</Button>
                    <Button>Learn More</Button>
                </div>
            </div>


            <div className="w-full h-130 p-3 md:w-[39%] md:h-full md:relative md:overflow-hidden">
                <motion.img src="/cog_new.png" className="w-full h-[97%] object-cover  md:object-fit md:absolute md:w-full md:h-[97%] md:left-0 md:-top-19 md:z-29" animate={{translateY : [-25,25 ]}} transition={{
                    duration : 5,
                    ease : easeInOut
                }} />
            </div>

            </div>

        </section>
    )
}