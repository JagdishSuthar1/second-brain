import Header from "@/components/landing/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext, useEffect } from "react";
import { DashboardContext } from "@/context/dashboard-context";
// import ReactPlayerVideo from "@/components/reactPlayer";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { axiosInstance } from "@/axiosInstance";
import CryptoJS from "crypto-js"
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

const secretKey = "Jagdish-Suthar";

export default function ShareSingleContent() {
    const {shareContentData , setShareContentData} = useContext(DashboardContext)!
       const {auth} = useContext(AuthContext)!;
    const navigate = useNavigate();
    if(auth.authenticated == false) {
    navigate("/auth")
    }
       async function handleCopy(link : string) {
        try {
            await navigator.clipboard.writeText(link);
            toast.success("Link Copied")
        }
        catch(err) {
            console
            toast.error("Failed to Copy")
        }
    }


    async function handleLoadingContent(contentId : string) {
        try {
            const response = await axiosInstance.get(`/api/v1/content/single/${contentId}`);
            //console.log(response.data)
            if(response.data.success == true) {
                    setShareContentData(response.data.data);
            }
            
        }
        catch(err) {
            toast.error("DataBase Issue")
        }
    }

    useEffect(()=>{

        const id = window.location.pathname.split("/")[3];
        //console.log(id);
         const bytes = CryptoJS.AES.decrypt(decodeURIComponent(id), secretKey);
        const contentId = bytes.toString(CryptoJS.enc.Utf8);
        //console.log("id" ,contentId);
        handleLoadingContent(contentId);

        return ()=>{
            setShareContentData(null)
        }
    },[])
    
    // //console.log(aiSummary)
    return (
        <div className="w-full min-h-screen font-sans flex flex-col gap-11 bg-[#191919] text-amber-50">
            <Header />
            <div className="w-full h-full flex flex-col p-3 text-black justify-center items-center">
                <Card className="w-full  h-full rounded-none bg-[#191919] border-none flex flex-col">
                    <CardHeader className="flex flex-row justify-center md:w-[97.3%] h-10 md:ml-5 mx-5 bg-amber-200 items-center font-bold rounded-[9px]">{shareContentData ? shareContentData.title : ""}</CardHeader>
                    <CardContent className="flex flex-col gap-3 w-full h-full">

                        <div className="flex lg:flex-row w-full gap-3 flex-col lg:h-70">
                            {shareContentData && shareContentData.video_image_url ? <Card className="lg:w-[47%] lg:h-70 h-70 w-full  flex flex-col gap-0">
                                <CardHeader className="text-[20px] font-bold">Video/Image</CardHeader>
                                <CardContent className="w-full h-full">
                                   <video src={shareContentData.video_image_url} controls className="w-[95%] h-[90%] object-contain "/>
                       
                                </CardContent>
                            </Card> : <></>}

                            <Card className=" text-black w-full h-full flex flex-col gap-2">
                                <CardHeader className="text-[20px] font-bold">Data</CardHeader>
                                <ScrollArea className="w-full h-110 overflow-hidden">
                                <CardContent className="w-full md:h-full">
                                    {/* {shareContentData ? shareContentData.data : ""} */}
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo suscipit rerum libero doloribus iure. Fugiat iste culpa ad facere doloribus distinctio mollitia corrupti neque eveniet ullam quod, natus quo ipsum maxime laboriosam at dolorum animi et expedita obcaecati alias totam. Velit molestiae ipsam iure explicabo dolor! Autem, excepturi laudantium facere recusandae fugiat aperiam ullam voluptatem at omnis commodi quasi, nostrum dolor accusantium laboriosam pariatur sint aspernatur mollitia, adipisci voluptates! Quis voluptatum quisquam rem! Est beatae maiores voluptatibus ipsam ducimus odio optio voluptatum aperiam libero quisquam error atque debitis fugit, saepe a eos aliquam consequuntur eum facere ratione quod accusantium fugiat, similique at. Molestias omnis dolor, repellendus delectus eos alias ad sed quidem accusantium doloremque aspernatur dolores itaque nesciunt voluptas earum nisi quibusdam, ipsam perspiciatis. Vitae sequi nesciunt officia, atque minima repellat distinctio, fugit, incidunt exercitationem commodi autem? Ab quae vero blanditiis, deleniti ipsam, dicta sunt animi nesciunt voluptatem non nihil sit. Tempora perspiciatis omnis sed aspernatur hic eaque ab necessitatibus minus totam id! Quibusdam hic sequi nesciunt illum. Ab officia dolorum eveniet perferendis sunt itaque, eaque voluptatum consequatur nulla unde alias repudiandae debitis harum vitae rem nisi odio, molestias repellendus assumenda dicta. Distinctio reiciendis minus harum porro ipsum, vel sint nemo quae sapiente doloremque a optio obcaecati aliquid amet repellat animi at consequuntur nam voluptates, culpa eaque esse corrupti dicta dignissimos. Quidem minima ipsa quos consequuntur consectetur officiis voluptatibus temporibus amet perspiciatis! Perspiciatis et, omnis eius officiis similique mollitia necessitatibus, repellat praesentium facilis maxime magnam ratione, libero ipsum sint neque architecto nihil aspernatur dolorem quasi hic. Reiciendis alias cum tempora odio quam laborum. Officia cum dolores ipsam asperiores exercitationem obcaecati dolorem itaque sunt, rerum alias consectetur. Qui aperiam voluptatum iure praesentium, reiciendis soluta facilis sed. Corrupti amet architecto facilis alias ipsam exercitationem quibusdam accusantium, similique esse nobis sint molestias distinctio laborum rem iste, obcaecati saepe nisi consequatur, iure aliquid? Eius repellendus alias, perferendis suscipit sunt iure quidem placeat architecto similique cum, nobis, accusamus reprehenderit impedit iusto laudantium sequi blanditiis in tempore ipsam laboriosam? Asperiores et consequatur excepturi aspernatur assumenda at repellendus laboriosam aliquid quo inventore tempore suscipit deserunt doloribus omnis velit tempora ratione, molestiae accusamus enim iusto optio error vero? Quae necessitatibus aut eius fuga nemo reiciendis voluptatum commodi eos deleniti dolorem debitis, delectus natus. Placeat culpa incidunt, dicta quae cum deserunt, reiciendis sint dolores vero asperiores, aspernatur aperiam iusto vitae? Atque recusandae consequatur accusamus officia deserunt? Enim, maiores sint atque ipsum culpa, itaque ea obcaecati non iste neque, labore veritatis amet praesentium totam assumenda doloribus exercitationem rem repudiandae! Maxime nostrum, similique dicta corporis aspernatur blanditiis nihil accusamus eligendi optio! Cumque excepturi quidem eaque doloribus eum, nisi minima suscipit id sunt sint labore vitae aspernatur quaerat quod consequatur quasi nulla ratione at libero ullam. Tenetur iure ut modi odit, placeat voluptatibus perferendis excepturi sequi amet eius esse vitae est eaque libero deserunt molestiae quos aliquid adipisci cupiditate. Sed, commodi sequi fugit nisi neque distinctio laboriosam debitis reiciendis necessitatibus inventore velit soluta? Quasi voluptas nulla earum exercitationem magnam animi! Animi, dolorem praesentium ipsa nulla exercitationem ex, harum voluptates hic reiciendis esse est vero iste maxime quasi impedit consequuntur accusamus nihil. Eius dolore ipsa quasi. Sed blanditiis quis unde quidem debitis obcaecati, ipsam perferendis fugit excepturi deserunt, eos ipsa illum molestias a non distinctio nemo est! Obcaecati eveniet, accusamus amet nemo doloribus perspiciatis doloremque officiis incidunt fugit asperiores optio corporis molestiae velit dolor. Sapiente dicta perferendis officiis adipisci obcaecati numquam deleniti atque, placeat perspiciatis, error unde nemo alias quidem, aperiam tempora nihil earum in magni. Doloremque sapiente incidunt illum fugiat recusandae aperiam libero quisquam voluptas eveniet similique tenetur ad minus non eius officia, voluptatum, dignissimos sit impedit dolor aspernatur quod animi praesentium quidem voluptates! Eveniet deleniti sint placeat nihil asperiores suscipit nostrum, tempore earum nesciunt aut blanditiis expedita repellat doloribus consequuntur eius voluptatum quis! Necessitatibus delectus tempore illo error, magnam explicabo minus veritatis alias laboriosam in est voluptate itaque, facilis possimus nesciunt recusandae! Laboriosam, sequi ex, tempora ipsam ut quibusdam illo natus doloremque hic nulla facilis, maiores illum molestiae et laborum quisquam! Eum ut tempore molestias beatae illum excepturi cum at architecto aut mollitia modi sit illo quod, minus animi suscipit nihil quae placeat dolores eligendi repellat possimus corrupti. Aspernatur, perferendis ab?
                                </CardContent>
                                </ScrollArea>
                            </Card>
                        </div>
                    
             
                {shareContentData && 
               
               shareContentData.link ? 
                                        <Card className="h-20 pt-3 flex flex-col gap-1 justify-items-start w-full pl-[13px]  ">
                                            <Label className="mt-1 h-3 pl-3 text-black text-[20px] font-bold">Link</Label>

                                        <div className="lg:w-[415px]  w-[80%] font-sans ml-3  h-7 rounded-[5px] pl-1 text-black flex flex-row justify-between mt-2 hover:cursor-pointer  mr-1 " onClick={()=>handleCopy(shareContentData.link)}>
                                                    <a className="overflow-hidden ">{shareContentData.link}</a>
                                                     </div></Card> : <></>}

                <Card className="text-blac border-none flex flex-col gap-3 mt-5 rounded-2xl">
                    <CardHeader className="text-[20px]  font-bold pl-[25px]">Detailed Information</CardHeader>
                            <ScrollArea className="h-full w-full">
                    <CardContent className="w-full h-full pl-[25px]">
                        {/* <Card className="h-[80%] w-full"> */}
                            {/* <CardContent className="h-full"> */}
                            {/* </CardContent> */}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis sit similique odio voluptate iusto veritatis quod cumque commodi eum est maxime exercitationem veniam necessitatibus, eveniet neque mollitia ea optio distinctio a repudiandae. Expedita, iure reprehenderit ipsam repudiandae facere facilis sequi, debitis dolor consequuntur culpa officia aspernatur cupiditate eius aperiam totam non beatae. Aspernatur corporis possimus, rem ratione officia cum! Odio velit expedita consectetur ipsum ipsam, numquam ea voluptatum molestias, provident et iste nulla at. At consectetur placeat quaerat reiciendis deserunt, dignissimos aspernatur sed fugiat amet delectus ex vel, voluptate suscipit? Nostrum provident repellat mollitia natus, eligendi est laborum recusandae, commodi ea aspernatur aut obcaecati reprehenderit architecto fugiat beatae nulla amet quae, quod nesciunt labore molestias tenetur officia quidem? Provident quasi iste, quibusdam incidunt placeat illum est sunt aliquid, voluptatibus sit aliquam nam tempore quae. Omnis neque deserunt sint officia, maiores excepturi laboriosam est, minus exercitationem odit obcaecati, cupiditate voluptas optio maxime. Magni veniam expedita deleniti? Sed iure debitis blanditiis nulla expedita. Eligendi id ducimus eum, quam repudiandae maxime corporis minus cumque dicta numquam ipsa. Accusantium, recusandae. Temporibus iure, explicabo magnam harum exercitationem, minima ratione debitis eum et beatae eius asperiores id, voluptates eveniet mollitia. Fugiat, at distinctio? Enim iusto laudantium esse eum ab fugit voluptatibus corrupti optio, sit aut velit pariatur rem commodi, ad dignissimos. Deserunt, sapiente quos officia nulla quis, praesentium nihil consequuntur ducimus delectus a quod, numquam repellendus error modi perspiciatis voluptatibus blanditiis totam facilis dicta quia molestias! Unde ratione recusandae tempora eius modi odit quia vitae impedit officiis debitis deserunt, ab amet nisi adipisci quae necessitatibus voluptatibus cumque doloremque reprehenderit soluta nemo ut omnis dicta nostrum. Ut incidunt quia fuga, provident corrupti beatae dolorum totam, autem doloremque cupiditate accusamus. Nam unde aperiam eos, ex a quia, ut aut autem mollitia doloremque recusandae doloribus? Modi, possimus? Nemo?

                        {/* </Card> */}
                    </CardContent>
                            </ScrollArea>
                </Card>

                </CardContent>
                </Card>
            </div>

        </div>
    )
}