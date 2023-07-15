import Cookies from "universal-cookie"
import { GetUser } from "@/app/(global methods)/User";
import PutOrderItem from "../(api methods)/PutOrderItem";
import PostOrderItem from "../(api methods)/PostOrderItem";
import GetUserBasket from "../(api methods)/GetUserBasket";

const cookies = new Cookies()

export async function GetBasket(){
    let user = await GetUser()
    
    if(user){
        //To be changed to a method searching by email

        return GetUserBasket(user.email)
    }
    else
    {
        let basket = cookies.get("basket")
        if(basket == undefined){
            basket = {
                data: 
                {
                    orderStatus: "Basket",
                    userEmail: "guest@email.com", 
                    "orderItems": [] 
                }
            }
            
            cookies.set("basket", basket, {path: "/"})
        }

        return cookies.get("basket")
    }
}

export async function AddOrUpdateToBasket(item){
    let currentBasket = await GetBasket()//.then(x => console.log(x))
    let signedInUser = await GetUser()

    let index = currentBasket.data.orderItems.findIndex(x => x.productId == item.productId)
    console.log(currentBasket)

    console.log(index)

    if(index > -1){
        item.id = currentBasket.data.orderItems[index].id
        item.quantity = currentBasket.data.orderItems[index].quantity + 1

        currentBasket.data.orderItems[index] = item

        return signedInUser ? PutOrderItem({...item}) : cookies.set("basket", currentBasket, {path: "/"})
    }
    else
    return signedInUser ? PostOrderItem(item) : currentBasket.data.orderItems.push(item) && cookies.set("basket", currentBasket, {path: "/"})
}