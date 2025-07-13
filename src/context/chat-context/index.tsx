import { createContext, useState, type ReactNode } from "react";
import { type Messages, type ChatBoardContextType, type GroupChatType, type MyChatType, type GroupMessageType } from "@/types/chat";
import type { Socket } from "socket.io-client";

export const ChatContext = createContext<ChatBoardContextType | null>(null);

type childrenProps = {
    children: ReactNode
}

export default function ChatContextProvider({ children }: childrenProps) {

    const [mychats, setMyChats] = useState<MyChatType[] | null>(null);
    const [groupChats, setGroupChats] = useState<GroupChatType[] | null>(null);
    const [currentTabforChat, setCurrentTabForChat] = useState<string>("friends");
    const [mainSize , setMainSize] = useState<boolean>(false);

    const [fetchfriendsAgain, setFetchFriendsAgain] = useState<boolean>(true);
    const [fetchGroupsAgain, setFetchGroupsAgain] = useState<boolean>(true);
    const [userChatSelected, setUserChatSelected] = useState<MyChatType | null>(null);
    const [groupChatSelected, setGroupChatSelected] = useState<GroupChatType | null>(null);

    const [selectedUserMessages , setSelectedUserMessages] = useState<Messages[]>([]);
    const [selectedGroupMessages , setSelectedGroupMessages] = useState<GroupMessageType[]>([]);
    const [socket , setSocket] = useState<Socket | null>(null);

    return (
        <ChatContext.Provider value={{mychats, setMyChats , groupChats, setGroupChats , currentTabforChat, setCurrentTabForChat, mainSize , setMainSize ,fetchfriendsAgain, setFetchFriendsAgain , fetchGroupsAgain, setFetchGroupsAgain
            ,
            userChatSelected, setUserChatSelected,
            groupChatSelected, setGroupChatSelected,
            selectedUserMessages , setSelectedUserMessages,
            selectedGroupMessages , setSelectedGroupMessages,
            socket , setSocket
        }}>{children}</ChatContext.Provider>
    )
}