"use client";

import Link from "next/link";
import Image from "next/image";
import onion from "../../media/logo/onion.svg"
import { Button, ButtonMain, MobilePanel, SvgComponent, UserPanel, UserShortcut } from "./navbar.elements";
import { ExitIcon, HamburgerIcon } from "../icons";
import { useState } from "react";

export default function NavBar(){
    const [visible, setVisible] = useState(false)

    function Toggle(){
        console.log(visible); 
        return setVisible(!visible)
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
                    <Button label="Products"/>
                    <Button label="Deals"/>
                    <ButtonMain url="/" label=""/>
                    <UserShortcut className="ml-4 active:opacity-80" onClick={Toggle}/>
                    
                </div>
                <div className="h-10 w-10 md:hidden hover:cursor-pointer active:opacity-80 transition-all" onClick={Toggle}>

                    {visible ? 
                    <ExitIcon className="w-14 h-14 mb-auto mt-auto" fill="white"/> :
                    <HamburgerIcon className="w-14 h-14 mb-auto mt-auto"/>
                    }
                </div>
                <UserPanel visible={visible} onClick={Toggle}/>
                
            </div>
                <MobilePanel visible={visible} onClick={Toggle}/>
        </nav>
    )
}

//<Image className="fill-white h-9 my-auto text-cyan-500"  src={onion} width={40} height={30} alt="Onion Logo"/>