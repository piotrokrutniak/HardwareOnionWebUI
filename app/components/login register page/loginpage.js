"use client";

import Link from "next/link"
import Button from "../ui components/button"
import TextBox from "../ui components/textbox"
import { useState } from "react"
import PostAuthenticate from "@/app/(api methods)/PostAuthenticate";

export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [wrongRequest, setWrongRequest] = useState([false, ""])

    function SignInUser(){
        const data = {
            "email": email,
            "password": password,
        }

        PostAuthenticate(data).then((response) => 
        {
            //data validation to be added on component level
            if(response.succeeded)
            {
                setWrongRequest([false, ""])
                setFormSubmitted(true)
            }
            else
            {
                setWrongRequest([true, `${response.Message ?? "An unexpected error ocurred."}`])
            }
        })
    }


    return(
        <div className="relative min-w-fit w-1/2 max-sm:w-full bg-black-900 m-auto top-20 p-8
                        max-[480px]:h-full">
            <div className="text-4xl font-semibold border-b-2 pb-4 border-white-900/70 mb-5 ">Login</div>
            <div className="mb-5">
                <TextBox onChange={setEmail} inputStyle="text-black-900" label="Email" placeHolder="email@example.com"/>
                <TextBox onChange={setPassword} inputStyle="text-black-900" label="Password" type="password" placeHolder="password"/>
            </div>
            {wrongRequest[0] == true && <Alert message={wrongRequest[1]}/>}
            <div className="flex gap-2 justify-between max-[480px]:flex-col">
            <div className="flex gap-2 ">
            <Button text="SIGN IN" onClick={() => SignInUser()} className="h-12 w-30 text-black-900 font-semibold"/>
            <Link href="register">
            <Button text="REGISTER" className="h-12 w-30 border-2 border-white-900 bg-transparent hover:border-turquoise-50 hover:text-turquoise-50 transition-all"/>
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
        <div className="mb-7 text-raspberry-700 a">
            {props.message}
        </div>
    )
}