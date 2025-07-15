import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUp from "@/components/auth/signup";
import SignIn from "@/components/auth/signin";
import { Toaster } from "sonner";

export function AuthPage() {

    
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[linear-gradient(to_right,_#222222,_#facc15)]  text-amber-50">
            <Tabs className="md:w-100 md:h-110 " defaultValue="signup">
                <TabsList className="w-full h-[8%] bg-[#222222] ">
                    <TabsTrigger value="signup" className="hover:cursor-pointer text-white hover:text-black">Signup</TabsTrigger>
                    <TabsTrigger value="signin" className="hover:cursor-pointer text-white hover:text-black">Signin</TabsTrigger>
                </TabsList>
                <TabsContent value="signup" className="h-[90%] w-full bg-[#222222] rounded-2xl">
                   <SignUp/>
                </TabsContent>
                <TabsContent value="signin" className="h-[90%] w-full bg-[#222222] rounded-2xl">
                   <SignIn/>
                </TabsContent>
            </Tabs>
            <Toaster/>

        </div>
    )
}