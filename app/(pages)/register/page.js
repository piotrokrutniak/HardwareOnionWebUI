import Link from "next/link"
import Button from "@/app/components/ui components/button"
import TextBox from "@/app/components/ui components/textbox"
import RegisterForm from "@/app/components/login register page/registerpage"

export default function RegisterPage(){
    return(
        <div className="z-00 relative max-w-qhd mx-auto min-h-[calc(100vh_-_58px)] max-sm:bg-black-900 bg-white-900/10">
            <RegisterForm/>
        </div>   
    )
}