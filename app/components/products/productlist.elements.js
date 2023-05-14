"use client";
 import { useState } from "react";

export function FilterSection({...props}){

    let style = props.className ?? 'max-w-full h-full';

    return(
        <div className={`flex ${style}`}>
            <div className="h-full top-0 w-64 p-5 pt-20  flex-shrink-0 border-r-2">
                <MajorTitleSpan text="Filters"/>

                <TitleSpan text="Manufacturers"/>
                <ListMember text="AMD"/>
                <ListMember text="Nvidia"/>
                <ListMember text="Intel"/>

                <TitleSpan text="Series"/>
                <ListMember text="4000s"/>
                <ListMember text="3000s"/>
                <ListMember text="2000s"/>

                <TitleSpan text="GDDR"/>
                <ListMember text="32 GB"/>
                <ListMember text="16 GB"/>
                <ListMember text="8 GB"/>
                <ListMember text="4 GB"/>

                <TitleSpan text="Shipping"/>
                <ListMember text="Inpost"/>
                <ListMember text="DHL"/>
                <ListMember text="UPS"/>
                <ListMember text="Poczta Polska"/>

                <Button text="Apply" color="bg-cornflower_blue-400"/>

            </div>
            <div className="h-full w-full p-5 bg-cornflower_blue-900">
                <SortSection/>
            </div>

            
        </div>
    )
}

export function MajorTitleSpan({...props}){
    return(
        <span className="text-3xl block mb-4">{props.text}</span>
    )
}

export function TitleSpan({...props}){
    return(
        <span className="text-xl block font-semibold mt-5 mb-1">{props.text}</span>
    )
}

export function ListMember({...props}){
    return(
        <div className="block mb-2">
            <input type="checkbox"/> <span className="text-base font-base">{props.text}</span>
        </div>
        
    )
}

export function Button({...props}){
    return(
        <button className={`h-10 block sticky my-auto p-1 px-3 bg-opacity-80 ${props.color} hover:transition-all mt-8 rounded-md hover:bg-opacity-100`}> 
            {props.text}
        </button>
    )
}

export function SortSection({...props}){
    return(
        <div>
            <div>
                <PriceFilter min="0" max="100"/>
            </div>
            <div className="w-full h-32 border-b-2 sticky">
                <SortDropdown/>
            </div>
        </div>
    )
}

export function SortDropdown({...props}){
    return(
        <div>
            <label className="block mb-1" for="sort">Sort by</label>
            <select className="p-2 w-48 h-10" id="sort" name="Sort by" label="xd">
            <DropdownOption text="Price: descending"/>
            <DropdownOption text="Price: ascending"/>
            <DropdownOption text="Newest: descending"/>
            <DropdownOption text="Newest: ascending"/>
            <DropdownOption text="Popular: descending"/>
            <DropdownOption text="Popular: ascending"/>
            </select>
        </div>
    )
}

export function DropdownOption({...props}){
    return(
        <option className="font-sans">
            {props.text}
        </option>
    )
}

export function PriceFilter({...props}){
    const [sliderLeft, setSliderLeft] = useState("25");
    const [sliderRight, setSliderRight] = useState("75");

    return(
        <>
        <label className="block mb-1" for="sort">From</label>
        <input type="range" min={props.min} max={sliderRight} value={sliderLeft} className="absolute"></input>
        <input type="range" min={sliderLeft} max={props.max} value={sliderRight} className="relative"></input>
        <label className="block mb-1" for="sort">To</label>
        </>
    )
}