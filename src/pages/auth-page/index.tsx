import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUp from "@/components/auth/signup";
import SignIn from "@/components/auth/signin";
import { Toaster } from "sonner";

export function AuthPage() {

    
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#191919] text-amber-50">
            <Tabs className="w-100 h-110 " defaultValue="signup">
                <TabsList className="w-full h-[8%] bg-[#222222] ">
                    <TabsTrigger value="signup" className="hover:cursor-pointer">Signup</TabsTrigger>
                    <TabsTrigger value="signin" className="hover:cursor-pointer">Signin</TabsTrigger>
                </TabsList>
                <TabsContent value="signup" className="h-[90%] w-full bg-[#222222]">
                   <SignUp/>
                </TabsContent>
                <TabsContent value="signin" className="h-[90%] w-full bg-[#222222]">
                   <SignIn/>
                </TabsContent>
            </Tabs>
            <Toaster/>

        </div>
    )
}