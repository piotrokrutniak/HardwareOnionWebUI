import GetDetailTypes from "@/app/(api methods)/GetDetailTypes"
import GetProductDetails from "@/app/(api methods)/GetProductDetails"
import { ExitIcon, ExpandIcon, PlusIcon, ShoppingCartSVG, TrashIcon } from "@/app/components/icons"
import Button from "@/app/components/ui components/button"
import { Dropdown, SortDropdown } from "@/app/components/ui components/dropdown"
import Spinner from "@/app/components/ui components/spinner"
import TextBox from "@/app/components/ui components/textbox"
import { useEffect, useState } from "react"

export function AddProductForm({...props}){
    const [popupActive, setPopupActive] = useState(false)
    const [productDetails, setProductDetails] = useState([])
    const [displayExpand, setDisplayExpand] = useState(false);


    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        productTypeId: "",
        manufacturerId: ""
    })

    function AddProductDetail(detail){
        productDetails.push(detail)
        return setProductDetails([...productDetails])
    }

    function UploadProduct(){
        //upload product
        console.log(productData)
        //use uploaded product response with id to upload details
        console.log(productDetails)
    }

    //upload product then details, data validated by server

    return(
        <div className='bg-cornflower_blue-100/20 bg-opacity-5 max-w-qhd m-auto p-10 max-850:p-2'>
            
            
            <section id="photos-section" className="my-5">
                <div className="w-full flex max-lg:flex-col">
                
                <div id="main-photo" className="h-96 w-96 flex-shrink-0 mr-3 mb-5 max-lg:w-full relative">
                <div className="fixed h-96 w-96">
                    <img src="https://media.istockphoto.com/id/936307606/vector/red-sliced-onion-watercolor-hand-drawn-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=q1au5WBcEZKQD15ji-E_6pEKDIwcxX5nXBU54yi5cyc="
                         className="h-full object-cover max-lg:h-80 max-lg:m-auto sticky top-0"
                    />
                    <div id="photo-slider" className="bg-black-900 h-24 w-96 mt-3 mr-3 flex-shrink-0"></div>
                    <div className="h-96 w-96 hover:bg-black-900/60 active:bg-black-900/80 cursor-pointer transition-all absolute top-0 flex items-center justify-center content" 
                        onMouseEnter={() => setDisplayExpand(true)} onMouseLeave={() => setDisplayExpand(false)}>
                        <ExpandIcon className={`${displayExpand ? "scale-100" : "hidden"} stroke-white-900 fill-transparent hover:scale-150 active:scale-100 transition-all`}/>
                    </div>
                </div>
                    
                </div>

                <div id="info-section" className="h-auto bg-cornflower_blue-50/5 w-full overflow-y-auto">
                    <div id="info-section" className="bg-black-900 h-auto w-full flex justify-between p-3">
                        <div className="h-auto">
                            <div className="h-auto text-3xl mb-2"> 
                                <TextBox inputStyle="bg-black-900/25 h-14 rounded-md border-turquoise-50/80 active:border-turquoise-50 " 
                                    label={false} defaultValue={props.productData.name} placeHolder="Name" wrapperStyle="h-auto"/>
                            </div>
                            <div className="h-auto text-xl"> 
                                <TextBox inputStyle="bg-black-900/25 rounded-md border-turquoise-50/80 active:border-turquoise-50 " 
                                    label={false} placeHolder="Manufacturer" defaultValue={props.productData.manufacturer ? props.productData.manufacturer.name : "" } wrapperStyle="h-auto"/>
                            </div>
                        </div>

                        <div className="max-lg:hidden">
                            <Dropdown dropdownValues={["xd", "lol", "ay"]}/>
                        </div>
                    </div>
                    <div className="w-full h-auto p-3 grid-flow-row-dense text-md grid grid-cols-2 max-sm:grid-cols-1 gap-2">
                        <ProductDetails productDetails={productDetails} setProductDetails={setProductDetails} AddProductDetail={AddProductDetail} id={props.id}/>
                    </div>

                    
                </div>

                </div>
                <div className="w-full flex">
                <div id="photo-slider" className="bg-black-900 h-24 w-96 mt-3 mr-3 flex-shrink-0 max-lg:hidden"></div>
                <div id="button-section" className="bg-black-900 h-24 w-full mt-3 flex justify-between p-3 gap-3 font-semibold"> 
                    <div className="flex flex-col justify-center relative text-xl"> 
                        <TextBox inputStyle="bg-black-900/25 h-14 rounded-md border-turquoise-50/80 active:border-turquoise-50 " 
                            label={false} placeHolder="Price" defaultValue={props.productData.price} wrapperStyle="h-auto"/>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Button text="ADD" icon={<PlusIcon className="w-7 h-7 relative my-auto"/>} onClick={() => UploadProduct()}
                            textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                            className="py-3 px-5 w-full max-xs:px-2 justify-center flex" height="h-14" color="bg-sap_green-50/50 hover:bg-sap_green-50/60"/>

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

    const detObj = {"id": props.id, "detailType": "Produced", "detailTypeId": 1, "description": "", "productId": undefined}
    const [isDetailTypeLoading, setIsDetailTypeLoading] = useState(true)
    const [detailTypes, setDetailTypes] = useState([])

    function NewKey(){
        props.productDetails.sort((a,b) => parseInt(a.id) - parseInt(b.id))
        
        let key = props.productDetails.length > 0 ? props.productDetails[props.productDetails.length-1].id : 0
        
        return ++key
    }

    function UpdateDetailType(detailId, detailTypeId){
        //filter and set detailType where product id = x
        const index = props.productDetails.findIndex(x => x.id == detailId)
        //update dropdown value
        props.productDetails[index].detailTypeId = detailTypeId

        return props.setProductDetails([...props.productDetails])
    }

    function UpdateDetailValue(detailId, newValue){
        const index = props.productDetails.findIndex(x => x.id == detailId)
        props.productDetails[index].description = newValue

        return props.setProductDetails([...props.productDetails])
    }

    function AddDetail(detail){
        detail.id = NewKey()
        console.log(detail.id)
        return props.AddProductDetail(detail)
    }

    function DeleteDetail(detailId){
        return props.setProductDetails([...props.productDetails.filter(d => d.id != detailId)])
    }

    useEffect(() => {
        setIsDetailTypeLoading(true)
        let mounted = true

        GetDetailTypes().then(p => {
            if(mounted){
                setDetailTypes(p.data)
                console.log(p.data)
            }
        }).then(setIsDetailTypeLoading(false)).then(console.log(detailTypes));

        return () => mounted = false;
    }, [])

    return !isDetailTypeLoading ? (
        <>
        {props.productDetails.map((p) => (<Detail setDropdownValue={UpdateDetailType} UpdateDetailValue={UpdateDetailValue} detailData={p} key={p.id} dropdownValues={detailTypes} DeleteDetail={DeleteDetail}/>))}
        <div className="h-28">
        <Button icon={<PlusIcon className="w-10 h-10 relative"/>} onClick={() => AddDetail(detObj)}
                            textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                            className="py-3 px-5 w-full max-xs:px-2 justify-center flex hover:bg-cornflower_blue-50/20 row-span-2 relative" height="h-full" color="bg-cornflower_blue-50/10"/>
        </div>

        </>
    ) : <div className="flex">Loading <Spinner className="fill-white-900/50 h-7 w-7 ml-4"/></div>
}

