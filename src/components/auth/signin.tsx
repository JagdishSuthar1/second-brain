import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { axiosInstance } from "@/axiosInstance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    
    const {signInFormData , setSignInFormData , setAuth} = useContext(AuthContext)!;
    const navigate = useNavigate()
    async function handleSignin() {
        ////console.log(signInFormData);
        const response = await axiosInstance.post("/api/v1/auth/signin" , signInFormData);
        ////console.log(response.data);
        if(response.data.success == true) {
            setAuth({
                authenticated : true,
                user : response.data.data
            })
            sessionStorage.setItem("accessToken" , JSON.stringify(response.data.data.token));
            sessionStorage.setItem("user" , JSON.stringify(response.data.data));
            toast.success(response.data.message)
            navigate("/")
        }
        else {
            toast.error(response.data.message);
        }
    }

    return (
        <Card className="w-full h-full bg-[#222222] text-amber-50">
            <CardHeader className="flex  flex-col justify-items-start">
                <CardTitle >Signin</CardTitle>
                <CardDescription>Fill the data correctly</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 w-full h-full">
                <div className="w-full h-15 flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" onChange={(event)=> setSignInFormData({...signInFormData , email : event.target.value})} />
                </div>
                <div className="w-full h-15 flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="text" id="password" onChange={(event)=> setSignInFormData({...signInFormData , password : event.target.value})}/>
                </div>
                <div className="h-15 w-full">
                    <Button className="hover:cursor-pointer  w-full"onClick={()=>handleSignin()}>Signin</Button>
                </div>
            </CardContent>
        </Card>
    )
}
