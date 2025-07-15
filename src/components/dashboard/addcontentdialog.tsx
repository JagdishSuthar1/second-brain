import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {  MoveRight, PlusIcon } from "lucide-react";
import { DialogContent, DialogOverlay} from "@/components/ui/dialog";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent } from "../ui/card";
import { useContext } from "react";
import { DashboardContext } from "@/context/dashboard-context";
import { Progress } from "@/components/ui/progress";
import ContentData from "./contentData";
import TagsData from "./tagdata";

export default function  AddContentDialog() {
    const {contentDetail , setContentDetail ,contentProgress , setContentProgress , currentTab,setCurrentTab} = useContext(DashboardContext)!;
    const types = [
        "tweet", "video", "image", "document", "link"
    ]


    function handleTypes(item : string) {
            setContentDetail({...contentDetail , type : item});
            setContentProgress(33);
            setCurrentTab("Content");
    }
    
    return (
        <Dialog onOpenChange={()=>{
            setContentDetail({
                    link: "",
                    type: "",
                    title: "",
                    data: "",
                    allTags: []
                })

                setContentProgress(0);
                setCurrentTab("Type")
        }}>
            
            <DialogTrigger asChild >
            {/* <DialogPortal> */}
                <Button className="flex flex-row gap-3 hover:cursor-pointer"><PlusIcon className="text-white " />
                    <span>Add Content</span></Button>
            </DialogTrigger>
            <DialogOverlay className="bg-black/50 fixed inset-0 z-40" />
            <DialogContent className="flex flex-col gap-3 md:w-120 h-140 bg-[#191919] w-100 ">
                {/* <DialogTitle className="text-white text-center">Add Your Brain Memory Here</DialogTitle> */}
                <DialogHeader>
                <Progress  value={contentProgress} className="bg-amber-50"/>
                </DialogHeader>
                <Tabs defaultValue="Type" value={currentTab} onValueChange={setCurrentTab} className="w-full h-full">
                    
                    <TabsList className="flex flex-row gap-5 w-full bg-[#191919] text-amber-50">
                        <TabsTrigger disabled={currentTab == "Type" ? false : true} value="Type" className="hover:cursor-pointer">Type</TabsTrigger>
                        <TabsTrigger disabled={currentTab == "Content" ? false : true} value="Content" className="hover:cursor-pointer">Content</TabsTrigger>
                        <TabsTrigger disabled={currentTab == "Tags" ? false : true} value="Tags" className="hover:cursor-pointer">Tags</TabsTrigger>
                        {/* <TabsTrigger  value="Type" className="hover:cursor-pointer">Type</TabsTrigger>
                        <TabsTrigger  value="Content" className="hover:cursor-pointer">Content</TabsTrigger>
                        <TabsTrigger  value="Tags" className="hover:cursor-pointer">Tags</TabsTrigger> */}
                    </TabsList>
                    <TabsContent value="Type" className="w-full h-full bg-[#191919]">
                        <Card className="w-full h-full bg-[#191919]">
                            <CardContent className="flex flex-col gap-5 pt-7">
                                {types.map((item, index)=>(
                                    <Button className="hover:cursor-pointer bg-white text-black hover:bg-white" onClick={()=>handleTypes(item)} key={index} >{item.toLocaleUpperCase()}
                                    <MoveRight/></Button>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="Content" className="w-full h-full">
                        <ContentData/>
                    </TabsContent>
                    <TabsContent value="Tags" className="w-full h-full">
                        <TagsData/>
                    </TabsContent>
                    
                </Tabs>
                
            </DialogContent>
            {/* </DialogPortal> */}
        </Dialog>
    )

}