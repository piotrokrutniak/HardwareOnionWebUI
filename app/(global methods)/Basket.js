import Cookies from "universal-cookie"
import { GetUser } from "@/app/(global methods)/User";
import { GetUserBasket } from "@/app/(global methods)/User";

const cookies = new Cookies()

export async function GetBasket(){
    cookies.get(user)
    cookies.get("user")

    if(GetUser()){
        //To be changed to a method searching by email
        const basket = GetUserBasket()
        console.log(basket)
        return basket
    }
    else{
        const basket = cookies.get("basket")
        if(!basket){
            basket = {
                "orderItems": []
            }

            cookies.set("basket", basket, {path: "/"})
        }
        return 
    }
}
