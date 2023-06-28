import Link from "next/link"
import Button from "@/app/components/ui components/button"
import TextBox from "@/app/components/ui components/textbox"
import RegisterForm from "@/app/components/login register page/registerpage"

export default function RegisterPage(){
    return(
        <div className="z-00 relative mx-auto min-h-[calc(100vh_-_58px)] max-md:bg-black-900 bg-cornflower_blue-100/20">
            <RegisterForm/>
        </div>   
    )
}