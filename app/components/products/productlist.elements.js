"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css'
import Button from "../ui components/button";
import Spinner from "../ui components/spinner";
import { ArrowRightIcon, ArrowLeftIcon, ArrowDoubleLeftIcon, ArrowDoubleRightIcon } from "../icons";
import { GetApiEndpoint, GetBaseUrl } from "@/app.config";
import { ClearUser } from "@/app/(global methods)/User";
import { AddOrUpdateToBasket } from "@/app/(global methods)/Basket";


async function GetProducts(pageNumber = 1 , pageSize = 12, orderBy = "PriceAsc" ){
    const apiEndpoint = GetApiEndpoint()
    console.log(apiEndpoint)
    let response = await fetch(`${apiEndpoint}api/v1/Product?PageNumber=${pageNumber}&PageSize=${pageSize}&OrderBy=${orderBy}`,
                        {
                            method: "GET",
                            mode: 'cors',
                            headers:{
                                'Sec-Fetch-Site': 'cross-site',
                                'Access-Control-Allow-Origin': apiEndpoint,
                                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                            },
                        }
    )

    let body = await response.json()          
    return await body
}

export function FilterSection({...props}){

    let style = props.className ?? 'max-w-full h-full'; 
    const [dropdownValue, setDropdownValue] = useState("NewestDesc")

    const [productSet, setProductSet] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    const [maxPage, setMaxPage] = useState(1);

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
        <div className={`flex ${style}`}>

            <div className="h-full top-0 w-64 p-5 mt-20 flex-shrink-0 border-r-2 
                max-850:absolute max-850:right-full max-850:mt-0 
                ">
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
            <div className="h-full w-full p-5 bg-cornflower_blue-100/25">
                <SortSection dropdownValue={dropdownValue} setDropdownValue={UpdateOrderByProperty}/>
                <div className="flex mb-8 space-x-3 850:space-x-0">
                <Button className="850:hidden min-w-fit h-14 max-md:w-1/5 text-lg mt-8" text="FILTERS" color="bg-cornflower_blue-400" icon={<FilterIcon color="white" fill="none" className="w-5 h-5 inline ml-1 relative"/>}/>
                <Button text="BROWSE" onClick={() => ClearUser()} icon={<SearchIcon color="white" className="w-7 h-7 relative my-auto"/>} 
                    textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                    className="py-3 px-5 w-full max-xs:w-2/3 max-xs:px-2 justify-center flex mt-8" height="h-14" color="bg-cornflower_blue-400"/>
                </div>

                <Products setProductSet={UpdateProductSet} productSet={...productSet} currentPage={currentPage} setMaxPage={UpdateMaxPage} setCurrentPage={ChangePage} maxPage={maxPage} orderBy={dropdownValue}/>
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

export function SortSection({...props}){
    const [priceRange, setPriceRange] = useState([0, 10000])
    return(
        <div className="grid grid-rows-2 grid-flow-col gap-x-5 columns-3 border-b-2 border-indigo-50 border-solid
                        max-lg:grid-rows-2 max-lg:grid-cols-2
                        max-md:grid-rows-3 max-md:grid-cols-1
                        ">
            
            <SortDropdown className="grid text-black-900" label="Sort by" setDropdownValue={props.setDropdownValue} dropdownValue={props.dropdownValue}/>
            <PriceFilter priceRange={priceRange} min={0} max={10000} setPriceRange={setPriceRange} className="grid"/>
            <TextBox className="grid max-w-fit w-full
                                max-md:col-start-1 max-md:col-end-2
                                " label="Search" placeHolder="Type something..."/>
        </div>
    )
}

export function SortDropdown({...props}){
    return(
        <div className="h-20 sticky max-md:col-span-2">
            <label className="block mb-3" htmlFor="sort">{props.label}</label>
            <select className="p-2 w-full h-10 text-black-900" id="sort" name="Sort by" 
                    value={props.dropdownValue} 
                    onChange={(e)=>{props.setDropdownValue(e.target.value)}}>
            <DropdownOption text="Date: from newest" value="DateDesc"/>
            <DropdownOption text="Date: from oldest" value="DateAsc"/>
            <DropdownOption text="Price: descending" value="PriceDesc" />
            <DropdownOption text="Price: ascending" value="PriceAsc"/>
            <DropdownOption text="Popular: descending" value="PopularDesc"/>
            <DropdownOption text="Popular: ascending" value="PopularAsc"/>
            </select>
        </div>
    )
}

export function TextBox({...props}){
    return(
        <div className="w-full max-md:col-span-2 max-w-full h-20">
        <label className="block mb-3 " htmlFor="sort">{props.label}</label>
        <input className="p-2 h-10 w-full" type="text" placeholder={props.placeHolder}/>
        </div>
    )
}

export function DropdownOption({...props}){
    return(
        <option className="font-sans" value={props.value}>
            {props.text}
        </option>
    )
}


export function PriceFilter({...props}){
    
    return(
        <div className="mb-2 w-full grid col-span-2">
        <div className="flex justify-between">
        <label className="block mb-1" htmlFor="sort">From</label>
        <label className="block mb-1" htmlFor="sort">To</label>
        </div>
        <div className="flex justify-between">
        <label className="block mb-1" htmlFor="sort">{props.priceRange[0]} zł</label>
        <label className="block mb-1" htmlFor="sort">{props.priceRange[1]} zł</label>
        </div>
        

        <div  className="relative h-10 w-full mt-1 px-2"> 
        <Slider className="relative w-full"
                min = {props.min}
                max = {props.max}
                value = {[props.priceRange[0], props.priceRange[1]]}
                onChange = {(value) =>  props.setPriceRange(value)}
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
                            active:opacity-80
                            max-md:w-4/5
                            `}>
            {props.text}{props.icon}
        </button>
    )
}

export function Products({...props}){
    
    const [isLoading, setIsLoading] = useState(true)

    const baseUrl = GetBaseUrl()

    //pageNumber = 1 , pageSize = 12, orderBy = "PriceAsc"
    useEffect(() => {
        setIsLoading(true)
        let mounted = true

        GetProducts(props.currentPage, 12, props.orderBy).then(product => {
            if(mounted){
                let newData = [...product.data]
                props.setMaxPage(product.lastPage)
                props.setProductSet(newData)
            }
        }).then(setIsLoading(false));
        return () => mounted = false;
    }, [props.orderBy, props.currentPage])
    
    return(
        <div className="w-full h-full bg-opacity-10 p-5
                        max-850:p-0">
            <div className="grid grid-flow-row gap-5 auto-cols-min-54 grid-cols-3 
                            max-xl:grid-cols-2 
                            max-xs:grid-cols-1 
                            ">
                
                {!isLoading && props.productSet.map((product) => <Product productData={...product} key={product.id} baseUrl={baseUrl} orderBy={props.orderBy}/> )}
                
            </div>

            {isLoading && <div className="m-auto w-fit p-10"> <Spinner className="mx-auto relative w-full"/> </div>}

            <div className="h-16 max-w-xl ml-auto mr-auto relative mt-5
                            flex justify-between
                            bg-cornflower_blue-50 bg-opacity-10">

                <div className="flex m-auto">
                <div className="w-12 h-12 ml-1 my-auto bg-black-900">
                        <ArrowDoubleLeftIcon className="w-12 h-12 p-2 active:opacity-70 active:scale-90 transition-all" onClick={() => props.setCurrentPage(1)}/>
                    </div>
                    <div className="w-12 h-12 ml-1 my-auto bg-black-900 cursor-pointer" onClick={() => props.setCurrentPage(props.currentPage -1)}>
                        <ArrowLeftIcon className="w-10 h-12 p-2 active:opacity-70 m-auto mt-auto mb-auto active:scale-90 transition-all"/>
                    </div>
                    <input
                            className="w-12 h-12 mx-1 my-auto text-center bg-black-900"
                            value={props.currentPage} 
                            onChange={(e)=>{props.setCurrentPage(e.target.value)}}
                            />
                    <div className="w-12 h-12 mr-1 my-auto bg-black-900 cursor-pointer " onClick={() => props.setCurrentPage(props.currentPage +1)}>
                        <ArrowRightIcon className="w-10 h-12 m-auto p-2 active:opacity-70 active:scale-90 transition-al"/>
                    </div>
                    <div className="w-12 h-12 mr-1 my-auto bg-black-900">
                        <ArrowDoubleRightIcon className="w-12 h-12 p-2 active:opacity-70 active:scale-90 transition-all" onClick={() => props.setCurrentPage(props.maxPage)}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export function Product({...props}){

    let product = props.productData

    let item = 
    {
        "id": 0,
        "productId": product.id,
        "productName": `${product.manufacturer.name} ${product.name} `,
        "quantity": 1,
        "price": product.price,
        "orderId": 0,
    }

    //review function to be added
    //favorite button to be added in the top right corner of the product photo
    return(
            <div className="bg-black-900 opacity-95 w-full h-80 shadow-md shadow-black-900/40">
                <Link href={`${props.baseUrl}products/${product.id}`}>
                <div className="w-full bg-black-900 bg-opacity-20 h-48">
                    <img src="https://media.istockphoto.com/id/936307606/vector/red-sliced-onion-watercolor-hand-drawn-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=q1au5WBcEZKQD15ji-E_6pEKDIwcxX5nXBU54yi5cyc="
                         className="w-full h-48 object-cover active:opacity-80 sticky transition-all"
                    />
                </div>
                </Link>
                <div className="h-28 flex-col">
                    <div className="flex justify-between w-full">
                    <div className="h-10 p-2 text-lg inline-block w-full whitespace-nowrap overflow-ellipsis overflow-hidden">{product.name}</div>
                    
                    </div>
                    
                    <div className="w-full h-6 bg-opacity-95 bg-black-900  p-2 pt-0 pb-1 text-sm">{product.manufacturer.name}</div>
                    <div className="w-full h-12 p-2 pb-0 flex justify-between">
                        <div className="text-2xl max-lg:text-xl mb-auto mt-auto">{Number(product.price).toFixed(2)} zł</div>
                        <Button className='w-28 max-md:w-28 max-md:text-sm mb-auto mt-auto relative' text="Add to cart" color="bg-cornflower_blue-400"
                            onClick={() => AddOrUpdateToBasket(item)}/>
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
 
