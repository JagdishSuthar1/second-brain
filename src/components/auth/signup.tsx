import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { axiosInstance } from "@/axiosInstance";
import { toast } from "sonner";


export default function SignUp() {

    const {signUpFormData, setSignUpFormData } = useContext(AuthContext)!;


    async function handleSignup() {
        ////console.log(signUpFormData);

        const response = await axiosInstance.post("/api/v1/auth/signup" , signUpFormData); 
        ////console.log(response.data)
        if(response.data.success == true) {
            // here we render the toast
            toast.success(response.data.message)
        }
        else {
            // here also we render the toast
            toast.error(response.data.message);
        }
    }   
    return (
        <Card className="w-full h-full bg-[#222222] text-amber-50">
            <CardHeader className="flex  flex-col justify-items-start">
                <CardTitle >Signup</CardTitle>
                <CardDescription>Fill the data correctly</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 w-full h-full">
                <div className="w-full h-15 flex flex-col gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" onChange={(event) => setSignUpFormData({ ...signUpFormData, username: event.target.value })} />
                </div>
                <div className="w-full h-15 flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    {/* <Label htmlFor="username">Email</Label> */}
                    <Input type="text" id="email" onChange={(event) => setSignUpFormData({ ...signUpFormData, email: event.target.value })} />
                </div>
                <div className="w-full h-15 flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    {/* <Label htmlFor="username">Password</Label> */}
                    <Input type="text" id="password" onChange={(event) => setSignUpFormData({ ...signUpFormData, password: event.target.value })} />
                </div>
                <div className="h-15 w-full">
                    <Button className="hover:cursor-pointer  w-full" onClick={()=>handleSignup()}>Signup</Button>
                </div>
            </CardContent>
        </Card>
    )
}
