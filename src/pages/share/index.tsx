import { axiosInstance } from "@/axiosInstance";
import SidebarApp from "@/components/dashboard/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthContext } from "@/context/auth-context";
import { DashboardContext } from "@/context/dashboard-context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {  FileIcon, ImageIcon, LinkIcon, PlusIcon,  TwitterIcon, VideoIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { SearchQuery } from "@/components/dashboard/search";
import Lottie from "lottie-react";
// import type {DashboardProps} from "@/types/auth.types"
// import { Outlet } from "react-router-dom";
import loader from "@/animations/loader.json"
import ReactPlayerVideo from "@/components/reactPlayer";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import type { ContentDetailType } from "@/types/dashboard.types";
import { Label } from "@/components/ui/label";


export default function ShareAllContent() {
    const { auth } = useContext(AuthContext)!;
    const { shareFilter, setShareFilter,  setFetchingContentForDashboard, setShareDashboardContent, shareDashboardContent } = useContext(DashboardContext)!;
    const location = useLocation();
    // const [sidebarOpen, setSiderBarOpen] = useState(true);
    // const locationRef = useRef<object>(location)

    async function fetchingShareContent(userId: string) {

        try {
            const response = await axiosInstance.get(`/api/v1/share/${userId}`);
            console.log(response.data)
            if (response.data.success) {
                setShareDashboardContent(response.data.data);
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

    async function fetchingShareContentAccordingToType(userId: string, type: string) {
        const response = await axiosInstance.get(`/api/v1/share/${userId}/${type}`);
        console.log(response.data)
        if (response.data.success == true) {
            setShareDashboardContent(response.data.data);
        }
    }


    useEffect(() => {
        const contentType = sessionStorage.getItem("sharetype");
        console.log("share type at first mount", contentType);
        const shareUserId = window.location.pathname.split("/")[3]
        // const {id}  = useParams()
        // const shareUserId = id;
        if (contentType == null) {
            setShareFilter("All Notes");
            fetchingShareContent(shareUserId);
        }
        else {
            const typeFromSession = JSON.parse(contentType);
            console.log("type from session", typeof typeFromSession)
            setShareFilter(typeFromSession);

            fetchingShareContentAccordingToType(shareUserId, typeFromSession);
        }


        return () => {
            sessionStorage.removeItem("sharetype");
        }

    }, [])


    async function handleAddTouYourBrain(item: ContentDetailType) {
        // console.log(contentDetail);

        if (auth.user != null) {
            console.log(item)
            const contentBodyForAdd = {
                link: item.link,
                type: item.type,
                title: item.title,
                data: item.data,
                video_image_url: item.video_image_url,
                public_id: item.public_id,
                allTags: item.allTags,
            }
            console.log(contentBodyForAdd)
            try {
                const response = await axiosInstance.post(`/api/v1/content/add-content/${auth.user.userId}`, contentBodyForAdd);
                if (response.data.success == true) {
                    toast.success(response.data.message);

                    setFetchingContentForDashboard(true);
                }
                else {
                    toast.error(response.data.message)
                }
            }
            catch (err: any) {
                // toast.error(err);
                console.log(err)
            }

        }
    }





    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const typeFromURL = queryParams.get("sharetype");
        console.log("type when location change", typeFromURL)
        if (typeFromURL != null) {
            const typeFromQuery = queryParams.get("sharetype")!;
            setShareFilter(typeFromQuery);
            const shareUserId = window.location.pathname.split("/")[3]
            fetchingShareContentAccordingToType(shareUserId, typeFromQuery);

        }
        else {
            setShareFilter("All Notes");
            const shareUserId = window.location.pathname.split("/")[3]
            fetchingShareContent(shareUserId);

        }

        // return ()=>{
        //     setFilter("All Notes")
        //     sessionStorage.removeItem("type")
        // }


    }, [location.search])



    // async function handleDeleteContent(userId: string, contentId: string) {
    //     console.log(userId + " " + contentId);
    //     const response = await axiosInstance.delete(`/api/v1/content/delete-content/${userId}/${contentId}`)
    //     if (response.data.success == true) {
    //         setShareDashboardContent(response.data.data)
    //         toast.success(response.data.message);
    //     }
    //     else {
    //         toast.error(response.data.message)
    //     }
    // }


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
                    <SidebarTrigger className="hover:cursor-pointer bg-amber-400 "  />
                    <div className="flex flex-row gap-7 w-f">

                        <Link to={"/dashboard"} className="mt-[5.3px]"><span className="text-amber-50  text-[18px]  mt-2">Go To My Dashboard</span></Link>
                        <Button className="hover:cursor-pointer w-20 text-amber-50 hover:bg-amber-50 hover:text-black  text-[17px]" onClick={() => handleLogout()}>log out</Button>
                    </div>
                    <SearchQuery />
                </div>
                <Card className="bg-[#191919] h-[95%] p-3 w-full">
                    <CardHeader className=" bg-amber-400 rounded-[5px] ">
                        <div className="flex flex-row justify-between w-full h-full mt-2 rounded-[5px]">
                            <span className="text-2xl font-semibold">{shareFilter.toUpperCase()}</span>

                        </div>
                    </CardHeader>
                    {shareDashboardContent ?
                        <ScrollArea className="w-vw h-[90%]">
                            <CardContent className="w-full h-full flex flex-row flex-wrap gap-5 items-start">
                                {[...shareDashboardContent].length > 0 ?
                                    [...shareDashboardContent].map((item, index) => (
                                        <Card key={index} className="w-85 h-80 bg-[#222222] font-sans flex flex-col gap-3 p-2">
                                            <CardHeader className="w-full h-15 flex flex-row justify-between gap-1 rounded-1xl p-2">
                                                <div className="w-[60%] pt-2 h-[97%] flex flex-row justify-between rounded-[5px]">
                                                    {item.type == "video" ? <VideoIcon className="text-white" /> : item.type == "document" ? <FileIcon className="text-white" /> : item.type == "image" ? <ImageIcon className="text-white" /> : item.type == "tweet" ? <TwitterIcon className="text-white" /> : ""}
                                                    <ScrollArea className="w-[80%] h-full whitespace-nowrap">
                                                        <span className="text-[15px] text-amber-50 font-semibold font-sans">{item.title}</span>
                                                        <ScrollBar orientation="horizontal" />
                                                    </ScrollArea>
                                                </div>
                                                <div className="w-[40%] flex flex-row  pl-5 justify-end r-0">
                                                    {/* //this button is sending backend request to share */}
                                                    {/* <AddTouYourBrain/> */}

                                                    {/* //////////////////////////////// */}

                                                    <AlertDialog>
                                                        <AlertDialogTrigger><Button className="hover:cursor-pointer">
                                                            <PlusIcon />
                                                        </Button></AlertDialogTrigger>
                                                        <AlertDialogContent className="bg-[#191919] text-amber-50">
                                                            <AlertDialogHeader className="bg-amber-200  text-black rounded-[7px] p-[3px] pl-3 pt-[7px]">Are you Sure to Add this Note to Your Brain
                                                                <AlertDialogDescription></AlertDialogDescription> </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel className="text-black hover:cursor-pointer">Cancel</AlertDialogCancel>
                                                                <AlertDialogAction className="hover:cursor-pointer" onClick={() => handleAddTouYourBrain(item)}>Add</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>



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
                                                <div className="font-sans  ml-[3px] pl-1 bg-amber-100 rounded-[5px] mt-2 text-black">{item.data}</div>

                                                {item.link ?
                                                    <div className="h-10 mt-2">
                                                        <Label className="pl-1 h-3 text-amber-50">Link</Label>

                                                        <div className="font-sans  ml-[3px] pl-1 bg-amber-200 h-7 rounded-[5px]  text-black flex flex-row justify-between mt-2 hover:cursor-pointer w-full  mr-1" onClick={() => handleCopy(item.link)}>
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
                                        </Card>))
                                    : <div>No data found</div>}
                            </CardContent>
                        </ScrollArea>
                        : <Lottie animationData={loader} className="white w-full h-[90%]" />}
                </Card>
            </main>
        </SidebarProvider>
    )

}