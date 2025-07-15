import { useSearchParams } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FileIcon, TagsIcon, VideoIcon, XIcon } from "lucide-react";
import { useContext } from "react";
import { DashboardContext } from "@/context/dashboard-context";

export default function SidebarApp() {
    const queryParams = new URLSearchParams();
    const [ , setSearchParams] = useSearchParams();
    const {setFilter, setShareFilter , setFetchingContentForDashboard} = useContext(DashboardContext)!;
    const items = [
        {
            title: "Tweet",
            url: "tweet",
            icon: XIcon
        },
        {
            title: "Videos",
            url: "video",
            icon: VideoIcon
        }
        ,
        {
            title: "Document",
            url: "document",
            icon: FileIcon
        }
        ,
        {
            title: "Tags",
            url: "tag",
            icon: TagsIcon
        }
    ]

    
    // useEffect(()=>{
    //     if(auth.user.userId != null) {

    //     }
    // },[queryParams])

    return (
        <Sidebar>
            <SidebarContent className="p-3 bg-[#191919] text-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[20px] text-black gap-2 ml-[-10px]"><img className="text-black" src="/brain.svg" alt="" />
                    <a href="/home" ><span className="text-white">SecondBrain</span></a>
                    
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="pt-3">
                        <SidebarMenu className="flex flex-col gap-3 pl-3 pt-5">
                            {items.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton className="hover:cursor-pointer" asChild onClick={()=> {
                                        if(window.location.pathname.split("/")[1] != "share") {
                                            queryParams.append( "type"  , item.url) 
                                        ////console.log(queryParams.get("type"));
                                        sessionStorage.setItem("type" , JSON.stringify(item.url))
                                            setSearchParams(queryParams);
                                            setFilter(item.title);
                                            setFetchingContentForDashboard(true);
                                        }
                                        else {
                                            queryParams.append("sharetype"  , item.url) 
                                        ////console.log(queryParams.get("sharetype"));
                                        sessionStorage.setItem("sharetype" , JSON.stringify(item.url))
                                            setSearchParams(queryParams);
                                            setShareFilter(item.title);
                                        }
                                    }}>
                                        <div  className="flex flex-row">
                                            <item.icon />
                                            <span className="text-[17px]">{item.title}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}