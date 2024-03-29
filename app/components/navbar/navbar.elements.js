import Link from "next/link"
import { ArrowLeftIcon, UserIcon } from "../icons"
import { useEffect, useRef, useState } from "react"
import TextBox from "../ui components/textbox"
import Button from "../ui components/button"
import { cookies } from "next/dist/client/components/headers"
import GetOrder from "@/app/(api methods)/GetOrder"
//import GetUserBasket from "@/app/(api methods)/GetUserBasket" 
import PutOrderItem from "@/app/(api methods)/PutOrderItem"
import ValidatedTextBox from "../ui components/textboxvalidated"
import { AddOrUpdateToBasket, GetBasket as GetUserBasket } from "@/app/(global methods)/Basket"

export function NavbarButton({...props}){
    return(
        <button className="h-10 my-auto ml-5 p-1 px-2 hover:transition-all hover:text-turquoise-50 active:opacity-80"> 
            {props.label} 
        </button>
    )
}

export function ButtonMain({...props}){
    return(
        <button className="h-10 my-auto ml-5 p-1 px-3 bg-rose-600 bg-turquoise-50 bg-opacity-80 rounded-md 
                           hover:transition-all hover:bg-turquoise-50 hover:bg-opacity-90 
                           active:opacity-80 flex justify-between items-center gap-2"
                           onMouseDown={() => props.onClick()}> 
            {props.label ?? ""} 
            <ShoppingCartSVG className="w-8 h-8 inline"/> 
            <ArrowLeftIcon className={`${!props.displayBasket ? "rotate-90" : "-rotate-90"} h-6 w-4 transition-all cursor-pointer`}/>
        </button>
    )
}

export function UserShortcut({...props}){
    return(
        <div className={`${props.className} flex hover:cursor-pointer`} onMouseDown={props.onClick}>
            <UserIcon className={`border-white-900 ${props.width ?? "w-10"} ${props.height ?? "h-10"} inline border-4 rounded-full`}/>
        </div>   
    )
}

