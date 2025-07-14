import Header from "@/components/landing/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext } from "react";
import { DashboardContext } from "@/context/dashboard-context";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

export default function ContentDetail() {
    const {aiSummary } = useContext(DashboardContext)!
    
    const {auth} = useContext(AuthContext)!;
    const navigate = useNavigate();
    if(auth.authenticated == false) {
    navigate("/auth")
    }
    console.log(aiSummary)
    return (
        <div className="w-full h-full font-sans flex flex-col gap-3 bg-[#191919] text-amber-50">
            <Header />
            <div className="w-full h-full flex flex-col gap-3 p-3 text-black justify-center items-center">
                <Card className="w-full h-[50%] rounded-none bg-[#191919] border-none flex flex-col gap-3">
                    <CardHeader className="flex flex-row justify-center w-[97.3%] h-10 ml-5 bg-amber-200 items-center font-bold rounded-[9px]">{aiSummary ? aiSummary.title : ""}</CardHeader>
                    <CardContent className="flex flex-col gap-3 w-full h-full">
                        <div className="flex flex-row w-full gap-3 h-full">
                            <Card className="w-[30%] h-70 bg-red-200 p-2 flex flex-col gap-0">
                                <CardHeader className="text-[20px] font-bold mt-3">Key points</CardHeader>
                                <ScrollArea className="w-full h-50">
                                <CardContent className="h-50 flex flex-col gap-2 pl-5">
                                    {aiSummary ? aiSummary.keyPoints.map((item , index)=>(
                                        <Card key={index} className="h-15">
                                            <CardContent >{item}</CardContent>
                                        </Card>
                                    )) : ""}
                                </CardContent>
                                </ScrollArea>
                            </Card>

                            <Card className="w-[70%] text-black">
                                <CardHeader className="text-[20px] font-bold">Summary</CardHeader>
                                <CardContent className="w-full h-full">
                                    {aiSummary ? aiSummary.detailInformation : ""}
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-[50%] rounded-none bg-[#191919] text-amber-50 border-none">
                    <CardHeader className="text-[20px]  font-bold">Detailed Information</CardHeader>
                    <CardContent className="w-full h-full">
                        <Card className="h-[80%] w-full">
                            <ScrollArea className="h-full w-full">
                            <CardContent className="h-full">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut corporis officiis quisquam impedit atque hic earum facilis fuga unde numquam quo ad alias sunt laborum, voluptate mollitia, perspiciatis qui. Numquam a quas explicabo nihil minima neque pariatur perferendis harum repellendus omnis incidunt tenetur quaerat quidem modi optio nemo deserunt, libero ea, magnam itaque rerum? Quia necessitatibus ex sapiente minima illum alias accusantium similique natus, suscipit cum sunt recusandae blanditiis officia aliquid, dolorem asperiores. Quia doloremque modi laboriosam placeat repudiandae nobis maiores sunt cupiditate, consequatur vero minima! Molestiae iste quisquam quaerat eveniet perspiciatis, nesciunt tempore sequi recusandae ipsa? Nisi eligendi perspiciatis molestiae dicta laudantium, adipisci alias incidunt neque laboriosam corrupti placeat a, voluptatibus ipsa cumque ipsum velit! Eligendi provident omnis totam cum officiis aliquam maxime numquam, velit aliquid nostrum odio magnam facere id reprehenderit accusantium quidem recusandae mollitia dignissimos veritatis neque minima? Ipsum corrupti officia placeat, non, animi laborum distinctio iure porro perspiciatis illo exercitationem maiores possimus. Vitae repudiandae corrupti totam impedit ratione placeat ipsam? Voluptas exercitationem obcaecati dolorem aliquid, officia, nesciunt soluta consectetur veritatis quasi voluptates eligendi sapiente iusto eveniet modi officiis commodi dolorum perferendis praesentium debitis repellat quaerat. Saepe corporis delectus, eveniet quia qui animi esse ipsam obcaecati aspernatur nihil blanditiis adipisci! Repellat, autem minima. Exercitationem vero voluptatem, est accusamus officiis, commodi saepe dicta non ipsa obcaecati fuga neque temporibus omnis minima consequatur placeat eveniet mollitia voluptate aliquam atque? Iure, aut? Recusandae iusto provident animi modi consequatur quos, tempora atque laborum aut sint totam? Ullam consequatur voluptatem quas hic eveniet magnam illum unde alias blanditiis, ad odit itaque necessitatibus laboriosam fugit cum, veritatis possimus modi, commodi doloribus aperiam! Vel, quo voluptates facilis tempora pariatur fuga nesciunt aspernatur voluptatem praesentium, nisi velit qui voluptate accusamus error fugiat! Eaque aliquam reprehenderit, maxime aperiam itaque assumenda maiores velit excepturi nihil consectetur obcaecati et nemo error quis quibusdam accusamus exercitationem reiciendis eos numquam, iure voluptatem! Est expedita, cum labore quas tempore aut veniam aliquid aperiam repudiandae voluptatibus. Error, doloribus voluptate numquam quas est alias cupiditate, ea asperiores voluptatum esse perspiciatis corporis in voluptatem accusantium dicta quisquam eligendi ipsa excepturi veritatis sint sit eius vero blanditiis? Soluta eos non numquam hic esse. Quod non obcaecati porro magni alias, incidunt expedita, veritatis dolore numquam, dolor distinctio quidem optio. Veritatis accusantium, quis quo, temporibus enim aliquam minus animi cumque qui dignissimos earum error reiciendis. Sed molestiae, maxime dolorem illum sint dicta numquam perferendis dolorum quaerat culpa sunt labore nobis excepturi alias laborum a rerum repellendus quod obcaecati voluptate. Necessitatibus eius reiciendis aliquam quasi nisi ut eaque, laudantium culpa recusandae quaerat, natus odit fugit veritatis eveniet magnam officiis sit delectus temporibus ullam quis. Cumque sed, blanditiis adipisci ipsa odit reiciendis vitae obcaecati temporibus. Culpa esse commodi ex?
                            </CardContent>
                            </ScrollArea>
                        </Card>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}