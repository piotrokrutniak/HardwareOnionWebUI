import GetDetailTypes from "@/app/(api methods)/GetDetailTypes"
import GetProductDetails from "@/app/(api methods)/GetProductDetails"
import { ExitIcon, PlusIcon, ShoppingCartSVG, TrashIcon } from "@/app/components/icons"
import Button from "@/app/components/ui components/button"
import { Dropdown, SortDropdown } from "@/app/components/ui components/dropdown"
import Spinner from "@/app/components/ui components/spinner"
import TextBox from "@/app/components/ui components/textbox"
import { useEffect, useState } from "react"

export function UpdateProductForm({...props}){
    let createdDate = new Date(Date.parse(props.productData.created)).toLocaleDateString() ?? "No Data" 
    let updatedDate = new Date(Date.parse(props.productData.lastModified)).toLocaleDateString() ?? "No Data" 

    const [popupActive, setPopupActive] = useState(false)

    

    return(
        <div className='bg-cornflower_blue-100/20 bg-opacity-5 max-w-qhd m-auto p-10 max-850:p-2'>
            
            
            <section id="photos-section" className="my-5">
                <div className="w-full flex max-lg:flex-col">
                <div id="main-photo" className="bg-black-900 h-96 w-96 flex-shrink-0 mr-3 mb-5 max-lg:w-full">
                    <img src="https://media.istockphoto.com/id/936307606/vector/red-sliced-onion-watercolor-hand-drawn-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=q1au5WBcEZKQD15ji-E_6pEKDIwcxX5nXBU54yi5cyc="
                         className="h-full object-cover sticky max-lg:h-80 max-lg:m-auto"
                    />
                    <div id="photo-slider" className="h-12 max-w-96 mt-3 mr-3 flex-shrink-0 min-lg:hidden max-lg:m-auto max-lg:mt-2"></div>
                    
                </div>

                <div id="info-section" className="h-96 bg-cornflower_blue-50/5 w-full overflow-y-auto">
                    <div id="info-section" className="bg-black-900 h-auto w-full flex justify-between p-3">
                        <div className="h-auto">
                            <div className="h-auto text-3xl mb-2"> 
                                <TextBox inputStyle="bg-black-900/25 h-14 rounded-md border-turquoise-50/80 active:border-turquoise-50 " 
                                    label={false} defaultValue={props.productData.name} wrapperStyle="h-auto"/>
                            </div>
                            <div className="h-auto text-xl"> 
                                <TextBox inputStyle="bg-black-900/25 rounded-md border-turquoise-50/80 active:border-turquoise-50 " 
                                    label={false} defaultValue={props.productData.manufacturer ? props.productData.manufacturer.name : "" } wrapperStyle="h-auto"/>
                            </div>
                        </div>

                        <div className="max-lg:hidden">
                            <div className="text-lg h-14 flex flex-col-reverse"><div className="relative border-b-4 border-transparent"> Created: {createdDate ?? "No Data"} </div></div>
                            <div className="text-lg relative h-8"> Updated: {updatedDate ?? "No Data"}  </div>
                        </div>
                    </div>
                    <div className="w-full h-auto p-3 text-md grid grid-cols-2 max-sm:grid-cols-1 gap-2">
                        <ProductDetails id={props.id}/>
                    </div>

                    
                </div>

                </div>
                <div className="w-full flex">
                <div id="photo-slider" className="bg-black-900 h-24 w-96 mt-3 mr-3 flex-shrink-0 max-lg:hidden"></div>
                <div id="button-section" className="bg-black-900 h-24 w-full mt-3 flex justify-between p-3 gap-3 font-semibold"> 
                    <div className="flex flex-col justify-center relative text-xl"> 
                        <TextBox inputStyle="bg-black-900/25 h-14 rounded-md border-turquoise-50/80 active:border-turquoise-50 " 
                            label={false} defaultValue={props.productData.price} wrapperStyle="h-auto"/>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Button text="UPDATE" icon={<PlusIcon className="w-7 h-7 relative my-auto"/>} 
                            textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                            className="py-3 px-5 w-full max-xs:px-2 justify-center flex" height="h-14" color="bg-sap_green-50/50 hover:bg-sap_green-50/60"/>

                        <Button text="DELETE" icon={<TrashIcon className="w-7 h-7 relative my-auto"/>} onClick={() => setPopupActive(true)}
                            textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                            className="py-3 px-5 w-full max-xs:px-2 justify-center flex" height="h-14" color="bg-raspberry-500"/>

                        <Button text="DISCARD" icon={<ExitIcon className="w-7 h-7 relative my-auto" fill="white"/>} 
                            textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                            className="py-3 px-5 w-full max-xs:px-2 justify-center flex" height="h-14" color="bg-cornflower_blue-100/25 hover:bg-cornflower_blue-100/40"/>
                    </div>
                </div>
                </div>
                
            </section>

            <div className={`${popupActive ? "" : "hidden"} absolute left-0 top-0 bg-black-900/50 backdrop-blur w-full h-full flex justify-center`}>
                <div className="bg-black-900 h-64 top-1/4 absolute p-10 border-2 border-white-900/10 rounded-lg flex flex-col justify-between">
                    <div className="text-lg">Do you really want to delete this product? <br/> This action is irreversible.</div>
                    <div className="flex flex-row place-items-end justify-between gap-4"> 
                        <Button text="DELETE" icon={<TrashIcon className="w-7 h-7 relative my-auto"/>} onClick={() => setPopupActive(true)}
                                textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                                className="py-3 px-5 w-full max-xs:px-2 justify-center flex " height="h-14" color="bg-raspberry-500"/>
                        <Button text="Cancel" icon={<ExitIcon className="w-7 h-7 relative my-auto" fill="white"/>} onClick={() => setPopupActive(false)}
                                textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                                className="py-3 px-5 w-full max-xs:px-2 justify-center flex" height="h-14" color="bg-cornflower_blue-100/25 hover:bg-cornflower_blue-100/40"/>
                    </div>
                </div>
             </div>

        </div>
    )
}

