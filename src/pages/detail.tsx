import Header from "@/components/landing/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext } from "react";
import { DashboardContext } from "@/context/dashboard-context";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

export default function ContentDetail() {
    const { aiSummary } = useContext(DashboardContext)!;

    const { auth } = useContext(AuthContext)!;
    const navigate = useNavigate();
    if (auth.authenticated == false) {
        navigate("/auth");
    }
    // console.log(aiSummary)
    return (
        <div className="w-full min-h-screen font-sans flex flex-col gap-11 bg-[#191919] text-amber-50">
            <Header />
            <div className="w-full h-full flex flex-col p-3 text-black justify-center items-center">
                <Card className="w-full  h-full rounded-none bg-[#191919] border-none flex flex-col">
                    <CardHeader className="flex flex-row justify-center md:w-[97.3%] h-10 md:ml-5 mx-5 bg-amber-200 items-center font-bold rounded-[9px]">{aiSummary ? aiSummary.title : ""}</CardHeader>
                    <CardContent className="flex flex-col gap-3 w-full h-full">

                        <div className="flex lg:flex-row w-full gap-3 flex-col lg:h-70">
                            <Card className="lg:w-[47%] lg:h-70 h-70 w-full  flex flex-col gap-0">
                                <CardHeader className="text-[20px] font-bold">
                                    Key points
                                </CardHeader>
                                <ScrollArea className="w-full h-50">
                                    <CardContent className="h-50 flex flex-col gap-2 pl-5">
                                        {aiSummary
                                            ? aiSummary.keyPoints.map((item, index) => (
                                                <Card key={index} className="h-15">
                                                    <CardContent>{item}</CardContent>
                                                </Card>
                                            ))
                                            : ""}
                                    </CardContent>
                                </ScrollArea>
                            </Card>

                            <Card className=" text-black w-full h-full flex flex-col gap-2">
                                <CardHeader className="text-[20px] font-bold">Data</CardHeader>
                                <ScrollArea className="w-full h-110 overflow-hidden">
                                <CardContent className="w-full md:h-full">
                                   {aiSummary ? aiSummary.summary : ""}

                                </CardContent>
                                </ScrollArea>
                            </Card>
                        </div>
                <Card className="pt-3 flex flex-col gap-1 justify-items-start w-full pl-[13px] ">
                    <CardHeader className="text-[20px]  font-bold">
                        Detailed Information
                    </CardHeader>
                    <CardContent className="w-full h-full pl-[25px]">
                                    {aiSummary ? aiSummary.detailInformation : <></>}
                    </CardContent>
                </Card>
                        </CardContent>
                    
                                </Card>
             


        </div>
         </div>
        
    )

    }


