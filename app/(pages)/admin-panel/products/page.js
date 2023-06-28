"use client";
import { GetBaseUrl } from "@/app.config";
import { PlusIcon, TrashIcon } from "@/app/components/icons";
import { SortSection } from "@/app/components/products/productlist.elements";
import Button from "@/app/components/ui components/button";
import { DeleteConfirmation } from "@/app/components/ui components/popups/fullscreenpopup";
import { ItemCards } from "@/app/components/user page/admin panel/adminpanel.elements";
import ItemCard from "@/app/components/user page/admin panel/item card/itemcard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminProducts(){
    const [dropdownValue, setDropdownValue] = useState("NewestDesc")
    const [productSet, setProductSet] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1);
    const [popupActive, setPopupActive] = useState(false)
    const router = useRouter()

    function UpdateProductSet(set){
        setProductSet(set)
    }

    function UpdateMaxPage(page){
        setMaxPage(page)
    }

    function UpdateOrderByProperty(orderBy){
        setDropdownValue(orderBy)
    }

    function ChangePage(page){
        let validated = page > maxPage ? maxPage : page;
        validated = validated <= 0 ? 1 : validated;

        setCurrentPage(validated)
    }

    return(
        <div className="p-10 w-full bg-cornflower_blue-100/20 grid grid-cols-1 gap-5 max-w-screen-2xl mx-auto
                        lg:grid-cols-2
                        2xl:grid-cols-3
                        xl:px-16
                        max-md:p-4
                        ">
            
            <div className="h-full w-full lg:col-span-2 2xl:col-span-3 m-auto mb-8">
                <SortSection dropdownValue={dropdownValue} setDropdownValue={UpdateOrderByProperty}/>
                <div className="flex mb-8 space-x-3 850:space-x-0">
                </div>
                <Button text="ADD NEW" icon={<PlusIcon className="w-7 h-7 relative my-auto"/>} onClick={() => router.push(`admin-panel/products/add`)}
                    textClassName="uppercase text-lg font-semibold flex gap-2 my-auto" 
                    className="py-3 px-5 w-full max-xs:px-2 justify-center flex" height="h-14" color="bg-cornflower_blue-400"/>
                
            </div>
            <ItemCards setPopupActive={setPopupActive} popupActive={popupActive} 
                setProductSet={UpdateProductSet} productSet={...productSet} 
                currentPage={currentPage} setMaxPage={UpdateMaxPage} 
                setCurrentPage={ChangePage} maxPage={maxPage} 
                orderBy={dropdownValue}/>

            <DeleteConfirmation popupActive={popupActive} setPopupActive={setPopupActive} />
        </div>
    )
}

