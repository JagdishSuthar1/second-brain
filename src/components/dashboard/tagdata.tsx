import { MoveIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Textarea } from "../ui/textarea";
import { useContext, useRef } from "react";
import { DashboardContext } from "@/context/dashboard-context";
import { axiosInstance } from "@/axiosInstance";
import { AuthContext } from "@/context/auth-context";
import { toast } from "sonner";


export default function TagsData() {
    const { setCurrentTab, tagsForTextArea, setTagsForTextArea, contentDetail, setContentDetail, setContentProgress , setFetchingContentForDashboard} = useContext(DashboardContext)!;
    const { auth } = useContext(AuthContext)!;
    const tagRef = useRef<HTMLInputElement>(null);

    async function handleAddTag() {
        if (tagRef != null && tagRef.current != null) {
            if (auth.user != null && tagRef.current.value != "") {
                const response = await axiosInstance.post(`/api/v1/content/add-tag/${auth.user.userId}`, { title: tagRef.current.value });
                ////console.log(response.data)
                if (response.data.success == true) {
                    setTagsForTextArea(tagsForTextArea + " " + tagRef.current.value)
                    tagRef.current.value = "";

                    setContentDetail({ ...contentDetail, allTags: [...(contentDetail.allTags), response.data.data] })
                }
            }
        }
    }

    async function handleAddContent() {
        ////console.log(contentDetail);
        if (auth.user != null) {
            try {
            const response = await axiosInstance.post(`/api/v1/content/add-content/${auth.user.userId}`, contentDetail);
            if (response.data.success == true) {
                setContentProgress(100);
                toast.success(response.data.message);
                setCurrentTab("Type");
                setContentDetail({
                    link: "",
                    type: "",
                    title: "",
                    data: "",
                    allTags: []
                })
                setFetchingContentForDashboard(true);
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch(err : any) {
            // toast.error(err);
            ////console.log(err)
        }
    
    }
}
    return (
        <Card className="w-full h-full bg-[#191919] text-amber-50">
            <CardHeader>
                <CardTitle>Add the Tags here</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 w-full h-full justify-between">
                <div className="flex flex-row ">
                    <Input ref={tagRef} type="text" placeholder="#hashtag" className="rounded-r-none" />
                    <Button className="rounded-l-none bg-white hover:bg-white text-black hover:cursor-pointer " onClick={() => handleAddTag()}><PlusIcon />Add</Button>
                </div>
                <ScrollArea className="w-full h-50">
                    <Textarea disabled={true} className="flex flex-row gap-2 w-full h-full" value={tagsForTextArea} />
                </ScrollArea>
                <Button onClick={() => handleAddContent()}><MoveIcon />  Ready to Add the Content</Button>
            </CardContent>
        </Card>
    )
}