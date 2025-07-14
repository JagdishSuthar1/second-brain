import {motion} from "framer-motion"

export default function LogoMover() {
return (
    
    <div className="w-full overflow-hidden">
    <motion.div className="flex  min-w-max  h-30 py-9 [mask-image:linear-gradient(to_right,transparent,black,transparent)] md:text-5xl font-bold sm:text-3xl " animate ={{translateX : '-50%'}}  transition={{duration : 30 , repeat : Infinity , repeatType : 'loop', ease : "linear"}}>
        {/* <img src="/logo-acme.png" alt="" className="h-13 object-contain" />
        <img src="/logo-apex.png" alt=""  className="h-13 object-contain"/>
        <img src="/logo-pulse.png" alt="" className="h-13 object-contain" />
        <img src="/logo-celestial.png" alt=""  className="h-13 object-contain"/>
        <img src="/logo-pulse.png" alt="" className="h-13 object-contain" />
            <img src="/logo-acme.png" alt="" className="h-13 object-contain" />
        <img src="/logo-apex.png" alt=""  className="h-13 object-contain"/>
        <img src="/logo-pulse.png" alt="" className="h-13 object-contain" />
        <img src="/logo-acme.png" alt="" className="h-13 object-contain" />
        <img src="/logo-apex.png" alt=""  className="h-13 object-contain"/>
        <img src="/logo-pulse.png" alt="" className="h-13 object-contain" />
        <img src="/logo-celestial.png" alt=""  className="h-13 object-contain"/>
        <img src="/logo-pulse.png" alt="" className="h-13 object-contain" />
            <img src="/logo-acme.png" alt="" className="h-13 object-contain" />
        <img src="/logo-apex.png" alt=""  className="h-13 object-contain"/>
        <img src="/logo-pulse.png" alt="" className="h-13 object-contain" /> */}
        🚀 Second Brain — Capture rich media notes, search with tags, summarize using AI, and collaborate in real-time — all in one personal knowledge OS.

    </motion.div>

    </div>
)
}