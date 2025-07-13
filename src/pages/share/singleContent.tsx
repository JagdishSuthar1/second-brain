import Header from "@/components/landing/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext, useEffect } from "react";
import { DashboardContext } from "@/context/dashboard-context";
import ReactPlayerVideo from "@/components/reactPlayer";
import { Label } from "@/components/ui/label";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/axiosInstance";
import CryptoJS from "crypto-js"

const secretKey = "Jagdish-Suthar";

export default function ShareSingleContent() {
    const {shareContentData , setShareContentData} = useContext(DashboardContext)!
    
       async function handleCopy(link : string) {
        try {
            await navigator.clipboard.writeText(link);
            toast.success("Link Copied")
        }
        catch(err) {
            toast.error("Failed to Copy")
        }
    }


    async function handleLoadingContent(contentId : string) {
        try {
            const response = await axiosInstance.get(`/api/v1/content/single/${contentId}`);
            console.log(response.data)
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
        console.log(id);
         const bytes = CryptoJS.AES.decrypt(decodeURIComponent(id), secretKey);
        const contentId = bytes.toString(CryptoJS.enc.Utf8);
        console.log("id" ,contentId);
        handleLoadingContent(contentId);

        return ()=>{
            setShareContentData(null)
        }
    },[])
    
    // console.log(aiSummary)
    return (
        <div className="w-full h-full font-sans flex flex-col gap-3 bg-[#191919] text-amber-50">
            <Header />
            <div className="w-full h-full flex flex-col p-3 text-black justify-center items-center">
                <Card className="w-full h-[50%] rounded-none bg-[#191919] border-none flex flex-col">
                    <CardHeader className="flex flex-row justify-center w-[97.3%] h-10 ml-5 bg-amber-200 items-center font-bold rounded-[9px]">{shareContentData ? shareContentData.title : ""}</CardHeader>
                    <CardContent className="flex flex-col gap-3 w-full h-full">
                        <div className="flex flex-row w-full gap-3 h-full">
                            {shareContentData && shareContentData.video_image_url ? <Card className="w-[30%] h-70 bg-red-200 p-2 flex flex-col gap-0">
                                <CardHeader className="text-[20px] font-bold mt-3">Video/Image</CardHeader>
                                <CardContent className="w-[400px] h-[400px] flex flex-col gap-2 pl-5">
                                   <ReactPlayerVideo videoUrl={shareContentData.video_image_url}/>
                       
                                </CardContent>
                            </Card> : <></>}

                            <Card className=" text-black w-full flex flex-col gap-2">
                                <CardHeader className="text-[20px] font-bold">Data</CardHeader>
                                <CardContent className="w-full h-full">
                                    {shareContentData ? shareContentData.data : ""}
                                </CardContent>
                            </Card>
                        </div>
                    
             
                {shareContentData && 
               
               shareContentData.link ? 
                                        <Card className="h-20 pt-3 flex flex-col gap-1 justify-items-start w-full pl-[13px]  ">
                                            <Label className="mt-1 h-3 pl-3 text-black text-[20px] font-bold">Link</Label>

                                        <div className="w-[415px] font-sans ml-3 bg-amber-200 h-7 rounded-[5px] pl-1 text-black flex flex-row justify-between mt-2 hover:cursor-pointer  mr-1 " onClick={()=>handleCopy(shareContentData.link)}>
                                                    {shareContentData.link}
                                                     <LinkIcon className="w-5 h-5 mt-1 pr-1" /></div></Card> : <></>}

                <Card className="h-[30%]   text-blac border-none flex flex-col gap-3 mt-3 rounded-2xl">
                    <CardHeader className="text-[20px]  font-bold pl-[25px]">Detailed Information</CardHeader>
                            <ScrollArea className="h-full w-full">
                    <CardContent className="w-full h-full pl-[25px]">
                        {/* <Card className="h-[80%] w-full"> */}
                            {/* <CardContent className="h-full"> */}
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut corporis officiis quisquam impedit atque hic earum facilis fuga unde numquam quo ad alias sunt laborum, voluptate mollitia, perspiciatis qui. Numquam a quas explicabo nihil minima neque pariatur perferendis harum repellendus omnis incidunt tenetur quaerat quidem modi optio nemo deserunt, libero ea, magnam itaque rerum? Quia necessitatibus ex sapiente minima illum alias accusantium similique natus, suscipit cum sunt recusandae blanditiis officia aliquid, dolorem asperiores. Quia doloremque modi laboriosam placeat repudiandae nobis maiores sunt cupiditate, consequatur vero minima! Molestiae iste quisquam quaerat eveniet perspiciatis, nesciunt tempore sequi recusandae ipsa? Nisi eligendi perspiciatis molestiae dicta laudantium, adipisci alias incidunt neque laboriosam corrupti placeat a, voluptatibus ipsa cumque ipsum velit! Eligendi provident omnis totam cum officiis aliquam maxime numquam, velit aliquid nostrum odio magnam facere id reprehenderit accusantium quidem recusandae mollitia dignissimos veritatis neque minima? Ipsum corrupti officia placeat, non, animi laborum distinctio iure porro perspiciatis illo exercitationem maiores possimus. Vitae repudiandae corrupti totam impedit ratione placeat ipsam? Voluptas exercitationem obcaecati dolorem aliquid, officia, nesciunt soluta consectetur veritatis quasi voluptates eligendi sapiente iusto eveniet modi officiis commodi dolorum perferendis praesentium debitis repellat quaerat. Saepe corporis delectus, eveniet quia qui animi esse ipsam obcaecati aspernatur nihil blanditiis adipisci! Repellat, autem minima. Exercitationem vero voluptatem, est accusamus officiis, commodi saepe dicta non ipsa obcaecati fuga neque temporibus omnis minima consequatur placeat eveniet mollitia voluptate aliquam atque? Iure, aut? Recusandae iusto provident animi modi consequatur quos, tempora atque laborum aut sint totam? Ullam consequatur voluptatem quas hic eveniet magnam illum unde alias blanditiis, ad odit itaque necessitatibus laboriosam fugit cum, veritatis possimus modi, commodi doloribus aperiam! Vel, quo voluptates facilis tempora pariatur fuga nesciunt aspernatur voluptatem praesentium, nisi velit qui voluptate accusamus error fugiat! Eaque aliquam reprehenderit, maxime aperiam itaque assumenda maiores velit excepturi nihil consectetur obcaecati et nemo error quis quibusdam accusamus exercitationem reiciendis eos numquam, iure voluptatem! Est expedita, cum labore quas tempore aut veniam aliquid aperiam repudiandae voluptatibus. Error, doloribus voluptate numquam quas est alias cupiditate, ea asperiores voluptatum esse perspiciatis corporis in voluptatem accusantium dicta quisquam eligendi ipsa excepturi veritatis sint sit eius vero blanditiis? Soluta eos non numquam hic esse. Quod non obcaecati porro magni alias, incidunt expedita, veritatis dolore numquam, dolor distinctio quidem optio. Veritatis accusantium, quis quo, temporibus enim aliquam minus animi cumque qui dignissimos earum error reiciendis. Sed molestiae, maxime dolorem illum sint dicta numquam perferendis dolorum quaerat culpa sunt labore nobis excepturi alias laborum a rerum repellendus quod obcaecati voluptate. Necessitatibus eius reiciendis aliquam quasi nisi ut eaque, laudantium culpa recusandae quaerat, natus odit fugit veritatis eveniet magnam officiis sit delectus temporibus ullam quis. Cumque sed, blanditiis adipisci ipsa odit reiciendis vitae obcaecati temporibus. Culpa esse commodi ex?
                            {/* </CardContent> */}
                        {/* </Card> */}
                    </CardContent>
                            </ScrollArea>
                </Card>

                </CardContent>
                </Card>
            </div>

        </div>
    )
}