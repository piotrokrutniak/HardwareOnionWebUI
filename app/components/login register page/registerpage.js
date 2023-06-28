"use client";

import Link from "next/link"
import Button from "@/app/components/ui components/button"
import TextBox from "@/app/components/ui components/textbox"
import { useState } from "react"
import { EmailSentPicture } from "../icons";
import PostRegister from "@/app/(api methods)/PostRegister";

export default function RegisterForm(){
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [wrongRequest, setWrongRequest] = useState([false, ""])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    function RegisterUser(){
        let data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "userName": email,
            "password": password,
            "confirmPassword": confirmPassword,
        }

        PostRegister(data).then((response) => 
            {
                //data validation to be added on component level
                if(response.message == "535: Authentication failed")
                {
                    setFormSubmitted(true)
                }
                else
                {
                    setWrongRequest([true, `${response.Message ?? "An unexpected error ocurred."}`])
                }
            })
    }

    //register api method to be added to api folder and mapped onyo the states

    return formSubmitted == false ? (
        <div className="relative min-w-fit max-w-3xl max-sm:w-full bg-black-900 m-auto top-20 p-8
                        max-md:h-full shadow-md shadow-black-900/40">
            <div className="text-4xl font-semibold border-b-2 pb-4 border-white-900/70 mb-5 ">Sign Up</div>
            <div className="mb-8 flex flex-col gap-6">
                <TextBox inputStyle="text-black-900 rounded-md" onChange={setEmail} labelVisible={true} label="Email" placeHolder="email@example.com"/>
                <TextBox inputStyle="text-black-900 rounded-md" onChange={setFirstName} labelVisible={true} label="First Name" placeHolder="email@example.com"/>
                <TextBox inputStyle="text-black-900 rounded-md" onChange={setLastName} labelVisible={true} label="Last Name" placeHolder="email@example.com"/>
                <TextBox inputStyle="text-black-900 rounded-md" onChange={setPassword} labelVisible={true} label="Password" type="password" placeHolder="password"/>
                <TextBox inputStyle="text-black-900 rounded-md" onChange={setConfirmPassword} labelVisible={true} label="Confirm Password" type="password" placeHolder="password"/>
            </div>
            {wrongRequest[0] == true && <Alert message={wrongRequest[1]}/>}
            <div className="flex gap-2 justify-between max-[480px]:flex-col">
            <div className="flex gap-2">
            <Button text="CONFIRM" onClick={() => RegisterUser()} className="h-12 w-30 text-black-900 font-semibold"/>
            </div>
            <Link href="login">
            <div className="mt-5 hover:cursor-pointer hover:text-turquoise-50 active:opacity-80 transition-all">
                Already registered? Sign in here.
            </div>
            </Link>
            </div>
        </div>
    ) :
    <div className="mx-auto relative max-w-lg top-32 text-lg">
        A confirmation link has been sent to your email address.
        <EmailSentPicture className="flex scale-50  m-auto -top-10 absolute"/>
    </div>
}

function Alert({...props}){
    return(
        <div className="mb-7 text-raspberry-700 a">
            {props.message}
        </div>
    )
}