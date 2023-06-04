import Button from "../ui components/button"
import TextBox from "../ui components/textbox"

export default function LoginForm(){
    return(
        <div className="relative min-w-54 w-1/2 h-96 bg-white-900/70 m-auto mt-10 p-8">
            <div className="text-4xl font-semibold border-b-2 pb-4 border-white-900/70 mb-5">Login</div>
            <div className="mb-5">
                <TextBox label="Email" placeHolder="email@example.com"/>
                <TextBox label="Password" type="password" placeHolder="password"/>
            </div>
            <div className="flex gap-2">
            <Button text="SIGN IN" className="h-12 w-30"/>
            <Button text="REGISTER" className="h-12 w-30"/>
            </div>
        </div>
    )
}