import AdminPanel from "@/app/components/user page/admin panel/adminpanel"
import LoginForm from "@/app/components/login register page/loginpage"

export default function UserPage(){
    return(
        <div className="z-00 relative max-w-qhd mx-auto min-h-[calc(100vh_-_58px)] bg-cornflower_blue-100/25">
            <AdminPanel/>
        </div>
    )
}