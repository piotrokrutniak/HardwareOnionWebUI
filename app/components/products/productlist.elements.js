"use client";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css'

async function GetProducts(){
    let response = await fetch('https://localhost:9001/api/v1/product/3',
                        {
                            method: "GET",
                            mode: 'cors',
                            headers:{
                                'Sec-Fetch-Site': 'cross-site',
                                'Access-Control-Allow-Origin': 'http://localhost:9001/',
                                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT',
                            },
                        }
    )

    let body = await response.json()          

    //console.log(body.data)
    return await body
}

export function FilterSection({...props}){

    let style = props.className ?? 'max-w-full h-full'; 

    return(
        <div className={`flex ${style}`}>

            <div className="h-full top-0 w-64 p-5 pt-20 flex-shrink-0 border-r-2 max-md:absolute max-md:right-full">
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
            <div className="h-full w-full p-5 bg-cornflower_blue-900 ">
                <SortSection/>
                <div className="flex mb-8 space-x-3 md:space-x-0">
                <Button className="md:hidden min-w-fit h-14" text="FILTERS" color="bg-cornflower_blue-400" icon={<FilterIcon color="white" fill="none" className="w-5 h-5 inline ml-1 relative"/>}/>
                <SearchButton text="BROWSE" className={"h-14"} icon={<SearchIcon color="white" className="w-5 h-5 inline ml-1 relative"/>} color="bg-cornflower_blue-400"/>
                </div>

                <Products/>
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
        <button className={`h-10 block my-auto p-1 px-3 bg-opacity-80 rounded-md mt-8 ${props.color} ${props.className} hover:transition-all hover:bg-opacity-100
                            max-md:w-1/5 
                            `}> 
            {props.text}{props.icon}
        </button>
    )
}

export function SortSection({...props}){
    return(
        //<div className="flex max-w-full items-start space-x-10 border-b-2 border-indigo-50 border-solid">
        <div className="grid grid-rows-2 grid-flow-col gap-x-5 columns-3 border-b-2 border-indigo-50 border-solid
                        max-lg:grid-rows-2 max-lg:grid-cols-2
                        max-md:grid-rows-3 max-md:grid-cols-1
                        ">
            
            <SortDropdown className="grid" label="Sort by"/>
            <PriceFilter className="grid" min={0} max={2137}/>
            <TextBox className="grid max-w-fit w-full
                                max-md:col-start-1 max-md:col-end-2
                                " label="Search" placeHolder="Type something..."/>
            
            
        </div>
    )
}

