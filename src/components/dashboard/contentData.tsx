import { Label } from "../ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useContext, useRef } from "react";
import { DashboardContext } from "@/context/dashboard-context";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { axiosInstance } from "@/axiosInstance";


export default function ContentData() {
    const {contentDetail , setContentDetail , setContentProgress, setCurrentTab , currentTab} = useContext(DashboardContext)!;
    
    function handleNext() {
            ////console.log(contentDetail)
        if(contentDetail.type != "" && contentDetail.data != "" && contentDetail.link != "") {
            setContentProgress(66);
            setCurrentTab("Tags");
        }
        else {
            toast.error("Fill the Data first")
        }
    }

    const uploadRef = useRef<HTMLInputElement>(null);
     async function handleVideoImageUpload() {
            if(uploadRef != null && uploadRef.current != null && uploadRef.current.files != null) {
                ////console.log(uploadRef.current.files[0])
                const fileData = new FormData();
                fileData.append("file", uploadRef.current.files[0]);
                ////console.log(fileData)

                const response = await axiosInstance.post("/api/v1/media/upload", fileData , {
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                })
                
                ////console.log(response.data)
                if(response.data.success == true) {
                    setContentDetail({...contentDetail , 
                        video_image_url : response.data.data.url,
                        public_id : response.data.data.public_id
                    })
                    toast.success(response.data.message);
                }
                else {
                    toast.error(response.data.success)
                }
            }
    }
    return (
        <Card className="w-full h-full bg-[#191919] text-amber-50 flex flex-col gap-3 pt-5">
            <CardHeader>
                <CardTitle>Add the Content here</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 w-100 min-h-max">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" onChange={(event)=> {setContentDetail({...contentDetail , title : event.target.value})}} value={contentDetail?.title} className="w-[80%]"/>
                </div >
                <div className="flex flex-col gap-2">
                    <Label htmlFor="data">Data</Label>
                    <ScrollArea className="w-full h-[73px]" id="data"  >
                    <Textarea onChange={(event)=> {setContentDetail({...contentDetail , data : event.target.value})}} value={contentDetail?.data}  className="w-[80%]"/>
                    </ScrollArea>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="data">Upload Content</Label>
                    <div className="flex flex-row w-[80%]">
                    <Input ref={uploadRef} type="file"  placeholder="Choose file" className="rounded-r-none" />
                    <Button onClick={()=> handleVideoImageUpload()} className="bg-white text-black hover:cursor-pointer hover:bg-white hover:text-black  rounded-l-none">Upload</Button>
                        
                    </div>
                    </div>

                <div className="flex flex-col gap-2 mt-1">
                    <Label htmlFor="link">Link</Label>
                    <Input type="link" id="link" onChange={(event)=> {setContentDetail({...contentDetail , link : event.target.value})}} value={contentDetail?.link}  className="w-[80%]"/>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row justify-end mt-2">
                <Button disabled={currentTab === "Type" ? true : false} className="hover:cursor-pointer bg-white text-black hover:bg-white hover:text-black" onClick={()=> handleNext()}>Next</Button>
            </CardFooter>
        </Card>
    )
}