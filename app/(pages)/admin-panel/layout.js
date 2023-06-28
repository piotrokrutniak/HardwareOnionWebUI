"use client";

import { GetUser } from "@/app/(global methods)/User";
import { Warning } from "@/app/components/illustrations";
import Button from "@/app/components/ui components/button";
import Link from "next/link";

export default function AdminLayout({ children }) {
    const user = GetUser() ?? {"roles": [null]}

    function IsAdmin(user){
        if(!user.roles){
            return false
        }
        return user.roles.includes("Admin")
    }

    return  IsAdmin(user) ? (
        <>
          {children}
        </>
    ) : <NotAuthorized/>
  }
  
function NotAuthorized(){
    return(
        <div className="flex flex-col w-fit mx-auto p-10 mt-16">
            <div className="flex font-semibold text-4xl pb-5">
                You're not authorized to view this page.
            </div>
            <div className="flex text-2xl mb-5">
                Please sign in first.
            </div>
            <div>
            <Link href={"/"}>
                <Button className="text-2xl font-semibold h-16 px-8  text-black-900" text="Go Back"/>
            </Link>
            </div>
            <Warning className="w-auto max-w-full flex mt-20"/>
        </div>
    )
}