import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { axiosInstance } from "@/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { DashboardContext } from "@/context/dashboard-context";
import { toast } from "sonner";


export default function AddTouYourBrain() {
    const {auth} = useContext(AuthContext)!;
    const {setFetchingContentForDashboard} = useContext(DashboardContext)!;


    
    return (
        <></>
    )
}