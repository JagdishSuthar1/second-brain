import { axiosInstance } from "@/axiosInstance";
import SlideBarForChat from "@/components/chat/slider";
import Header from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthContext } from "@/context/auth-context";
import { ChatContext } from "@/context/chat-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendIcon } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client"
import Lottie from "lottie-react"
import loader from "@/animations/loader.json"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const ENDPOINT = "http://localhost:3000"


export default function ChatPage() {

    const { auth } = useContext(AuthContext)!;
    console.log(auth)
    const navigate = useNavigate()
    if (auth && auth.authenticated == false) {
        navigate("/auth")
    }


    const { fetchGroupsAgain, setFetchFriendsAgain,
        setFetchGroupsAgain, fetchfriendsAgain, mychats,
        setMyChats, groupChats, setGroupChats,
        userChatSelected, setUserChatSelected,groupChatSelected, setGroupChatSelected ,socket,
        setSocket,
        selectedUserMessages, setSelectedUserMessages,
        setSelectedGroupMessages, selectedGroupMessages
    } = useContext(ChatContext)!;



    const messageRef = useRef<HTMLInputElement>(null)
    // const [isTyping, setIsTyping] = useState(true);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [connected, setConnected] = useState<string>("");
    // const [disconnect, setDisconnected] = useState<string>("");
    const [connectedUsers, setConnectedUsers] = useState<string[]>([])

    async function handleUserChats(userId: string) {
        const response = await axiosInstance.get(`/api/v1/chats/my-chats/${userId}`)
        console.log(response.data)
        if (response.data.success == true) {
            setMyChats(response.data.data);
            setFetchFriendsAgain(false);

        }
    }


    async function handleGroupChats(userId: string) {
        const response = await axiosInstance.get(`/api/v1/chats/my-group-chats/${userId}`)
        console.log(response.data)
        if (response.data.success == true) {
            setGroupChats(response.data.data);
            setFetchGroupsAgain(false);
        }
    }


    async function handleSendingMessage() {
        if (userChatSelected != null && messageRef.current != null && messageRef.current?.value != "" && auth.user != null) {
            console.log("message : ", messageRef.current.value);
            const response = await axiosInstance.post(`/api/v1/message/send/${auth.user.userId}`, {
                friendId: userChatSelected?.friendId._id,
                message: messageRef.current.value
            });


            console.log(response.data);
            if (response.data.success == true) {
                //here we do the socket part
                socket?.emit("new-message", {
                    roomId: userChatSelected?._id,
                    message: messageRef.current.value,
                    messageId: response.data.data._id,
                    senderId: auth.user.userId
                })


                setSelectedUserMessages([...selectedUserMessages, response.data.data]);

                console.log("after sending message ", [...selectedUserMessages, response.data.data])

                messageRef.current.value = ""
            }
        }
        else if (groupChatSelected != null && messageRef.current != null && messageRef.current?.value != "" && auth.user != null) {
            console.log("message : ", messageRef.current.value);
            const response = await axiosInstance.post("/api/v1/message/send-group", {
                groupId: groupChatSelected._id,
                userId: auth.user.userId,
                message: messageRef.current.value
            });


            console.log(response.data);
            if (response.data.success == true) {
                //here we do the socket part
                socket?.emit("new-message", {
                    roomId: groupChatSelected?._id,
                    data: response.data.data
                })


                setSelectedGroupMessages([...selectedGroupMessages, response.data.data]);
                console.log("after sending message ", [...selectedGroupMessages, response.data.data])
                messageRef.current.value = ""
            }
        }
    }


    useEffect(() => {
        if (auth.user != null) {
            if (fetchGroupsAgain == true) {
                handleGroupChats(auth.user.userId)
            }
            if (fetchfriendsAgain == true) {
                handleUserChats(auth.user.userId)
            }
        }
    }, [auth, fetchGroupsAgain, fetchfriendsAgain])




    useEffect(() => {
        //   setInterval(()=> {
        //     router.refresh();
        //       }, 10000);
        // console.log("mountinr websocket")
        
        const dataForUserSelectedFromLocal = localStorage.getItem("USER_SELECTED");

        if(dataForUserSelectedFromLocal != null) {
            setUserChatSelected(JSON.parse(dataForUserSelectedFromLocal));
        }
        const dataForGroupSelectedFromLocal = localStorage.getItem("GROUP_SELECTED");
        if(dataForGroupSelectedFromLocal != null) {
            setUserChatSelected(JSON.parse(dataForGroupSelectedFromLocal));
        }

        const socket = new WebSocket("ws://localhost:3001");

        socket.onopen = () => {
            console.log("Connected");

            if(userChatSelected != null) {
                socket.send(
                    JSON.stringify({
                        type: "JOIN_ROOM",
                        payload: {
                            roomId: userChatSelected._id,
                            userId: auth.user?.userId,
                        },
                    })
                );
            }
            else if(groupChatSelected != null) {
                socket.send(
                    JSON.stringify({
                        type: "JOIN_ROOM",
                        payload: {
                            roomId: groupChatSelected._id,
                            userId: auth.user?.userId,
                        },
                    })
                );
            }
        }
        


        socket.onmessage = (ev) => {
            const getDataFromWS = JSON.parse(ev.data);
            console.log(getDataFromWS)
            if (getDataFromWS.type == "ADDED_USER") {
                toast.success(getDataFromWS.payload);

            } else if (getDataFromWS.type == "REMOVED_USER") {
                toast.error(getDataFromWS.payload);
            }
            else if (getDataFromWS.type == "COMMENT_IN_ROOM") {
                console.log(getDataFromWS);

                if(userChatSelected != null) {
                    const newComment = {
                        _id: getDataFromWS.payload.id,
                        roomId: getDataFromWS.payload.spaceId,
                        user: getDataFromWS.payload.user,
                        latesmessage: getDataFromWS.payload.message,
                    }
    
                    setMyChats(prev => (prev ? [...prev, newComment] : [newComment]));
                }
            }

            else if (getDataFromWS.type == 'ACTIVE_USERS') {
                console.log(getDataFromWS);
                setConnectedUsers(prev => prev = getDataFromWS.payload)
            }
        }

        socket.onclose = (ev) => {
            console.log(ev.reason)
            if (ev.reason == 'Kicked') {
                setKicked(prev => prev = true);
            }
        }



        setSocket(prev => prev = socket);

        return () => {
            socket.close(1000);
        }

    }, [])



    // useEffect(() => {

    //     const handleMessageComing = (data: any) => {
    //         console.log("data from user: ", data);
    //         console.log(userChatSelected, groupChatSelected);
    //         if (userChatSelected != null && groupChatSelected == null) {
    //             console.log("jjh")
    //             if (data.roomId != userChatSelected._id) {
    //                 //here we have to add the message to the notification
    //                 if (mychats != null) {
    //                     for (let i = 0; i < mychats?.length; i++) {
    //                         if (mychats[i]._id == data.roomId) {
    //                             console.log("You Got the Notification")
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }
    //             else {
    //                 console.log("user message ", selectedUserMessages)
    //                 setSelectedUserMessages([...selectedUserMessages, {
    //                     _id: data.messageId,
    //                     myId: userChatSelected?._id,
    //                     message: data.message,
    //                     friendId: userChatSelected.friendId
    //                 }]);
    //                 // setConnected(fr)

    //                 console.log("selected user mesage ", [...selectedUserMessages, {
    //                     _id: data.messageId,
    //                     myId: userChatSelected?._id,
    //                     messsage: data.message,
    //                     friendId: userChatSelected.friendId
    //                 }])
    //             }
    //         }
    //         else if (groupChatSelected != null && userChatSelected == null) {
    //             if (data.roomId != groupChatSelected._id) {
    //                 //here we have to add the message to the notification
    //                 if (groupChats != null) {
    //                     for (let i = 0; i < groupChats?.length; i++) {
    //                         if (groupChats[i]._id == data.roomId) {
    //                             console.log("You Got the Notification")
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }
    //             else {
    //                 setSelectedGroupMessages([...selectedGroupMessages, data.data]);
    //                 console.log([...selectedGroupMessages, data])
    //             }
    //         }
    //     }
    //     if (socket != null) {
    //         socket.on("new-message", handleMessageComing);
    //     }


    //     if (socket != null) {
    //         //it is more important
    //         return () => {
    //             socket.off("new-message", handleMessageComing)
    //         }
    //     }
    // }, [userChatSelected, groupChatSelected, selectedGroupMessages, selectedUserMessages])


    return (
        <div className="fixed w-vw ">
            <Header />
            <div className="w-screen h-screen bg-[radial-gradient(ellipse_at_top_right,_#facc15,_#222222,_#000000)] ">
                <SidebarProvider className="flex flex-row h-full " style={{ "--sidebar-width": "25rem" } as React.CSSProperties}
                >
                    <SlideBarForChat />

                    <main className={`h-[90vh] w-full border-none rounded-none`}>
                    <SidebarTrigger className={`w-10 text-white mt-[7px] bg-black`} />
                        {userChatSelected ? <Card className="border-none  w-full h-full flex flex-col gap-2 pt-0 rounded-none">
                            <CardHeader className="pt-5 h-[10%] w-full bg-[#191919] text-white flex flex-row px-3">
                                <div className="flex flex-row gap-10">
                                    <div className="flex flex-row gap-3">
                                        <Avatar className="w-10 h-10 mt-1 bg-black text-amber-50">
                                            <AvatarFallback className="bg-black">JS</AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col">
                                            <span>{userChatSelected?.friendId.username}</span>
                                            {connectedUsers && connectedUsers.findIndex((id) => id == userChatSelected?.friendId._id) != -1 ? <span className="text-[12px] flex flex-row gap-1">Status <img src="/greenDot.png" className="w-5 h-5" /> </span> : <span className="text-[12px] flex flex-row gap-1">Status <img src="/redDot.png" className="w-5 h-5" /></span>}

                                        </div>

                                    </div>
                                </div>

                            </CardHeader>
                            <CardContent className="h-[80%] w-full flex flex-col ">
                                <ScrollArea className="h-full w-full flex flex-col gap-6">
                                    {/* {auth.user?.userId} */}

                                    {userChatSelected && selectedUserMessages ? selectedUserMessages.map((item, index) => (
                                        <div key={index} className="w-full h-10 mt-3">

                                            {
                                                auth.user && item.myId == auth.user?.userId ? <div className="w-full h-full pt-2 rounded-2xl  flex flex-row justify-end pr-3">
                                                    <span className="w-auto bg-[#d8d2d2] rounded-[10px]  px-5 h-9 rounded-tl-none  p-1 mr-3 mt-[3px]">{item.message}</span>
                                                    <Avatar className="w-7 h-7 mt-1 mr-2">
                                                        <AvatarFallback className="bg-black text-amber-50">{item.friendId.username[0].toUpperCase()}</AvatarFallback>
                                                    </Avatar>  </div>
                                                    : <div className="w-full h-full  rounded-2xl flex flex-row justify-start pl-3 pt-2">

                                                        <Avatar className="w-10 h-10 mt-1">
                                                            <AvatarFallback className="bg-black text-amber-50">{item.friendId.username[0].toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="w-auto bg-[#f1c4c4] px-5 rounded-[10px] rounded-tr-none   h-[30px] p-1 ml-3 mt-[9px]">{item.message}</span> </div>
                                            }
                                        </div>


                                    )) : "No messages"}



                                </ScrollArea>
                            </CardContent>

                            <CardFooter className="h-[5%] flex flex-row gap-3 pb-0 items-center pt-10">
                                <Input ref={messageRef} placeholder="Type something here..." onChange={() => {
                                    console.log(messageRef.current?.value);
                                    // setIsTyping(true);
                                }} />

                                <Button onClick={() => handleSendingMessage()}><SendIcon /></Button>
                            </CardFooter>
                        </Card> :
                        
                        
                        groupChatSelected ? <Card className="w-full h-full flex flex-col gap-0 pt-0 rounded-none border-none">
                            <CardHeader className="pt-5 h-[10%] w-full bg-[#191919] text-white flex flex-row px-3">
                                <div className="flex flex-row gap-10 ">
                                                <div className="flex flex-row gap-3">
                                        <Avatar className="w-10 h-10 mt-1 bg-black text-amber-50">
                                            <AvatarFallback className="bg-black">JS</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span>{groupChatSelected?.name}</span>

                                            <span className="text-[12px]">Status</span>

                                        </div>

                                    </div>
                                </div>

                            </CardHeader>
                            <ScrollArea className="h-[80%] w-full flex flex-col gap-3">


                                <CardContent className="h-[80%] w-full flex flex-col gap-3">
                                    {groupChatSelected && selectedGroupMessages ? selectedGroupMessages.map((item, index) => (
                                        <div key={index} className="w-full h-10 ">
                                            {
                                                item.userId?._id == auth.user?.userId ? <div className="w-full h-full pt-2 rounded-2xl  flex flex-row justify-end pr-3">
                                                    <span className="w-auto bg-[#d8d2d2] rounded-[10px] h-9 rounded-tl-none  p-1 mr-3 mt-[3px]">{item.message}</span>

                                                    <Avatar className="w-7 h-7 mt-1 mr-2">
                                                        <AvatarFallback className="bg-black text-amber-50">{item.userId.username[0].toUpperCase()}</AvatarFallback>
                                                    </Avatar> </div>
                                                    : <div className="w-full h-full rounded-2xl flex flex-row justify-start pl-3">

                                                        <Avatar className="w-7 h-7 mt-1 mr-2">
                                                            <AvatarFallback className="bg-black text-amber-50">{item.userId?.username[0].toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="w-auto bg-[#f1c4c4] rounded-[10px] h-9 rounded-tr-none  p-1 ml-3 mt-[3px] ">{item.message}</span> </div>
                                            }
                                        </div>


                                    )) : "No messages"}





                                </CardContent>
                            </ScrollArea>
                            <CardFooter className="h-[5%] py-11 flex flex-row gap-3  items-center pt-10 sm:pb-3">
                                <Input ref={messageRef} placeholder="Type something here..." onChange={() => {
                                    console.log(messageRef.current?.value);
                                    // setIsTyping(true);
                                }}
                                    className="sm:mb-9 sm:pb-3"
                                />

                                <Button onClick={() => handleSendingMessage()}><SendIcon /></Button>
                            </CardFooter>
                        </Card> :

                            <Card className="w-full h-full rounded-none">
                                <CardContent className="w-full h-full flex flex-row justify-center items-center">
                                    <span>Click on the Chats to Start Message</span>
                                </CardContent></Card>}
                        {<Lottie animationData={loader} />}
                    </main>
                </SidebarProvider>
            </div>
        </div>
    )
}