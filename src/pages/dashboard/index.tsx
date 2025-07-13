import { axiosInstance } from "@/axiosInstance";
import AddContentDialog from "@/components/dashboard/addcontentdialog";
import SidebarApp from "@/components/dashboard/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthContext } from "@/context/auth-context";
import { DashboardContext } from "@/context/dashboard-context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DeleteIcon, EyeClosedIcon, EyeIcon, FileIcon, ImageIcon, LinkIcon, SearchIcon, Share2Icon, TwitterIcon, VideoIcon } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchQuery } from "@/components/dashboard/search";
import Lottie from "lottie-react";
// import type {DashboardProps} from "@/types/auth.types"
// import { Outlet } from "react-router-dom";
import loader from "@/animations/loader.json"
import ReactPlayerVideo from "@/components/reactPlayer";
// import { Skeleton } from "@/components/ui/skeleton";
import ShareContent from "@/components/dashboard/share";
import { Label } from "@/components/ui/label";
import ShareContentSinlge from "@/components/dashboard/shareSingle";
import ShareContentSingle from "@/components/dashboard/shareSingle";
import CryptoJS from 'crypto-js'
import ShareContentSingleDialog from "@/components/dashboard/shareSingle";
const secretKey = "Jagdish-Suthar";

export default function DashboardPage() {
    const { auth } = useContext(AuthContext)!;
    const { dashboardData, setDashboardData, filter, setFilter, searchOpen, setSearchOpen,
        fetchingContentForDashboard, setFetchingContentForDashboard,
        setShareContentData
    } = useContext(DashboardContext)!;
    const location = useLocation();
    const [sidebarOpen, setSiderBarOpen] = useState(true);
    const locationRef = useRef<object>(location)

    async function fetchingContent(userId: string) {

        try {
            const response = await axiosInstance.get(`/api/v1/content/${userId}`);
            console.log(response.data)
            if (response.data.success) {
                setDashboardData(response.data.data);
            }
            // else {

            // }
        }
        catch (err) {
            console.log(err)
        }
    }

    const { setAuth } = useContext(AuthContext)!;
    const navigate = useNavigate();
    function handleLogout() {
        setAuth({
            authenticated: false,
            user: {
                userId: "",
                token: ""
            }
        })

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        navigate("/auth")
    }

    async function fetchingContentAccordingToType(userId: string, type: string) {
        const response = await axiosInstance.get(`/api/v1/content/${userId}/${type}`);
        console.log(response.data)
        if (response.data.success == true) {
            setDashboardData(response.data.data);
        }
    }


    useEffect(() => {
        const contentType = sessionStorage.getItem("type");
        console.log("type at first mount", contentType)
        if (contentType == null) {
            const user = sessionStorage.getItem("user");
            if (user != null) {
                setFilter("All Notes")
                const userInfo = JSON.parse(user);
                fetchingContent(userInfo.userId);
                setFetchingContentForDashboard(false);
            }
        }
        else {
            const typeFromSession = JSON.parse(contentType);
            console.log("type from session", typeof typeFromSession)
            setFilter(typeFromSession);

            const user = sessionStorage.getItem("user");
            if (user != null) {
                const userInfo = JSON.parse(user);
                // console.log("calling type")
                fetchingContentAccordingToType(userInfo.userId, typeFromSession);
                setFetchingContentForDashboard(false);
            }
        }

        return () => {
            sessionStorage.removeItem("type");
        }

    }, [])



    useEffect(() => {
        // console.log(window.location.href)

        if (location != locationRef.current || fetchingContentForDashboard == true) {
            locationRef.current = location
            const queryParams = new URLSearchParams(window.location.search);
            const typeFromURL = queryParams.get("type");
            console.log("type when location change", typeFromURL)
            if (typeFromURL != null) {
                const typeFromQuery = queryParams.get("type")!;
                setFilter(typeFromQuery);
                if (auth.user != null) {
                    fetchingContentAccordingToType(auth.user.userId, typeFromQuery);
                    setFetchingContentForDashboard(false);
                }
            }
            else {
                setFilter("All Notes");
                if (auth.user != null) {
                    fetchingContent(auth.user.userId);
                    setFetchingContentForDashboard(false);
                }
            }

            // return ()=>{
            //     setFilter("All Notes")
            //     sessionStorage.removeItem("type")
            // }

        }
    }, [location.search, fetchingContentForDashboard])



    async function handleDeleteContent(userId: string, contentId: string) {
        console.log(userId + " " + contentId);
        const response = await axiosInstance.delete(`/api/v1/content/delete-content/${userId}/${contentId}`)
        if (response.data.success == true) {
            setDashboardData(response.data.data)
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message)
        }
    }


    async function handleCopy(link: string) {
        try {
            await navigator.clipboard.writeText(link);
            toast.success("Link Copied")
        }
        catch (err) {
            toast.error("Failed to Copy")
        }
    }
    return (
        <SidebarProvider className="w-screen h-screen border-box font-sans">
            <SidebarApp />
            <Toaster />
            <main className={`p-3 bg-[#191919] w-full h-screen flex flex-col gap-2 r-0`}>
                <div className={`flex flex-row w-full r-0 justify-between`}>
                    <SidebarTrigger className="hover:cursor-pointer bg-amber-400 " onClick={() => setSiderBarOpen(e => !e)} />
                    <div className="flex flex-row gap-7 w-f">

                        <Button className="text-white  hover: cursor-pointer " onClick={() => setSearchOpen(open => !open)}><SearchIcon /></Button>
                        <Link to={"/chats"} className="mt-[5.3px]"><span className="text-amber-50  text-[18px]  mt-2">Super Brain</span></Link>
                        <Link to={"/dashboard"} className="mt-[5.3px]"><span className="text-amber-50  text-[18px]  mt-2">Dashboard</span></Link>
                        <Button className="hover:cursor-pointer w-20 text-amber-50 hover:bg-amber-50 hover:text-black  text-[17px]" onClick={() => handleLogout()}>log out</Button>
                    </div>
                    <SearchQuery />
                </div>
                <Card className="bg-[#191919] h-[95%] p-3 w-full">
                    <CardHeader className=" bg-amber-400 rounded-[5px] ">
                        <div className="flex flex-row justify-between w-full h-full mt-2 rounded-[5px]">
                            <span className="text-2xl font-semibold">{filter.toUpperCase()}</span>
                            <div className="flex flex-row gap-5 rounded-[5px]">
                                <ShareContent />
                                {/* <Button className="flex flex-row gap-3 hover:cursor-pointer">
                                    <PlusIcon className="text-white "/>
                                    <span>Add Content</span>
                                </Button> */}

                                <AddContentDialog />
                            </div>
                        </div>
                    </CardHeader>
                    {dashboardData ?
                        <ScrollArea className="w-vw h-[90%]">
                            <CardContent className="w-full h-full flex flex-row flex-wrap gap-5  sm:flex-row sm:items-center sm:justify-center">
                                {[...dashboardData].length > 0 ?
                                    [...dashboardData].map((item, index) => (
                                        // <Link  to={`/details/single/${item._id}`} onClick={()=> {
                                        //         setShareContentData(item)  
                                        //    }}   className="hover:cursor-pointer">

                                        <Card key={index} className="w-85 h-80 bg-[#222222] font-sans flex flex-col gap-3 p-2 ">
                                            <CardHeader className="w-full h-15 flex flex-row justify-between rounded-1xl p-2 gap-0">
                                                <div className="w-[55%] pt-2 h-[97%] flex flex-row justify-between rounded-[5px]">
                                                    {item.type == "video" ? <VideoIcon className="text-white" /> : item.type == "document" ? <FileIcon className="text-white" /> : item.type == "image" ? <ImageIcon className="text-white" /> : item.type == "tweet" ? <TwitterIcon className="text-white w-[10%]" /> : ""}
                                                    <ScrollArea className="w-[85%] h-full whitespace-nowrap">
                                                        <span className="text-[15px] text-amber-50 font-semibold font-sans">{item.title}</span>
                                                        <ScrollBar orientation="horizontal" />
                                                    </ScrollArea>
                                                </div>
                                                <div className="w-[40%] flex flex-row justify-start  gap-2 r-0">
                                                    {/* //this button is sending backend request to share */}
                                                    <ShareContentSingleDialog contentId={item._id} />

                                                    <Button className="hover:cursor-pointer" onClick={() => {
                                                        if (auth.user != null) {
                                                            handleDeleteContent(auth.user.userId, item._id)
                                                        }
                                                    }
                                                    }>
                                                        <DeleteIcon />
                                                    </Button>
                                                    <Button className="hover:cursor-pointer" onClick={() => {
                                                        // setShareContentData(item) 
                                                        const hashedUserId = encodeURIComponent(CryptoJS.AES.encrypt(item._id, secretKey).toString());
                                                        const singleContentString = `/details/single/${hashedUserId}`
                                                        navigate(singleContentString)
                                                    }}>
                                                        <EyeIcon />
                                                    </Button>

                                                </div>
                                            </CardHeader>
                                            <ScrollArea className=" h-44 ">
                                                {item.video_image_url ?
                                                    <CardContent className="p-3 text-amber-50 bg-black rounded-[5px] h-50 w-full">
                                                        <div className="flex flex-col gap-5  h-full ">
                                                            <div><ReactPlayerVideo videoUrl={item.video_image_url} /></div>

                                                        </div>


                                                    </CardContent> : <></>}
                                                <Label className="pl-1 mt-2 text-amber-50">Data</Label>
                                                <div className="font-sans ml-[3px] pl-1 bg-amber-100 rounded-[5px] mt-2 text-black">{item.data}</div>

                                                {item.link ?
                                                    <div className="h-10 mt-2">
                                                        <Label className="pl-1 h-3 text-amber-50">Link</Label>

                                                        <div className="font-sans  ml-[3px] pl-1 bg-amber-200 h-7 rounded-[5px] pl-1 text-black flex flex-row justify-between mt-2 hover:cursor-pointer w-full  mr-1" onClick={() => handleCopy(item.link)}>
                                                            {item.link}
                                                            <LinkIcon className="w-5 h-5 mt-1 pr-1" /></div></div> : <></>}


                                            </ScrollArea>
                                            <CardFooter className="bg-white h-15 rounded-[5px] pl-0 flex flex-col gap-1 justify-end w-full">
                                                <div className="flex flex-row gap-2 justify-start h-6  mt-1 w-full pl-10">
                                                    {item.allTags.map((tagItem, tagIndex) => (
                                                        <span key={tagIndex} className="bg-blue-200 rounded-[7px] p-[1.1px] text-[13px]">{tagItem.title}</span>
                                                    ))

                                                    }
                                                </div>
                                                <span className="text-black text-[11px] flex flex-col justify-end">Added on {item.created}</span>
                                            </CardFooter>
                                        </Card>

                                        // </Link> 

                                    ))

                                    : <div className="text-amber-50">No data found</div>}
                            </CardContent>
                        </ScrollArea>
                        : <Lottie animationData={loader} className="white w-full h-[90%]" />}
                </Card>
            </main>
        </SidebarProvider>
    )

}