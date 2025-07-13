import { Dialog, DialogTrigger , DialogContent, DialogOverlay, DialogTitle} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LinkIcon, Share2Icon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { toast } from "sonner";
import { Input } from "../ui/input";
import CryptoJS from 'crypto-js'

const secretKey = "Jagdish-Suthar";

export default function ShareContent() {
    const [linkGenerated , setLinkGenerated] = useState<boolean>(false);
    const [linkforShare,setLinkforShare ] = useState<string>("");

    const {auth} = useContext(AuthContext)!;

    async function handleLinkGenerate() {
        if(auth.user != null) {
            try {
                const hashedUserId = encodeURIComponent(CryptoJS.AES.encrypt(auth.user.userId , secretKey).toString());
                const shareableString = `http://localhost:5173/share/all/${hashedUserId}`
                setLinkforShare(shareableString);
                setLinkGenerated(true);
                console.log(hashedUserId);
                toast.success("Link Generated Successfully")
            }
            catch(err) {
                toast.error("Link Not Generated")
            }
            
        }
        else {
            toast.error("Link Not Generated")
        }
    }

    async function handleLinkCopy() {
        try {
            if(linkforShare != "") {
                await navigator.clipboard.writeText(linkforShare);
            }
            else {
                toast.error("Generate the Link first")
            }
        }
        catch(err) {
                toast.error("Link Not Copied")
        }
    }

    return (
        <Dialog onOpenChange={()=>{
             setLinkGenerated(false);
            setLinkforShare("")
        }}>
            <DialogTrigger asChild>
                <Button className="flex flex-row gap-3 hover:cursor-pointer">
                                    <Share2Icon className="hover:cursor-pointer" />
                                    <span>Share</span>
                                </Button>
            </DialogTrigger>
            <DialogOverlay className="bg-black/50 fixed inset-0 z-40" />
            <DialogContent className="bg-[#191919] flex flex-col gap-3">
            <DialogTitle className="text-amber-50 pl-1">Share Your Brain</DialogTitle>
                <Card>
                    <CardContent className="flex flex-row">
                        <Input placeholder="Generate the link" readOnly value={linkforShare} className="rounded-r-none " />
                            {linkGenerated ? <Button className="hover:cursor-pointer rounded-l-none " onClick={()=> handleLinkCopy()}>Copy <LinkIcon/></Button> : <Button className="hover:cursor-pointer rounded-l-none " onClick={()=> handleLinkGenerate()}>Generate</Button> }

                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}