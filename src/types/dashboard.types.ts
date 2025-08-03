
type TagType = {
    _id?: string,
    title: string
}
export type DashboardDataType = {
    _id: string
    link: string,
    type: string,
    title: string,
    data: string,
    allTags: TagType[],
    userId?: string,
    video_image_url? : string,
    public_id? : string,
    created: string
}


export type ShareDashboardDataType = {
    _id: string
    link: string,
    type: string,
    title: string,
    data: string,
    allTags: TagType[],
    userId?: string,
    video_image_url? : string,
    public_id? : string,
    created: string
}

export type ContentDetailType = {
    link: string,
    type: string,
    title: string,
    data: string,
    video_image_url? : string,
    public_id? : string,
    allTags: TagType[],
}

export type suggestedContentType = {
    _id: string
    link: string,
    type: string,
    title: string,
    data: string,
    userId?: string,
    created: string
}

export type AiSummaryType = {
    title: string,
    summary: string,
    keyPoints: string[],
    detailInformation: string
}
export type DashboardContextType = {
    dashboardData: DashboardDataType[] | null,
    setDashboardData: React.Dispatch<React.SetStateAction<DashboardDataType[] | null>>,
    contentDetail: ContentDetailType,
    setContentDetail: React.Dispatch<React.SetStateAction<ContentDetailType>>,
    contentProgress: number,
    setContentProgress: React.Dispatch<React.SetStateAction<number>>,
    currentTab: string,
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>,
    tagsForTextArea: string,
    setTagsForTextArea: React.Dispatch<React.SetStateAction<string>>
    // queryParams : URLSearchParams,
    // setQueryParams : SetURLSearchParams
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    searchOpen: boolean
    setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>,
    suggestedContent: suggestedContentType[] | null
    , setSuggestedContent: React.Dispatch<React.SetStateAction<suggestedContentType[] | null>>,
   aiSummary  : AiSummaryType | null, 
   setAiSummary : React.Dispatch<React.SetStateAction<AiSummaryType | null>>,
   fetchingContentForDashboard  : boolean
   ,setFetchingContentForDashboard : React.Dispatch<React.SetStateAction<boolean>>,
   shareDashboardContent : ShareDashboardDataType[] | null,
    setShareDashboardContent : React.Dispatch<React.SetStateAction<ShareDashboardDataType[] | null>>,
    shareFilter: string,
    setShareFilter: React.Dispatch<React.SetStateAction<string>>,
    shareContentData :DashboardDataType | null
    , setShareContentData : React.Dispatch<React.SetStateAction<DashboardDataType | null>>

}