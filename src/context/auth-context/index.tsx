import type { SignUpDataType, AuthContextType, AuthProps, childrenProps, SignInDataType } from "@/types/auth.types";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext<AuthContextType | null>(null);


export default function AuthProvider({ children }: childrenProps) {

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        const user = sessionStorage.getItem("user");
        if (user != null && token != null) {
            const userInfo = JSON.parse(user);
            setAuth({
                authenticated: true,
                user: userInfo
            })
        }
        else {
            setAuth({
                authenticated: false,
                user: null
            })   
        }

        setLoading(false);

    }, [])

    const [auth, setAuth] = useState<AuthProps>({
        authenticated: false,
        user: null
    })

    const [loading , setLoading] = useState(true);

    const [signUpFormData, setSignUpFormData] = useState<SignUpDataType>({
        username: "",
        email: "",
        password: ""
    })
    const [signInFormData, setSignInFormData] = useState<SignInDataType>({
        email: "",
        password: ""
    })
    return (
        <AuthContext.Provider value={{ auth, setAuth, signUpFormData, setSignUpFormData, signInFormData, setSignInFormData , loading , setLoading}}>{children}</AuthContext.Provider>
    )
}