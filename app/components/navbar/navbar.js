import Link from "next/link";
import Image from "next/image";
import onion from "../../media/logo/onion.svg"
import { Button, ButtonMain, SvgComponent } from "./navbar.elements";

export default function NavBar(){
    return(
        <nav className="sticky top-0 z-50 h-14 max-w-7xl m-auto bg-black-900">
            <div className="px-6 h-14 flex justify-between font-mono text-2xl font-semibold">
                <div className="flex">
                    <SvgComponent className="h-9 my-auto w-8"/>
                    <Link className="mt-3 ml-1 text-3xl hover:transition-all hover:text-turquoise-50" href={'/'}>HardwareOnion</Link>
                </div>
                <div className="h-10 my-auto font-normal">
                    
                    <Button label="Products"/>
                    <Button label="Deals"/>
                    <ButtonMain url="/xd" label="Cart"/>
                </div>
                
                {
                //<Link className="mt-3 mr-1" href={'/'}>Products</Link>
                }
            </div>
            
        </nav>
    )
}

//<Image className="fill-white h-9 my-auto text-cyan-500"  src={onion} width={40} height={30} alt="Onion Logo"/>