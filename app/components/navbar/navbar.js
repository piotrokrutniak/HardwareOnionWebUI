"use client";

import Link from "next/link";
import Image from "next/image";
import onion from "../../media/logo/onion.svg"
import { BasketPanel, NavbarButton, ButtonMain, MobilePanel, SvgComponent, UserPanel, UserShortcut } from "./navbar.elements";
import { ExitIcon, HamburgerIcon } from "../icons";
import { useEffect, useRef, useState } from "react";
import { ClearUser, GetUser } from "@/app/(global methods)/User";

export default function NavBar(){
    const [visible, setUserPanelVisible] = useState(false)
    const [mobileVisible, setMobileVisible] = useState(false)
    const [basketVisible, setBasketVisible] = useState(false)

    const [user, setUser] = useState(GetUser())
    
    function SignOut(){
        ClearUser()
        return setUser(false)
    }

    function CheckUser(){
        setUser(GetUser())
    }

    function ToggleUserPanel(){
        setBasketVisible(false)
        return setUserPanelVisible(!visible)
    }

    function ToggleMobile(){
        return setMobileVisible(!mobileVisible)
    }

    function ToggleBasket(){
        setUserPanelVisible(false)
        return setBasketVisible(!basketVisible)
    }


    function HandleRedirection(){
        return setUserPanelVisible(false), setMobileVisible(false), setBasketVisible(false)
    }
    return(
        <nav className="sticky top-0 z-50 h-14 max-w-qhd m-auto bg-black-900">
            <div className="px-6 h-14 flex justify-between font-mono text-2xl flex-column font-semibold relative">
                <div className="flex">
                    <SvgComponent className="h-9 my-auto w-8"/>
                    <Link className="mt-3 ml-1 text-3xl hover:transition-all hover:text-turquoise-50 active:opacity-80" href={'/'}>
                        HardwareOnion
                    </Link>
                </div>
                <div className="h-10 my-auto font-normal max-md:hidden flex">
                    <NavbarButton label="Products"/>
                    <NavbarButton label="Deals"/>
                    <ButtonMain url="/" onClick={ToggleBasket} displayBasket={basketVisible} label=""/>
                    <UserShortcut className="ml-4 active:opacity-80" onClick={ToggleUserPanel}/>
                </div>
                <div className="h-10 w-10 md:hidden hover:cursor-pointer active:opacity-80 transition-all" onClick={ToggleMobile}>

                    {mobileVisible ? 
                    <ExitIcon className="w-14 h-14 mb-auto mt-auto cursor-pointer" fill="white"/> :
                    <HamburgerIcon className="w-14 h-14 mb-auto mt-auto cursor-pointer"/>
                    }
                </div>
                <UserPanel user={user ?? undefined} visible={visible} checkUser={CheckUser} onClick={HandleRedirection} signOut={SignOut} setVisible={setUserPanelVisible}/>
                <BasketPanel visible={basketVisible} onClick={HandleRedirection} checkUser={CheckUser} setVisible={setBasketVisible}/>
                
            </div>
                <MobilePanel visible={mobileVisible} onClick={HandleRedirection}/>
        </nav>
    )
}