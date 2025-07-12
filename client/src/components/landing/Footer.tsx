
export default function Footer() {
    return (
        <footer className="bg-black text-white mt-5 py-15 flex flex-col gap-5 justify-center items-center">
            <div className="flex justify-center pt-5 items-center gap-3">
                <img src="/brain.svg" alt="" className="w-10 h-10"/> 
                <span className="text-2xl font-bold ">Second Brain</span>
            </div>
            <nav className="flex flex-row gap-3">
                <a>About us</a>
                <a>Contact</a>
                <a>Term of service</a>
            </nav>

            <div className="flex flex-col gap-5 md:flex-row">
                <img src="/social-linkedin.svg" alt="" className="w-5 h-5 bg-white rounded-full"/>
                <img src="/social-x.svg" alt="" className="w-5 h-5 bg-white rounded-full"/>
                <img src="/social-pin.svg" alt="" className="w-5 h-5 bg-white rounded-full"/>
            </div>
            <p className="text-center pb-5">  © 2025 Second Brain. All rights reserved. Built for thinkers, makers, and lifelong learners.
</p>
        </footer>
    )
}