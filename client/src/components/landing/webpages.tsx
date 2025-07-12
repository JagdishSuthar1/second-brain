import { motion} from "framer-motion"

export default function WebPages() {
    return (
        <section className=" pt-23 bg-[radial-gradient(ellipse_at_bottom_right,_#0f0f1a,_#0335,_#0000)] w-full relative overflow-x-clip ">
                <div className="flex flex-col justify-center items-center ">
                    <div className="w-[73%]">
                    <div className="px-5 flex flex-row justify-center items-center bg-gradient-to-b from-blue-900 to-amber-500 text-transparent bg-clip-text flex-wrap">
                    <h1 className="text-5xl font-bold text-center">Your Second Brain for Smarter Thinking</h1>
                    </div>
                    <p className="text-center mt-7 pb-0  text-[17px] mb-0">A Second Brain to capture ideas, link thoughts, and find what matters — fast. Organize your mind, boost clarity, and never lose a good idea again.</p>
                    </div>
                </div>
                <div className="mt-1 w-full flex justify-center items-center md:w-full  ">
                    <div className="w-full flex flex-col gap-7 px-11 md:px-27 md:py-11 md:w-full lg:px-35">
                    <motion.img src="/notesPage.png" alt=""  className=" md:w-full object-fit border-amber-700" whileHover={{scale : 1.03}} />
                    <motion.img src="/chatPage.png" alt=""  className=" md:w-full object-fit border-amber-700" whileHover={{scale : 1.03}} />
                    </div>
                </div>
        </section>
    )
}