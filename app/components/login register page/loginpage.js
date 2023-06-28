"use client";

import Link from "next/link"
import Button from "../ui components/button"
import TextBox from "../ui components/textbox"
import { useState } from "react"
import PostAuthenticate from "@/app/(api methods)/PostAuthenticate";
import Cookies from "universal-cookie";
import Spinner from "../ui components/spinner";
import { useRouter } from 'next/navigation'
import { ClearUser } from "@/app/(global methods)/User";

export default function LoginForm(){
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [requestSent, setRequestSent] = useState([false, false, ""])

    const router = useRouter()
    const cookies = new Cookies()
    
    
    function SignInUser(){
        const data = {
            "email": email,
            "password": password,
        }
        
        ClearUser()

        PostAuthenticate(data).then((response) => 
        {
            //data validation to be added on component level
            if(response.succeeded && response.data.isVerified)
            {
                setRequestSent([false, ""])
                setFormSubmitted(true)
                cookies.set("bearer_token", response.data.jwToken, {path: "/", maxAge: 360})
                cookies.set("user", {email: response.data.email, roles: response.data.roles, id: response.data.id}, {path: "/", maxAge: 360})
                setRequestSent([false, true, `${response.Message ?? "Signing in..."}`])
                router.replace('/admin-panel')
            }
            else
            {
                setRequestSent([true, false, `${response.Message ?? "An unexpected error ocurred."}`])
            }
        })
    }


    return(
        <div className="relative min-w-fit max-w-3xl max-sm:w-full bg-black-900 m-auto top-20 p-8
                        max-md:h-full shadow-md shadow-black-900/40">
            <div className="text-4xl font-semibold border-b-2 pb-4 border-white-900/70 mb-5">Login</div>
            <div className="mb-8 flex flex-col gap-6">
                <TextBox onChange={setEmail} inputStyle="text-black-900 rounded-md" labelVisible={true} label="Email" placeHolder="email@example.com"/>
                <TextBox onChange={setPassword} inputStyle="text-black-900 rounded-md" labelVisible={true} label="Password" type="password" placeHolder="password"/>
            </div>
            {requestSent[0] == true && <Alert message={requestSent[2]}/>}
            {requestSent[1] == true && <LoadingAlert color="text-sap_green-50" message={requestSent[2]}/>}
            <div className="flex gap-8 justify-between max-[480px]:flex-col">
            <div className="flex gap-2 ">
            <Button text="SIGN IN" onClick={() => SignInUser()} className="h-12 w-30 bg-opacity-90 hover:bg-opacity-100 text-black-900 font-semibold"/>
            <Link href="register">
            <Button text="REGISTER" color="bg-transparent" 
                className="h-12 w-30 border-2 border-white-900 bg-transparent hover:border-turquoise-50 hover:text-turquoise-50 transition-all"/>
            </Link>
            </div>
            <div className="mt-5 hover:cursor-pointer hover:text-turquoise-50 active:opacity-80 transition-all">
                Forgot the password?
            </div>
            </div>
        </div>
    )
}
 
function Alert({...props}){
    return(
        <div className={`${props.color ?? "text-raspberry-700"}  mb-7  a`}>
            {props.message}
        </div>
    )
}

function LoadingAlert({...props}){
    return(
        <div className="flex">
            <Alert color="text-sap_green-50" message={props.message}/> 
            <Spinner className="fill-sap_green-50 h-7 w-7 ml-4"/>
        </div>
    )
}