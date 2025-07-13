import type { Socket } from "socket.io-client"


type User = {
    _id: string
    username: string,
    password?: string,
    email?: string
}

export type Messages = {
    _id: string,
    myId: string,
    message: string,
    friendId: User
}

export type MyChatType = {
    _id: string,
    myId: string,
    friendId: User,
    latestMessage: Messages
}

export type GroupChatType = {
    _id : string,
    groupAdmin: User,
    members: User[],
    name: string,
    latestMessage: Messages
}


export type GroupMessageType = {
    _id : string,
    groupId : string,
    userId : User,
    message : string
}


export type ChatBoardContextType = {
    mychats: MyChatType[] | null,
    setMyChats: React.Dispatch<React.SetStateAction<MyChatType[] | null>>,
    groupChats: GroupChatType[] | null,
    setGroupChats: React.Dispatch<React.SetStateAction<GroupChatType[] | null>>,
    currentTabforChat: string,
    setCurrentTabForChat: React.Dispatch<React.SetStateAction<string>>,
    mainSize: boolean,
    setMainSize: React.Dispatch<React.SetStateAction<boolean>>,
    fetchfriendsAgain: boolean,
    setFetchFriendsAgain: React.Dispatch<React.SetStateAction<boolean>>,
    fetchGroupsAgain: boolean,
    setFetchGroupsAgain: React.Dispatch<React.SetStateAction<boolean>>,
    userChatSelected: MyChatType | null,
    setUserChatSelected: React.Dispatch<React.SetStateAction<MyChatType | null>>,
    groupChatSelected: GroupChatType | null,
    setGroupChatSelected: React.Dispatch<React.SetStateAction<GroupChatType | null>>,
    selectedUserMessages: Messages[],
    setSelectedUserMessages: React.Dispatch<React.SetStateAction<Messages[]>>,
    selectedGroupMessages  : GroupMessageType[],
    setSelectedGroupMessages : React.Dispatch<React.SetStateAction<GroupMessageType[]>>
    socket: Socket | null,
    setSocket: React.Dispatch<React.SetStateAction<Socket | null>>

}