import { axiosInstance } from "@/axiosInstance";
import AddContentDialog from "@/components/dashboard/addcontentdialog";
import SidebarApp from "@/components/dashboard/slider";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthContext } from "@/context/auth-context";
import { DashboardContext } from "@/context/dashboard-context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    DeleteIcon,
    EllipsisVerticalIcon,
    EyeIcon,
    FileIcon,
    ImageIcon,
    LinkIcon,
    MenuIcon,
    SearchIcon,
    TwitterIcon,
    VideoIcon,
} from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchQuery } from "@/components/dashboard/search";
import Lottie from "lottie-react";
// import type {DashboardProps} from "@/types/auth.types"
// import { Outlet } from "react-router-dom";
import loader from "@/animations/loader.json";
import ReactPlayerVideo from "@/components/reactPlayer";
// import { Skeleton } from "@/components/ui/skeleton";
import ShareContent from "@/components/dashboard/share";
import { Label } from "@/components/ui/label";
import ShareContentSingleDialog from "@/components/dashboard/shareSingle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CryptoJS from "crypto-js";
const secretKey = "Jagdish-Suthar";

export default function DashboardPage() {
    const { auth } = useContext(AuthContext)!;
    const {
        dashboardData,
        setDashboardData,
        filter,
        setFilter,
        setSearchOpen,
        fetchingContentForDashboard,
        setFetchingContentForDashboard,
    } = useContext(DashboardContext)!;
    const navigate = useNavigate();

    if (auth.authenticated == false) {
        navigate("/auth");
    }

    const location = useLocation();
    // const [sidebarOpen, setSiderBarOpen] = useState(true);
    const locationRef = useRef<object>(location);

    async function fetchingContent(userId: string) {
        try {
            const response = await axiosInstance.get(`/api/v1/content/${userId}`);
            ////////////console.log(response.data);
            if (response.data.success) {
                setDashboardData(response.data.data);
            }
            // else {

            // }
        } catch (err) {
            ////////////console.log(err);
        }
    }

    const { setAuth } = useContext(AuthContext)!;
    function handleLogout() {
        setAuth({
            authenticated: false,
            user: {
                userId: "",
                token: "",
            },
        });

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        navigate("/auth");
    }

    async function fetchingContentAccordingToType(userId: string, type: string) {
        const response = await axiosInstance.get(
            `/api/v1/content/${userId}/${type}`
        );
        ////////////console.log(response.data);
        if (response.data.success == true) {
            setDashboardData(response.data.data);
        }
    }

    useEffect(() => {
        if (auth && auth.authenticated == false) {
            navigate("/");
        }

        const contentType = sessionStorage.getItem("type");
        ////////////console.log("type at first mount", contentType);
        if (contentType == null) {
            const user = sessionStorage.getItem("user");
            if (user != null) {
                setFilter("All Notes");
                const userInfo = JSON.parse(user);
                fetchingContent(userInfo.userId);
                setFetchingContentForDashboard(false);
            }
        } else {
            const typeFromSession = JSON.parse(contentType);
            ////////////console.log("type from session", typeof typeFromSession);
            setFilter(typeFromSession);

            const user = sessionStorage.getItem("user");
            if (user != null) {
                const userInfo = JSON.parse(user);
                // ////////////console.log("calling type")
                fetchingContentAccordingToType(userInfo.userId, typeFromSession);
                setFetchingContentForDashboard(false);
            }
        }

        return () => {
            sessionStorage.removeItem("type");
        };
    }, []);

    useEffect(() => {
        // ////////////console.log(window.location.href)

        if (
            location != locationRef.current ||
            fetchingContentForDashboard == true
        ) {
            locationRef.current = location;
            const queryParams = new URLSearchParams(window.location.search);
            const typeFromURL = queryParams.get("type");
            ////////////console.log("type when location change", typeFromURL);
            if (typeFromURL != null) {
                const typeFromQuery = queryParams.get("type")!;
                setFilter(typeFromQuery);
                if (auth.user != null) {
                    fetchingContentAccordingToType(auth.user.userId, typeFromQuery);
                    setFetchingContentForDashboard(false);
                }
            } else {
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
    }, [location.search, fetchingContentForDashboard]);

    async function handleDeleteContent(userId: string, contentId: string) {
        ////////////console.log(userId + " " + contentId);
        const response = await axiosInstance.delete(
            `/api/v1/content/delete-content/${userId}/${contentId}`
        );
        if (response.data.success == true) {
            setDashboardData(response.data.data);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }

    async function handleCopy(link: string) {
        try {
            await navigator.clipboard.writeText(link);
            toast.success("Link Copied");
        } catch (err) {
            toast.error("Failed to Copy");
        }
    }
    return (
        <SidebarProvider className="w-screen h-screen border-box font-sans" style={{ "--sidebar-width": "21rem" } as React.CSSProperties}>
            <SidebarApp />
            <Toaster />
            <main
                className={`p-3 bg-[#191919] w-full min-h-max flex flex-col gap-2 r-0 relative`}
            >
                    <div className={`flex flex-row w-full r-0 justify-between sticky top-0 px-3`}>
                        <SidebarTrigger className="hover:cursor-pointer bg-amber-400 " />



                        <div className="hidden md:flex md:flex-row md:gap-7  md:r-0 ">
                                <Button
                                    className="text-white  hover: cursor-pointer "
                                    onClick={() => setSearchOpen((open) => !open)}
                                >
                                    <SearchIcon />
                                </Button>
                                <Link to={"/chats"} className="mt-[5.3px]">
                                    <span className="text-amber-50  md:text-[18px]  mt-2">
                                        Super Brain
                                    </span>
                                </Link>
                                <Link to={"/dashboard"} className="mt-[5.3px]">
                                    <span className="text-amber-50  md:text-[18px]  mt-2">
                                        Dashboard
                                    </span>
                                </Link>
                                <Button
                                    className="hover:cursor-pointer  w-20 text-amber-50 hover:bg-amber-50 hover:text-black  md:text-[17px]"
                                    onClick={() => handleLogout()}
                                >
                                    log out
                                </Button>
                            <div className="w-70 hidden px-13">
                                <SearchQuery />
                            </div>

                        </div>

                        
                        <div className="flex md:hidden">

                                <Popover>
                                    <PopoverTrigger className="hover:cursor-pointer">
                                        <MenuIcon className="w-5 h-5 text-white md:hidden mt-[5px] " />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-31 h-43 mr-9 py-3 px-2 bg-[#333131] md:hidden">
                                        <div className="flex flex-col gap-[5px] ">
                                            <Button
                                                className="text-white  hover: cursor-pointer "
                                                onClick={() => setSearchOpen((open) => !open)}
                                            >
                                                <SearchIcon /><span>Search</span>
                                            </Button>
                                            <Link to={"/chats"} className="mt-[5.3px] text-center">
                                                <span className="text-amber-50  md:text-[18px]  mt-2 ">
                                                    Super Brain
                                                </span>
                                            </Link>
                                            <Link to={"/dashboard"} className="mt-[5.3px] text-center">
                                                <span className="text-amber-50  md:text-[18px]  mt-2">
                                                    Dashboard
                                                </span>
                                            </Link>
                                            <Button
                                                className="hover:cursor-pointer mt-1 text-center mx-3 w-20 text-amber-50 hover:bg-amber-50 hover:text-black  md:text-[17px]"
                                                onClick={() => handleLogout()}
                                            >
                                                log out
                                            </Button>
                                        </div>
                                        <div className="w-70 hidden px-13">
                                            <SearchQuery />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>




                <Card className="bg-[#191919] h-[95%] p-3 w-full">
                    <CardHeader className=" bg-amber-400 rounded-[5px] px-3">
                        <div className="flex flex-row justify-between w-full h-full mt-2 rounded-[5px]">
                            <span className="md:text-2xl font-semibold text-[17px] mt-[5px] md:mt-0">
                                {filter.toUpperCase()}
                            </span>
                            <div className="flex flex-row md:gap-5  gap-[5px] rounded-[5px] r-0">
                                <ShareContent />
                                {/* <Button className="flex flex-row gap-3 hover:cursor-pointer">
                                    <PlusIcon className="text-white "/>
                                    <span>Add Content</span>
                                </Button> */}

                                <AddContentDialog />
                            </div>
                        </div>
                    </CardHeader>
                    {dashboardData ? (
                        <ScrollArea className="w-vw  overflow-hidden">
                            
                            <div className=" flex flex-wrap justify-center items-center sm:flex-col sm:items-center ">
                                <CardContent className="flex flex-row flex-wrap md:gap-5 sm:gap-5 gap-5 w-[90%]  items-center -safe md:items-center  not-md:justify-center">
                                    {[...dashboardData].length > 0 ? (
                                        [...dashboardData].map((item, index) => (
                                            // <Link  to={`/details/single/${item._id}`} onClick={()=> {
                                            //         setShareContentData(item)
                                            //    }}   className="hover:cursor-pointer">

                                            <Card
                                                key={index}
                                                className="md:w-87 sm:w-90 w-77  h-79 sm:h-80 bg-[#222222] font-sans flex flex-col gap-3 p-2 "
                                            >
                                                <CardHeader className="w-full h-15 flex flex-row justify-between rounded-1xl p-2 gap-3">
                                                    <div className="sm:w-[51%] w-[80%] pt-2 h-[97%] gap-3 flex flex-row justify-between rounded-[5px] ml-0 mr-2">
                                                        {item.type == "video" ? (
                                                            <VideoIcon className="text-white" />
                                                        ) : item.type == "document" ? (
                                                            <FileIcon className="text-white" />
                                                        ) : item.type == "image" ? (
                                                            <ImageIcon className="text-white" />
                                                        ) : item.type == "tweet" ? (
                                                            <TwitterIcon className="text-white w-[10%]" />
                                                        ) : (
                                                            ""
                                                        )}
                                                        <ScrollArea className="w-[75%] h-full whitespace-nowrap">
                                                            <span className="text-[15px] text-amber-50 font-semibold font-sans">
                                                                {item.title}
                                                            </span>
                                                            <ScrollBar orientation="horizontal" />
                                                        </ScrollArea>
                                                    </div>

                                                    <div className="hidden md:flex">
                                                        <div className="w-[39%] flex flex-row justify-start  gap-2 r-0">
                                                            {/* //this button is sending backend request to share */}
                                                            <ShareContentSingleDialog contentId={item._id} />

                                                            <Button
                                                                className="hover:cursor-pointer"
                                                                onClick={() => {
                                                                    if (auth.user != null) {
                                                                        handleDeleteContent(auth.user.userId, item._id);
                                                                    }
                                                                }}
                                                            >
                                                                <DeleteIcon />
                                                            </Button>
                                                            <Button
                                                                className="hover:cursor-pointer"
                                                                onClick={() => {
                                                                    // setShareContentData(item)
                                                                    const hashedUserId = encodeURIComponent(
                                                                        CryptoJS.AES.encrypt(
                                                                            item._id,
                                                                            secretKey
                                                                        ).toString()
                                                                    );
                                                                    
                                                                    const singleContentString = `/details/single/${hashedUserId}`;
                                                                    navigate(singleContentString);
                                                                }}
                                                            >
                                                                <EyeIcon />
                                                            </Button>
                                                        </div>

                                                    </div>


                                                    <div className="md:hidden">
                                                        <Popover>
                                                            <PopoverTrigger className="hover:cursor-pointer">
                                                                <EllipsisVerticalIcon className="w-5 h-5 text-white md:hidden mt-[11px] " />
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-15 h-43 mr-9 py-3 px-2 bg-[#333131] md:hidden">
                                                                <div className="flex flex-col justify-start  gap-2 ">
                                                                    {/* //this button is sending backend request to share */}
                                                                    <ShareContentSingleDialog contentId={item._id} />

                                                                    <Button
                                                                        className="hover:cursor-pointer clear-start w-11 h-11 "
                                                                        onClick={() => {
                                                                            if (auth.user != null) {
                                                                                handleDeleteContent(auth.user.userId, item._id);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </Button>
                                                                    <Button
                                                                        className="hover:cursor-pointer w-11 h-11"
                                                                        onClick={() => {
                                                                            // setShareContentData(item)
                                                                            const hashedUserId = encodeURIComponent(
                                                                                CryptoJS.AES.encrypt(
                                                                                    item._id,
                                                                                    secretKey
                                                                                ).toString()
                                                                            );
                                                                            const singleContentString = `/details/single/${hashedUserId}`;
                                                                            navigate(singleContentString);
                                                                        }}
                                                                    >
                                                                        <EyeIcon />
                                                                    </Button>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>

                                                    </div>


                                                </CardHeader>
                                                <ScrollArea className=" h-44 ">
                                                    {item.video_image_url ? (
                                                        <CardContent className="p-3 text-amber-50 bg-black rounded-[5px] h-50 w-full">
                                                            <div className="flex flex-col gap-5  h-full ">
                                                                <div>
                                                                    <ReactPlayerVideo
                                                                        videoUrl={item.video_image_url}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <Label className="pl-1 mt-2 text-amber-50">Data</Label>
                                                    <div className="font-sans ml-[3px] pl-1 bg-amber-100 rounded-[5px] mt-2 text-black">
                                                        {item.data}
                                                    </div>

                                                    {item.link ? (
                                                        <div className="h-10 mt-2">
                                                            <Label className="pl-1 h-3 text-amber-50">
                                                                Link
                                                            </Label>

                                                            <div
                                                                className="font-sans  ml-[3px] pl-1 bg-amber-200 h-7 rounded-[5px] text-black flex flex-row justify-between mt-2 hover:cursor-pointer w-full  mr-1"
                                                                onClick={() => handleCopy(item.link)}
                                                            >
                                                                {item.link}
                                                                <LinkIcon className="w-5 h-5 mt-1 pr-1" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </ScrollArea>
                                                <CardFooter className="bg-white h-15 rounded-[5px] pl-0 flex flex-col gap-1 justify-end w-full">
                                                    <div className="flex flex-row gap-2 justify-start h-6  mt-1 w-full pl-10">
                                                        {item.allTags.map((tagItem, tagIndex) => (
                                                            <span
                                                                key={tagIndex}
                                                                className="bg-blue-200 rounded-[7px] p-[1.1px] text-[13px]"
                                                            >
                                                                {tagItem.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="text-black text-[11px] flex flex-col justify-end">
                                                        Added on {item.created}
                                                    </span>
                                                </CardFooter>
                                            </Card>

                                            // </Link>
                                        ))
                                    ) : (
                                        <div className="text-amber-50">No data found</div>
                                    )}
                                </CardContent>

                            </div>
                        </ScrollArea>
                    ) : (
                        <Lottie animationData={loader} className="white w-full h-[90%]" />
                    )}
                </Card>
            </main>
        </SidebarProvider>
    );
}
