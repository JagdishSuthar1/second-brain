import Header from "@/components/landing/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext, useEffect } from "react";
import { DashboardContext } from "@/context/dashboard-context";
// import ReactPlayerVideo from "@/components/reactPlayer";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { axiosInstance } from "@/axiosInstance";
import CryptoJS from "crypto-js"
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

const secretKey = "Jagdish-Suthar";

export default function ShareSingleContent() {
    const {shareContentData , setShareContentData} = useContext(DashboardContext)!
       const {auth} = useContext(AuthContext)!;
    const navigate = useNavigate();
    if(auth.authenticated == false) {
    navigate("/auth")
    }
       async function handleCopy(link : string) {
        try {
            await navigator.clipboard.writeText(link);
            toast.success("Link Copied")
        }
        catch(err) {
            console
            toast.error("Failed to Copy")
        }
    }


    async function handleLoadingContent(contentId : string) {
        try {
            const response = await axiosInstance.get(`/api/v1/content/single/${contentId}`);
            //console.log(response.data)
            if(response.data.success == true) {
                    setShareContentData(response.data.data);
            }
            
        }
        catch(err) {
            toast.error("DataBase Issue")
        }
    }

    useEffect(()=>{

        const id = window.location.pathname.split("/")[3];
        //console.log(id);
         const bytes = CryptoJS.AES.decrypt(decodeURIComponent(id), secretKey);
        const contentId = bytes.toString(CryptoJS.enc.Utf8);
        //console.log("id" ,contentId);
        handleLoadingContent(contentId);

        return ()=>{
            setShareContentData(null)
        }
    },[])
    
    // //console.log(aiSummary)
    return (
        <div className="w-full min-h-screen font-sans flex flex-col gap-11 bg-[#191919] text-amber-50">
            <Header />
            <div className="w-full h-full flex flex-col p-3 text-black justify-center items-center">
                <Card className="w-full  h-full rounded-none bg-[#191919] border-none flex flex-col">
                    <CardHeader className="flex flex-row justify-center md:w-[97.3%] h-10 md:ml-5 mx-5 bg-amber-200 items-center font-bold rounded-[9px]">{shareContentData ? shareContentData.title : ""}</CardHeader>
                    <CardContent className="flex flex-col gap-3 w-full h-full">

                        <div className="flex lg:flex-row w-full gap-3 flex-col lg:h-70">
                            {shareContentData && shareContentData.video_image_url ? <Card className="lg:w-[47%] lg:h-70 h-70 w-full  flex flex-col gap-0">
                                <CardHeader className="text-[20px] font-bold">Video/Image</CardHeader>
                                <CardContent className="w-full h-full">
                                   <video src={shareContentData.video_image_url} controls className="w-[95%] h-[90%] object-contain "/>
                       
                                </CardContent>
                            </Card> : <></>}

                            <Card className=" text-black w-full h-full flex flex-col gap-2">
                                <CardHeader className="text-[20px] font-bold">Data</CardHeader>
                                <ScrollArea className="w-full h-110 overflow-hidden">
                                <CardContent className="w-full md:h-full">
                                    {shareContentData ? shareContentData.data : ""}
                                </CardContent>
                                </ScrollArea>
                            </Card>
                        </div>
                    
             
                {shareContentData && 
               
               shareContentData.link ? 
                                        <Card className="h-20 pt-3 flex flex-col gap-1 justify-items-start w-full pl-[13px]  ">
                                            <Label className="mt-1 h-3 pl-3 text-black text-[20px] font-bold">Link</Label>

                                        <div className="lg:w-[415px]  w-[80%] font-sans ml-3  h-7 rounded-[5px] pl-1 text-black flex flex-row justify-between mt-2 hover:cursor-pointer  mr-1 " onClick={()=>handleCopy(shareContentData.link)}>
                                                    <a className="overflow-hidden ">{shareContentData.link}</a>
                                                     </div></Card> : <></>}


                </CardContent>
                </Card>
            </div>

        </div>
    )
}