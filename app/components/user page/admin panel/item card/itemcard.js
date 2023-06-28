"use client";

import Button from "@/app/components/ui components/button";
import { useRouter } from "next/navigation";

export default function ItemCard({...props}){
    const router = useRouter()

    let createdDate = new Date(Date.parse(props.createdDate)).toLocaleDateString() ?? "No Data" 
    let updatedDate = new Date(Date.parse(props.updatedDate)).toLocaleDateString() ?? "No Data" 
    return(
        <div className="p-6 bg-black-900/50 w-full rounded-2xl max-xs:rounded-none shadow-md shadow-black-900/25">
            <div className="flex w-full justify-between">
                <div className="font-semibold text-2xl max-xs:text-lg"> {props.title ?? "Title"} </div>
                <div className="max-xs:text-base">Updated: {updatedDate ?? "No Data"} </div>
            </div>
            <div className="flex w-full justify-between mb-8">
                <div className="text-lg max-xs:text-base"> {props.subTitle ?? ""} </div>
                <div>Created: {createdDate ?? "No Data"} </div>
            </div>
            <div className="flex w-full justify-between align-bottom
                            max-xs:flex-col max-xs:gap-5">
                <div className="flex gap-2 relative">
                    <Button text="GPU" className="rounded-xl mb-0" textClassName="max-xs:text-sm" color="bg-white-900/20"/>
                    <Button text="2019" className="rounded-xl mb-0" textClassName="max-xs:text-sm" color="bg-white-900/20"/>
                    <Button text="8+" className="rounded-xl mb-0" textClassName="max-xs:text-sm" color="bg-white-900/10"/>
                </div>
                <div className="flex gap-2">
                    <Button text="Update" id={props.data.id ?? 0} onClick={() => router.push(`admin-panel/products/update/${props.data.id}`)} textClassName="uppercase font-semibold" className="py-3 px-5 max-xs:w-2/3 max-xs:px-2" height="h-14" color="bg-cornflower_blue-300"/>
                    <Button text="Delete" id={props.data.id ?? 0} onClick={() => props.setPopupActive(true)} textClassName="uppercase font-semibold" className="py-3 px-5 max-xs:w-1/3 max-xs:px-2" height="h-14" color="bg-raspberry-600"/>
                </div>
            </div>
        </div>
    )
}
//<Button text="Delete" textClassName="uppercase font-semibold" className="py-3 px-5" height="h-14" color="bg-black-900"/>