function ProductDetails({...props}){

    const detObj = {"id": props.id, "detailType": "Produced", "detailTypeId": 1, "description": ""}
    const [isDetailLoading, setIsDetailLoading] = useState(true)
    const [isDetailTypeLoading, setIsDetailTypeLoading] = useState(true)
    const [productData, setProductData] = useState([])
    const [detailTypes, setDetailTypes] = useState([])

    function NewKey(){
        productData.sort((a,b) => parseInt(a.id) - parseInt(b.id))
        
        let key = productData.length > 0 ? productData[productData.length-1].id : 0
        
        return ++key
    }

    function AddDetail(detail){
        detail.id = NewKey()
        console.log(detail.id)
        productData.push(detail)
        return setProductData([...productData])
    }

    function DeleteDetail(detailId){
        return setProductData([...productData.filter(d => d.id != detailId)])
    }

    useEffect(() => {
        setIsDetailLoading(true)
        setIsDetailTypeLoading(true)
        let mounted = true
        
        GetProductDetails(props.id).then(p => {
            if(mounted){
                setProductData(p.data)
                console.log(p.data)
            }
        }).then(setIsDetailLoading(false)).then(console.log(productData));

        GetDetailTypes().then(p => {
            if(mounted){
                setDetailTypes(p.data)
                console.log(p.data)
            }
        }).then(setIsDetailTypeLoading(false)).then(console.log(detailTypes));

        return () => mounted = false;
    }, [])

    return !isDetailLoading && !isDetailTypeLoading ? (
        <>
        {productData.map((p) => (<Detail detailData={p} key={p.id} dropdownValues={detailTypes} DeleteDetail={DeleteDetail}/>))}
        <Button icon={<PlusIcon className="w-10 h-10 relative"/>} onClick={() => AddDetail(detObj)}
                            textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                            className="py-3 px-5 w-full max-xs:px-2 justify-center flex hover:bg-cornflower_blue-50/20 row-span-2 relative" height="h-auto" color="bg-cornflower_blue-50/10"/>

        </>
    ) : <div className="flex">Loading <Spinner className="fill-white-900/50 h-7 w-7 ml-4"/></div>
}

function Detail({...props}){
    const data = props.detailData
    return(
        <div className={`${data.detailType.name == "Description" ? "col-span-2 max-sm:col-span-1" : ""}`}>
            <div className="w-full bg-gradient-to-r rounded-md px-2 flex justify-between from-black-900 to-transparent text-white-900 p-1"> 
                <div>
                <Dropdown showLabel={false} className="grid text-black-900" label="Sort by" 
                    dropdownValues={props.dropdownValues} 
                    defaultValue={data.detailType.name} 
                    setDropdownValue={props.setDropdownValue} 
                    dropdownValue={props.dropdownValue}/>
                    
                </div> 
                <ExitIcon id={props.key} className="w-7 h-7 relative my-auto hover:fill-raspberry-500 hover:stroke-raspberry-500 hover:cursor-pointer active:opacity-75" fill="white"
                    onClick={() => props.DeleteDetail(data.id)} /> 
            </div>
            <div className="w-full text-white-900 p-1"> 
                <TextBox label={true} inputStyle="bg-black-900/25 rounded-md border-turquoise-50/80 active:border-turquoise-50" defaultValue={data.description}/>
            </div>
        </div>
    )
}