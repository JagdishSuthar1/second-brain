import {motion} from "framer-motion"

export default function LogoMover() {
return (
    <div className="w-full overflow-hidden">
    <motion.div className="flex flex-row gap-15 min-w-max pr-5 h-30 py-9 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" animate ={{translateX : '-50%'}}  transition={{duration : 30 , repeat : Infinity , repeatType : 'loop', ease : "linear"}}>
        <img src="/logo-acme.png" alt="" className="h-13 object-contain" />
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
        <img src="/logo-pulse.png" alt="" className="h-13 object-contain" />
    </motion.div>

    </div>
)
}