function Detail({...props}){
    const data = props.detailData
    return data.id ? (
        <div className={`${data.detailType.name == "Description" ? "col-span-2 max-sm:col-span-1" : ""}`}>
            <div className="w-full bg-gradient-to-r rounded-md px-2 flex justify-between from-black-900 to-transparent text-white-900 p-1"> 
                <div>
                <Dropdown showLabel={false} className="grid text-black-900" label="Sort by" 
                    dropdownValues={props.dropdownValues} 
                    defaultValue={data.detailType.name} 
                    setDropdownValue={props.setDropdownValue} 
                    dropdownValue={props.dropdownValue}
                    detailId={data.id}
                    key={data.id}/>
                    
                    
                </div> 
                <ExitIcon id={props.key} className="w-7 h-7 relative my-auto hover:fill-raspberry-500 hover:stroke-raspberry-500 hover:cursor-pointer active:opacity-75" fill="white"
                    onClick={() => props.DeleteDetail(data.id)} /> 
            </div>
            <div className="w-full text-white-900 p-1"> 
                <TextBox onChange={props.UpdateDetailValue} formInput={true} id={data.id} label={true} defaultValue={data.description}
                inputStyle="bg-black-900/25 rounded-md border-turquoise-50/80 active:border-turquoise-50"/>
                
            </div>
        </div>
    ) : <></>
}