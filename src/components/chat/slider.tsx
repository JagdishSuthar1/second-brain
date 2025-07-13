import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { use, useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "@/context/chat-context";
import { GroupIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";
import { Input } from "../ui/input";
import { axiosInstance } from "@/axiosInstance";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { ScrollBar, ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { AuthContext } from "@/context/auth-context";



export default function SlideBarForChat() {
    const { currentTabforChat, mychats, groupChats, setFetchFriendsAgain, setFetchGroupsAgain, userChatSelected, groupChatSelected, setGroupChatSelected, setUserChatSelected,
        selectedUserMessages, setSelectedUserMessages,selectedGroupMessages, setSelectedGroupMessages, socket } = useContext(ChatContext)!;
    const searchUserRef = useRef<HTMLInputElement>(null)
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [openAddGroup, setOpenAddGroup] = useState<boolean>(false);
    const { auth } = useContext(AuthContext)!;
    type searchableUserType = {
        _id: string,
        username: string
    }
    const [searchableUser, setSearchableUser] = useState<searchableUserType[]>([]);
    type GroupDataType = {
        name: string,
        members: string[],
    }
    const [groupData, setGroupData] = useState<GroupDataType>({
        name: "",
        members: []
    });


    const groupNameRef = useRef<HTMLInputElement>(null)
    const searchGroupRef = useRef<HTMLInputElement>(null)

    async function handleCreateGroupChat(userId: string) {
        console.log(groupData);
        if (groupData.members.length >= 2 && groupData.name != "") {
            const response = await axiosInstance.post(`/api/v1/chats/create-group-chat/${userId}`, groupData);
            console.log(response.data)
            if (response.data.success == true) {
                toast.success(response.data.messsage);
                setFetchGroupsAgain(true);
            }
            else {
                toast.error(response.data.messsage)
            }
        }
    }

    async function handleChatWithFriend(userId: string, friendId: string) {
        const response = await axiosInstance.post(`/api/v1/chats/create-friend-chat/${userId}`, {
            friendId: friendId
        })
        console.log(response.data)
        if (response.data.success == true) {

            toast.success(response.data.messsage);
            setFetchFriendsAgain(true);

        }
        else {
            toast.error(response.data.messsage)
        }
    }


    async function handleSearchUser(text: string) {
        console.log(text);
        const response = await axiosInstance.post("/api/v1/search/all-users", {
            query: text
        })

        console.log(response.data)
        if (response.data.success) {
            console.log(response.data.data)
            setSearchableUser(response.data.data);
        }
    }


    async function getAllMessage(userId: string, friendId: string) {

        console.log("userId" , userId + "and" + "freindId" , friendId);
        const response = await axiosInstance.get(`/api/v1/message/get-all/${userId}/${friendId}`)
        console.log("user message " ,response.data);
        if (response.data.success == true) {
            console.log(response.data.data)
            
            setSelectedUserMessages(response.data.data);
        }
    }

    async function getAllGroupMessage(groupId : string) {
        const response = await axiosInstance.get(`/api/v1/message/get-all-group/${groupId}`);
        console.log("group message ",response.data.data);
        if(response.data.success == true) {
            setSelectedGroupMessages(response.data.data);
        }
    }

    // useEffect(()=> {
    //     if(userChatSelected != null) {
    //         console.log("user selected " ,userChatSelected);
    //         getAllMessage(userChatSelected.myId... , userChatSelected.friendId._id)
    //     }
    //         },[userChatSelected])

    return (
        <Sidebar className={`p-3 mt-20 bg-[#222222] text-white border-[1px] `}>
            <SidebarContent className="w-full text-[20px] bg-[#222222] text-amber-50 gap-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-amber-50 text-[20px] mt-10"><div className="w-full flex flex-row justify-between"><span>My Chats</span><div className="flex flex-row gap-1"><Button onClick={() => setOpenSearch(true)}><SearchIcon /></Button> <Button onClick={() => setOpenAddGroup(true)}><PlusIcon /></Button></div>
                    </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="w-full h-full">


                        <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
                            <CommandInput className="h-10 w-full" ref={searchUserRef} placeholder="Search friend" onValueChange={(e) => {
                                if (searchUserRef != null && searchUserRef.current != null) {
                                    searchUserRef.current.value = e
                                    handleSearchUser(searchUserRef.current.value)
                                }
                            }} />
                            <CommandList className="w-full h-90">
                                <CommandEmpty>No results Found</CommandEmpty>
                                {searchableUser ? <CommandGroup heading="suggestions">
                                    {searchableUser.map((item, index) => (
                                        <CommandItem key={index} onSelect={() => {
                                            if (auth.user != null) {
                                                handleChatWithFriend(auth.user.userId, item._id)
                                            }
                                        }}>{item.username}</CommandItem>
                                    ))}
                                </CommandGroup> : ""}
                            </CommandList>
                        </CommandDialog>

                        <CommandDialog open={openAddGroup} onOpenChange={setOpenAddGroup} >

                            <div className="h-10 w-full bg-amber-300 flex flex-row justify-center pt-2 text-bold">Create Group Chat</div>
                            <Label className="pt-10 pl-[9px] text-[13px] pb-2 flex flex-row gap-2"><GroupIcon />Group Name</Label>
                            <div className="flex flex-row gap-3 w-[70%] pl-7">
                                <Input placeholder="Add the Group Name" ref={groupNameRef} />
                                <Button className="hover:cursor-pointer" onClick={() => {
                                    if (groupNameRef != null && groupNameRef.current != null) {
                                        setGroupData({ ...groupData, name: groupNameRef.current.value })
                                        // console.log({...groupData , name : groupNameRef.current.value})
                                    }
                                }}>Add</Button>

                            </div>
                            <CommandInput className="h-10 w-[full]" ref={searchGroupRef} placeholder="Search friend" onValueChange={(e) => {
                                if (searchGroupRef != null && searchGroupRef.current != null) {
                                    searchGroupRef.current.value = e
                                    handleSearchUser(searchGroupRef.current.value)
                                }
                            }} />
                            <CommandList className="w-full h-90 pl-3">
                                <CommandEmpty>No results Found</CommandEmpty>
                                <ScrollArea className="w-full h-60">
                                    {searchableUser ? <CommandGroup heading="suggestions" className="flex flex-col gap-0">
                                        {searchableUser.map((item, index) => (
                                            <CommandItem key={index} className="w-full flex flex-row justify-betweeen" onSelect={() => {

                                            }
                                            }

                                            > {item.username} <Checkbox onClick={() => {
                                                if (groupData.members.includes(item._id) == false) {
                                                    setGroupData({ ...groupData, members: [...groupData.members, item._id] })
                                                    console.log("adding", { ...groupData, members: [...groupData.members, item._id] });
                                                }
                                                else {
                                                    const dummyArray = [...groupData.members];
                                                    for (let i = 0; i < dummyArray.length; i++) {
                                                        if (dummyArray[i] == item._id) {
                                                            dummyArray.splice(i, 1);
                                                            break;
                                                        }
                                                    }

                                                    // setAddGroupUsers(dummyArray);
                                                    setGroupData({ ...groupData, members: dummyArray })
                                                    console.log("removing ", { ...groupData, members: dummyArray })

                                                }
                                            }} /></CommandItem>
                                        ))}
                                    </CommandGroup> : ""}
                                    <ScrollBar orientation="vertical" />
                                </ScrollArea>
                            </CommandList>
                            <div className="w-full mt-3">
                                <Button className="w-full" onClick={() => {
                                    if (auth.user != null) {
                                        handleCreateGroupChat(auth.user.userId)
                                    }
                                }
                                }><GroupIcon />Create Group</Button>
                            </div>
                        </CommandDialog>

                        <SidebarMenu className="flex flex-col gap-3  pt-5 ">
                            <Tabs defaultValue={currentTabforChat} className="w-full">
                                <TabsList className="w-full">
                                    <TabsTrigger value="friends">Friends</TabsTrigger>
                                    <TabsTrigger value="groups">Groups</TabsTrigger>
                                </TabsList>

                                <TabsContent value="friends" className="text-amber-50">

                                    {mychats ? mychats.map((item, index) => (<SidebarMenuItem key={index} onClick={() => {
                                        setUserChatSelected(item)
                                        setGroupChatSelected(null);
                                        
                                        console.log("friend Selected", item);
                                        if (socket != null) {
                                            socket.emit("join-chat", item._id);
                                        }

                                        if (auth.user != null) {
                                            getAllMessage(auth.user.userId, item.friendId._id)
                                        }
                                    }}>
                                        <SidebarMenuButton className="flex flex-col gap-5 text-amber-50">
                                            <div className="pl-5 w-full flex flex-row justify-items-start gap-5">
                                                <UserIcon />
                                                {item.friendId.username}
                                            </div>
                                            {/* {item.latestMessage.messsage} */}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>)) : "No Chats Found"}
                                </TabsContent>

                                <TabsContent value="groups">
                                    {groupChats ? groupChats.map((item, index) => (<SidebarMenuItem key={index} onClick={() => {
                                        setGroupChatSelected(item);
                                        setUserChatSelected(null);


                                        if (socket != null) {
                                            socket.emit("join-chat", item._id);
                                        }
                                        
                                        console.log("Group Selected", item);
                                        getAllGroupMessage(item._id);
                                        
                                    }}>
                                        <SidebarMenuButton className="flex flex-col gap-5" >
                                            <div className="flex flex-row gap-3 justify-items-start">
                                                < GroupIcon/>
                                                {item.name}
                                            </div>
                                            {/* {item.latestMessage.messsage} */}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>)) : ""}
                                </TabsContent>
                            </Tabs>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    )
}