export function SortDropdown({...props}){
    return(
        <div className="h-20 sticky max-md:col-span-2">
            <label className="block mb-3" for="sort">{props.label}</label>
            <select className="p-2 w-full h-10" id="sort" name="Sort by">
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

export function TextBox({...props}){
    return(
        <div className="w-full max-md:col-span-2 max-w-full h-20">
        <label className="block mb-3 " for="sort">{props.label}</label>
        <input className="p-2 h-10 w-full" type="text" placeholder={props.placeHolder}/>
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
    const [priceRange, setPriceRange] = useState([props.min, props.max])
    return(
        <div className="mb-2 w-full grid col-span-2">
        <div className="flex justify-between">
        <label className="block mb-1" for="sort">From</label>
        <label className="block mb-1" for="sort">To</label>
        </div>
        <div className="flex justify-between">
        <label className="block mb-1" for="sort">{priceRange[0]} zł</label>
        <label className="block mb-1" for="sort">{priceRange[1]} zł</label>
        </div>
        

        <div  className="relative h-10 w-full mt-1 px-2"> 
        <Slider className="relative w-full"
                min = {props.min}
                max = {props.max}
                defaultValue = {[props.min, props.max]}
                onChange = {(value) =>  setPriceRange(value)}
                step= {10}
                count={1}
                pushable={true}
                range/>
        </div>
        </div>
    )
}

export function SearchButton({...props}){
    return(
        <button className={`w-full text-lg h-14 col-span-2 bg-opacity-80 rounded-md mt-8 ${props.color} hover:transition-all hover:bg-opacity-100
                            max-md:w-4/5
                            `}>
            {props.text}{props.icon}
        </button>
    )
}

export function Products({...props}){
    const [productSet, setProductSet] = useState([])
    
    useEffect(() => {
        let mounted = true
        GetProducts().then(product => {
            if(mounted){
                setProductSet(product.data)
            }
        })
        return () => mounted = false;
    }, [])
    
    console.log(productSet)
    return(
        <div className="bg-cornflower_blue-50 w-full h-full bg-opacity-10 p-5 max-xs:p-y max-xs:py-5">
            <div className="grid grid-flow-row gap-5 auto-cols-min-54 grid-cols-3 
                            max-xl:grid-cols-2 
                            max-xs:grid-cols-1 
                            ">
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
                <Product productData={...productSet}/>
            </div>
        </div>
    )
}

export function Product({...props}){

    let product = props.productData

    return(
            <div className="bg-black-900 opacity-95 min-w-54 h-80">
                <div className="w-full bg-black-900 bg-opacity-20 h-48">

                </div>
                <div className="h-28">
                    <div className="flex justify-between ">
                    <div className="h-8 p-2">{product.name}</div>
                    <div className="p-2">* * * * * </div>
                    </div>
                    
                    <div className="w-full h-6 bg-opacity-95 bg-black-900  p-2 pt-0 pb-1 text-sm">{product.description}</div>
                    <div className="w-full h-12 p-2 pb-0 flex justify-between">
                        <div className="text-2xl max-lg:text-xl mb-auto mt-auto">{product.price ?? 0}.00 zł</div>
                        <Button className='w-28 max-md:w-28 max-md:text-sm mb-auto mt-auto relative' text="Add to cart" color="bg-cornflower_blue-400"/>
                    </div>
                </div>
            </div>
    )
}

export function ProductsGrid({...props}){

}


const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="_x32_"
    width={800}
    height={800}
    viewBox="0 0 512 512"
    {...props}
  >
    <style>{`.st0{fill:${props.color}}`}</style>
    <path
      d="M172.625 102.4c-42.674 0-77.392 34.739-77.392 77.438 0 5.932 4.806 10.74 10.733 10.74 5.928 0 10.733-4.808 10.733-10.74 0-30.856 25.088-55.959 55.926-55.959 5.928 0 10.733-4.808 10.733-10.74 0-5.931-4.805-10.739-10.733-10.739z"
      className="st0"
    />
    <path
      d="M361.657 301.511c19.402-30.436 30.645-66.546 30.645-105.244C392.302 88.036 304.318 0 196.151 0c-38.676 0-74.765 11.25-105.182 30.663a197.588 197.588 0 0 0-60.31 60.345C11.257 121.444 0 157.568 0 196.267c0 108.217 87.998 196.266 196.151 196.266 38.676 0 74.779-11.264 105.197-30.677a197.596 197.596 0 0 0 60.309-60.345zm-101.899 18.731c-19.075 9.842-40.708 15.403-63.607 15.403-76.797 0-139.296-62.535-139.296-139.378 0-22.912 5.558-44.558 15.394-63.644 13.318-25.856 34.483-47.019 60.323-60.331 19.075-9.842 40.694-15.403 63.578-15.403 76.812 0 139.296 62.521 139.296 139.378 0 22.898-5.558 44.53-15.394 63.616-13.303 25.856-34.454 47.033-60.294 60.359zM499.516 439.154 386.275 326.13c-16.119 23.552-36.771 44.202-60.309 60.345l113.241 113.024c8.329 8.334 19.246 12.501 30.148 12.501 10.916 0 21.833-4.167 30.162-12.501 16.644-16.669 16.644-43.677-.001-60.345z"
      className="st0"
    />
  </svg>
)

const FilterIcon  = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={800}
      height={800}
      fill={props.fill}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke={`${props.color}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 5.6c0-.56 0-.84-.11-1.054a.998.998 0 0 0-.436-.437C19.24 4 18.96 4 18.4 4H5.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C4 4.76 4 5.04 4 5.6v.737c0 .245 0 .367.028.482a1 1 0 0 0 .12.29c.061.1.148.187.32.36l5.063 5.062c.173.173.26.26.321.36.055.09.096.188.12.29.028.114.028.235.028.474v4.756c0 .857 0 1.286.18 1.544a1 1 0 0 0 .674.416c.311.046.695-.145 1.461-.529l.8-.4c.322-.16.482-.24.599-.36a1 1 0 0 0 .231-.374c.055-.158.055-.338.055-.697v-4.348c0-.245 0-.367.028-.482a.998.998 0 0 1 .12-.29c.06-.1.147-.186.317-.356l.004-.004 5.063-5.062c.172-.173.258-.26.32-.36.055-.09.096-.188.12-.29.028-.113.028-.235.028-.474V5.6Z"
      />
    </svg>
  )
  