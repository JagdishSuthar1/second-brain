import { createContext, useState, type ReactNode } from "react";
import type { DashboardDataType, DashboardContextType, ContentDetailType, suggestedContentType, AiSummaryType, ShareDashboardDataType } from "@/types/dashboard.types"

export const DashboardContext = createContext<DashboardContextType | null>(null);

type childrenProps = {
    children: ReactNode
}
export default function DashboardContextProvider({ children }: childrenProps) {

    const [dashboardData, setDashboardData] = useState<DashboardDataType[] | null>(null);
    const [contentDetail, setContentDetail] = useState<ContentDetailType>(
        {
            link: "",
            type: "",
            title: "",
            data: "",
            allTags : []
        }
    );
    const [contentProgress, setContentProgress] = useState(0);
    const [currentTab, setCurrentTab] = useState("Type");
    const [tagsForTextArea, setTagsForTextArea] = useState<string>("");
    const [fetchingContentForDashboard ,setFetchingContentForDashboard] = useState<boolean>(true);
    //  const [queryParams , setQueryParams] = useSearchParams();
    const [searchOpen , setSearchOpen] = useState(false);
    const [filter , setFilter] = useState("");
    const [suggestedContent , setSuggestedContent] = useState<suggestedContentType[] | null>(null)
    const [aiSummary , setAiSummary] = useState<AiSummaryType | null>(null);
    const [shareDashboardContent , setShareDashboardContent] = useState<ShareDashboardDataType[] | null>(null);
    const [shareFilter , setShareFilter] = useState("");
    const [shareContentData , setShareContentData] = useState<DashboardDataType | null>(null)
    return (
        <DashboardContext.Provider value={{ dashboardData, setDashboardData, contentDetail, setContentDetail, contentProgress, setContentProgress, currentTab, setCurrentTab, tagsForTextArea, 
            setTagsForTextArea , 
            filter , setFilter, 
            searchOpen , setSearchOpen, 
            suggestedContent , setSuggestedContent , 
            aiSummary , setAiSummary,
        fetchingContentForDashboard ,setFetchingContentForDashboard,
    shareDashboardContent , setShareDashboardContent, 
shareFilter , setShareFilter,
shareContentData , setShareContentData}}>{children}</DashboardContext.Provider>
    )
}