export function UserPanel({...props}){
    let userPanelRef = useRef()

    useEffect(() => {

        let handler = (event)=>{
            if (!userPanelRef.current?.contains(event.target)){
                props.setVisible(false)
            }
            props.checkUser()
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
   })

    return props.visible ? (
        <div className="bg-black-900 w-80 inline-block absolute top-16 right-2 text-lg  rounded-xl  max-md:hidden shadow-md shadow-black-900/30" 
            ref={userPanelRef}>
                        
                        <div className="flex bg-cornflower_blue-100/10 w-full justify-between p-7 rounded-xl rounded-b-none border-black-900">
                            <UserShortcut width="w-8" height="h-8"/>
                            <div>
                                {props.user.email ?? "Guest"}
                            </div>
                        </div>
                        <div className="p-7 flex flex-col gap-5">
                            {props.user ? <UserOptions checkUser={props.checkUser} onClick={props.onClick} roles={props.user.roles} signOut={props.signOut}/> : <GuestOptions onClick={props.onClick}/>}
                        </div>
                    </div>
    ) : <></>
}

function GuestOptions({...props}){
    return(
        <>
            <Link href={"login"}>
                <div className="bg-black-900 rounded-md p-2 border-2 opacity-90 transition-all
                               hover:cursor-pointer hover:border-turquoise-50 hover:bg-white-900/5 hover:opacity-100
                                active:opacity-80
                                " onClick={props.onClick}>
                    Sign In
                </div>
            </Link>
            <Link href={"register"}>
                <div className="bg-black-900 rounded-md p-2 border-2 opacity-90 transition-all 
                                hover:cursor-pointer hover:border-turquoise-50 hover:bg-white-900/5 hover:opacity-100
                                active:opacity-80
                                " onClick={() => {props.onClick;}}>
                    Sign Up
                </div>
            </Link>
        </>
    )
}

function UserOptions({...props}){
    //props.checkUser()
    return(
        <>
            {
            props.roles.includes("Admin") ?
            <Link href={"admin-panel"}>
                <div className="bg-black-900 rounded-md p-2 border-2 opacity-90 transition-all
                               hover:cursor-pointer hover:border-turquoise-50 hover:bg-white-900/5 hover:opacity-100
                                active:opacity-80
                                " onClick={props.onClick}>
                    Admin Panel
                </div>
            </Link> : <></>
            }
            {/*<Link href={"login"}>*/}
                <div className="bg-black-900 rounded-md p-2 border-2 opacity-90 transition-all
                               hover:cursor-pointer hover:border-turquoise-50 hover:bg-white-900/5 hover:opacity-100
                                active:opacity-80 flex justify-between
                                " onClick={props.onClick}>
                    <div>My Profile</div> <div className="opacity-25">(inactive)</div>
                </div>
            {/*</Link>*/}
            {/*<Link href={"register"}>*/}
                <div className="bg-black-900 rounded-md p-2 border-2 opacity-90 transition-all 
                                hover:cursor-pointer hover:border-turquoise-50 hover:bg-white-900/5 hover:opacity-100
                                active:opacity-80 flex justify-between
                                " onClick={props.onClick}>
                    <div>My Orders</div> <div className="opacity-25">(inactive)</div>
                </div>
            {/*</Link>*/}
            <Link href={"/"}>
                <div className="bg-black-900 rounded-md p-2 border-2 opacity-90 transition-all 
                                hover:cursor-pointer hover:border-turquoise-50 hover:bg-white-900/5 hover:opacity-100
                                active:opacity-80
                                " onClick={() => {props.signOut()}}>
                    Sign Out
                </div>
            </Link>
        </>
    )
}


export function BasketPanel({...props}){
    let basketPanelRef = useRef()

    const [basketData, setBasketData] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [basketTotal, setBasketTotal] = useState(0.00)
    const [syncBasket, setSyncBasket] = useState(false)

    function SyncBasket(item){
        let index = basketData.orderItems.findIndex(x => x.id == item.id)
        let stagingBasket = basketData

        stagingBasket.orderItems[index] = item

        //console.log("triggered")
        //console.log(basketData)
        UpdateBasket(stagingBasket)
    }

    function UpdateBasket(data){
        setBasketData(data)
        //console.log(data)
        let total = 0
        data.orderItems.forEach(x => total += x.price * x.quantity);

        return setBasketTotal(Number(total ?? 0.00).toFixed(2))
    }

    useEffect(() => {
        setIsLoading(true)
        let mounted = true
        
        GetUserBasket().then(p => {
            if(mounted){
                UpdateBasket(p.data)
            }
        }).then(console.log(basketData)).then(setIsLoading(false));

        return () => mounted = false;
    }, [props.visible, syncBasket])

    useEffect(() => {
        setIsLoading(true)
        let mounted = true

        let handler = (event)=>{
            if (!basketPanelRef.current?.contains(event.target)){
                props.setVisible(false)
            }
            props.checkUser()
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return props.visible ? (
        <div className="bg-black-900 w-96 inline-block absolute top-16 right-16 text-lg border-white-900/25 rounded-xl max-md:hidden"
            ref={basketPanelRef}>
            <div className="flex bg-cornflower_blue-50/10 w-full justify-between p-7 rounded-xl rounded-b-none border-black-900">
            Basket
            </div>
            
            {basketData ? basketData.orderItems.map(x => //to be move to another method Map Items and then show basket items or the basket is empty string
                <BasketItem SyncBasket={SyncBasket} item={x} productName={x.productName} quantity={x.quantity} price={x.price} id={x.id} orderId={x.orderId} key={x.id}/>) 
                : "Loading..."}
            <div className="flex font-normal bg-cornflower_blue-50/10 w-full justify-between items-center px-4 py-5 rounded-xl rounded-t-none border-black-900">
                <div><span className="font-semibold">Total:</span> {basketTotal} zł</div>
                <Button textClassName="text-black-900 font-semibold" text="CHECKOUT"/>
            </div>
        </div>
    ) : <></>
}

export function BasketItem({...props}){
    const [itemQuantity, setItemQuantity] = useState(props.item.quantity)

    let item = 
    {
        "productId": props.item.productId,
        "productName": props.item.productName,
        "quantity": itemQuantity,
        "price": props.item.price,
        "orderId": props.item.orderId,
        "id": props.id
    }

    function UpdateQuantity(newValue){
        item.quantity = newValue
        setItemQuantity(newValue)
        //Create a separate method for +1/-1
        AddOrUpdateToBasket(item)
        props.SyncBasket(item)
    }
    /*
    useEffect(() => {
        let mounted = true
        
        AddOrUpdateToBasket(item)

        return () => mounted = false;
    }, [itemQuantity])
    */
    return(
        <div className="flex justify-between p-3 border-b-2 relative border-b-white-900/20 hover:bg-cornflower_blue-50/20">
                {itemQuantity == 0 && <div className="absolute top-0 left-0 w-full h-full p-3 bg-raspberry-500/80 z-10">The item will be removed from the basket</div> }
                <div className="flex flex-col w-full">
                    <div className="relative inline-block w-full whitespace-nowrap overflow-ellipsis overflow-hidden">
                        {props.productName}
                    </div>
                    <div className="font-thin text-base">
                        {props.price} zł
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-14">
                        {/*onChange PUT the order quantity using id*/}
                        <ValidatedTextBox id={props.id} value={itemQuantity} onChange={UpdateQuantity} inputStyle="text-white-900 text-center rounded-md w-10 bg-cornflower_blue-50/10" wrapperStyle="w-10"/>
                    </div>
                    <div className="flex gap-1">
                    <div className="font-thin text-base">
                        {/** Turn into a button */}
                        <div className="rounded-lg flex w-10 h-10 cursor-pointer bg-cornflower_blue-50/20 active:bg-cornflower_blue-50/20 hover:bg-cornflower_blue-50/30 active:opacity-80
                            text-3xl items-center justify-center font-semibold select-none" onClick={() => UpdateQuantity(itemQuantity + 1)}>
                            <div className="h-10">+</div>
                        </div>
                        <div></div>
                    </div>
                    <div className="font-thin text-base">
                        {/** Turn into a button */}
                        <div className="rounded-lg flex w-10 h-10 cursor-pointer bg-cornflower_blue-50/20 active:bg-cornflower_blue-50/20 hover:bg-cornflower_blue-50/30 active:opacity-80
                            text-3xl items-center justify-center font-semibold select-none" onClick={() => UpdateQuantity(itemQuantity - 1)}>
                            <div className="h-10">-</div>
                        </div>
                        <div></div>
                    </div>
                    </div>
                </div>
            </div>
    )
}


export function MobilePanel({...props}){
    return props.visible ? (
        <div className="w-full h-screen max-h-screen overflow-hidden bg-black-900 absolute flex flex-col md:hidden pt-12">
        <div className="flex flex-col relative p-10 text-3xl gap-12 font-semibold">
        <Link href={"login"}>
                            <div className="bg-black-900 rounded-md p-4 border-2  mb-4 opacity-90 transition-all text-center
                                            hover:cursor-pointer hover:border-turquoise-50 hover:opacity-100 hover:border-collapse
                                            hover:bg-gradient-to-r from-cornflower_blue-500 to-turquoise-50
                                            active:opacity-80 
                                            " onClick={props.onClick}>
                                Sign In
                            </div>
        </Link>

        <Link href={"register"}>
                            <div className="bg-black-900 rounded-md p-4 border-2 opacity-90 transition-all text-center
                                            hover:cursor-pointer hover:border-turquoise-50 hover:opacity-100 hover:border-collapse
                                            hover:bg-gradient-to-r from-cornflower_blue-500 to-turquoise-50
                                            active:opacity-80
                                            " onClick={props.onClick}>
                                Sign Up
                            </div>
        </Link>

        <div className="bg-black-900 rounded-md p-4 border-2 opacity-90 transition-all text-center
                                            hover:cursor-pointer hover:border-turquoise-50 hover:opacity-100 hover:border-collapse
                                            hover:bg-gradient-to-r from-cornflower_blue-500 to-turquoise-50
                                            active:opacity-80
                                            " onClick={props.onClick}>
                                Cart
        </div>

        </div>
        </div>
    ) : <></>
}

export function SvgComponent({...props})
{
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        id="_x32_"
        width={200}
        height={200}
        fill={props.color ?? "white"}
        viewBox="0 0 512 512"
        {...props}
        >
        <g id="SVGRepo_iconCarrier">
            <style>{`.st0{fill:${props.color ?? "white"}}`}</style>
            <path
            d="M355.256 107.302c-3.288-4.589-8.799-11.583-15.341-19.682-6.558-8.115-14.187-17.408-21.948-26.948-9.639-11.88-19.419-24.042-27.724-35.032a2441.368 2441.368 0 0 0 7.283 21.957c6.384 19.006 12.597 37.066 15.761 47.743 12.086 40.848 19.287 95.817 19.311 156.553-.024 60.727-7.225 115.688-19.304 156.536-4.07 13.734-8.732 25.787-14.005 36.16 3.617-1.656 7.209-3.402 10.718-5.47 16.79-9.895 32.188-24.412 45.247-42.652 26.15-36.432 42.784-87.701 42.758-144.573.028-56.883-16.598-108.144-42.756-144.592zM201.982 439.116c3.526 2.076 7.143 3.839 10.784 5.512-5.297-10.397-9.968-22.426-14.064-36.193-12.086-40.855-19.286-95.816-19.311-156.543.024-60.736 7.225-115.705 19.303-156.553 3.171-10.677 9.384-28.736 15.769-47.743 2.472-7.342 4.96-14.805 7.283-21.973-4.952 6.558-10.422 13.528-16.107 20.646-11.484 14.368-23.727 29.173-33.564 41.35-6.542 8.099-12.053 15.094-15.341 19.682-26.158 36.448-42.784 87.71-42.758 144.59-.025 56.872 16.6 108.141 42.758 144.581 13.06 18.233 28.458 32.75 45.248 42.644z"
            className="st0"
            />
            <path
            d="M88.668 251.892c.024-62.302 18.034-118.935 47.85-160.59 3.955-5.512 9.598-12.646 16.264-20.902 5.734-7.11 12.243-15.044 18.85-23.167l-1.277 1.038c-17.82 14.344-36.852 29.14-52.168 41.334-10.192 8.116-18.792 15.135-23.992 19.806-41.12 36.975-65.976 87.198-65.992 142.481.016 55.265 24.872 105.504 65.992 142.464 17.104 15.365 37.049 28.3 59.048 38.211-5.874-6.27-11.543-12.86-16.726-20.086-29.823-41.656-47.825-98.297-47.849-160.589zM270.702 442.832c6.386-9.062 12.943-23.712 18.43-42.314 11.064-37.256 18.183-90.19 18.158-148.626.026-58.446-7.093-111.372-18.166-148.644-2.81-9.507-9.062-27.764-15.464-46.796-6.418-19.106-13.001-39.044-16.823-53.289-.288-1.07-.56-2.109-.84-3.164-.288 1.054-.552 2.076-.841 3.156-3.822 14.253-10.405 34.19-16.823 53.296-6.402 19.031-12.655 37.288-15.473 46.804-11.064 37.264-18.183 90.189-18.158 148.635-.025 58.436 7.093 111.37 18.166 148.626 4.119 13.956 8.807 25.688 13.619 34.504 4.786 8.84 9.787 14.607 13.569 17.153 2.554 1.73 4.317 2.175 5.94 2.2 1.622-.024 3.386-.469 5.94-2.2 2.512-1.72 5.594-4.801 8.766-9.341zM417.796 109.411c-7.588-6.822-22.434-18.645-39.134-31.851-12.498-9.886-26.092-20.63-38.87-31.011 6.813 8.371 13.511 16.544 19.418 23.852 6.666 8.255 12.309 15.39 16.264 20.902 29.815 41.655 47.826 98.288 47.85 160.59-.024 62.293-18.035 118.934-47.85 160.588-5.182 7.226-10.851 13.816-16.725 20.086 21.998-9.911 41.944-22.846 59.055-38.211 41.12-36.959 65.976-87.198 65.992-142.464-.016-55.283-24.872-105.506-66-142.481zM222.596 453.139c-2.62-3.856-7.868-4.853-11.724-2.233l-42.586 28.968c-3.856 2.62-4.852 7.868-2.233 11.724 2.62 3.847 7.868 4.853 11.724 2.232l42.586-28.968c3.848-2.62 4.853-7.876 2.233-11.723zM243.234 456.664c-4.417-1.482-9.204.898-10.686 5.314l-13.059 38.896c-1.483 4.416.898 9.202 5.314 10.686a8.443 8.443 0 0 0 10.686-5.314l13.058-38.896c1.484-4.416-.897-9.202-5.313-10.686zM301.119 450.906c-3.855-2.62-9.104-1.623-11.724 2.233-2.62 3.847-1.622 9.104 2.233 11.723l42.586 28.968c3.856 2.62 9.104 1.615 11.724-2.232 2.62-3.856 1.623-9.104-2.233-11.724l-42.586-28.968zM279.444 461.978a8.443 8.443 0 0 0-10.686-5.314 8.443 8.443 0 0 0-5.314 10.686l13.058 38.896a8.443 8.443 0 0 0 10.686 5.314 8.441 8.441 0 0 0 5.314-10.686l-13.058-38.896z"
            className="st0"
            />
        </g>
        </svg>
    )
}

export function ShoppingCartSVG({...props})
{
    return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    fill={props.color ?? "white"}
    viewBox="0 0 902.86 902.86"
    {...props}
    >
    <path d="M671.504 577.829 781.989 145.22H902.86v-68H729.174L703.128 179.2 0 178.697l74.753 399.129h596.751v.003zm14.262-330.641-67.077 262.64h-487.49L81.928 246.756l603.838.432zM578.418 825.641c59.961 0 108.743-48.783 108.743-108.744s-48.782-108.742-108.743-108.742H168.717c-59.961 0-108.744 48.781-108.744 108.742s48.782 108.744 108.744 108.744S277.46 776.858 277.46 716.897c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107 12.59-7.928 26.342-7.928 40.742.001 59.961 48.783 108.744 108.744 108.744zM209.46 716.897c0 22.467-18.277 40.744-40.743 40.744s-40.744-18.277-40.744-40.744c0-22.465 18.277-40.742 40.744-40.742 22.466 0 40.743 18.277 40.743 40.742zm409.702 0c0 22.467-18.277 40.744-40.743 40.744s-40.743-18.277-40.743-40.744c0-22.465 18.277-40.742 40.743-40.742s40.743 18.277 40.743 40.742z" />
  </svg>
    )
}