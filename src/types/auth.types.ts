import type { ReactNode } from "react"

export type SignUpDataType = {
    username : string, 
    email : string , 
    password : string
}


export type SignInDataType = {
    email : string , 
    password : string
}

export type childrenProps = {
    children : ReactNode
}

export type AuthProps = {
    authenticated : boolean ,
    user : {
        userId : string,
        token : string
    } | null
}


export type AuthContextType = {
    auth : AuthProps,
    setAuth : React.Dispatch<React.SetStateAction<AuthProps>>,
    signUpFormData : SignUpDataType ,
    setSignUpFormData : React.Dispatch<React.SetStateAction<SignUpDataType >>,
    signInFormData : SignInDataType ,
    setSignInFormData : React.Dispatch<React.SetStateAction<SignInDataType >>,
    loading : boolean,
    setLoading : React.Dispatch<React.SetStateAction<boolean>>
    
}


////////////////////////////////////////


// export type DashboardProps = {
//     children : ReactNode
// }