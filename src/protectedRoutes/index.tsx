import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom"

type ProtectedRoutesProps = {
    authenticated : boolean,
    element : ReactNode
}
export default function ProtectedRoutes({authenticated  , element} : ProtectedRoutesProps) : ReactNode {
    const location = useLocation();
    const navigate = useNavigate();
    const {loading } = useContext(AuthContext)!;

    useEffect(()=>{
        if(loading) return
        if(authenticated == false) {
            navigate("/auth");
        }
        else if(authenticated == true && location.pathname.includes("auth")) {
        navigate("/")
    }
    },[loading, authenticated]) 
    
    if(loading) return <div>Loading...</div>;
    else if(loading == false) {
    return (
        <div>
            {element}
        </div>
        
    )
}
     
}