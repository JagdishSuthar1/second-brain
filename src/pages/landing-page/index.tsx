import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import KeyFeature from "@/components/landing/keyfeature";
import LogoMover from "@/components/landing/logoMover";
import WebPages from "@/components/landing/webpages";
// import { Outlet } from "react-router-dom";


export default function LandingPage() {
    return (
        <div>
            <Header/>
            {/* <Outlet/> */}
            <Hero/>
            <LogoMover/>
            <WebPages/>
            <KeyFeature/>
            <Footer/>
        </div>
    )
}
