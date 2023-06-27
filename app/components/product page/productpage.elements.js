import GetProductDetails from "@/app/(api methods)/GetProductDetails"
import { useEffect } from "react/cjs/react.development"
import { useState } from "react/cjs/react.development"
import { ExpandIcon, ShoppingCartSVG } from "../icons"
import Button from "../ui components/button"

//discount to be added

export function ProductInfoSection({...props}){
    const [displayExpand, setDisplayExpand] = useState(false);
    return(
        <div className='bg-cornflower_blue-100/20 bg-opacity-5 max-w-qhd m-auto p-10 max-850:p-2'>
            
            
            <section id="photos-section" className="my-5 max-lg:my-0">
                <div className="w-full flex max-lg:flex-col">
                
                <div id="main-photo" className="lg:h-auto lg:w-96 max-xs:mx-auto flex-shrink-0 mr-3 lg:mb-5 max-lg:w-full relative ">
                <div className="lg:fixed h-auto lg:w-96 max-lg:bg-cornflower_blue-50/5 max-lg:pb-3">
                    <img src="https://media.istockphoto.com/id/936307606/vector/red-sliced-onion-watercolor-hand-drawn-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=q1au5WBcEZKQD15ji-E_6pEKDIwcxX5nXBU54yi5cyc="
                         className="h-96 max-lg:h-112 object-cover  max-lg:m-auto lg:sticky top-0"
                    />
                    <div id="photo-slider" className="bg-black-900 h-24 max-lg:hidden w-96 mt-3 mr-3 flex-shrink-0"></div>
                    <div className="h-96 max-lg:h-112 w-full hover:bg-black-900/60 active:bg-black-900/80 cursor-pointer transition-all absolute top-0 flex items-center justify-center content
                        max-lg" 
                        onMouseEnter={() => setDisplayExpand(true)} onMouseLeave={() => setDisplayExpand(false)}>
                        <ExpandIcon className={`${displayExpand ? "scale-100" : "hidden"} stroke-white-900 fill-transparent hover:scale-150 active:scale-100 transition-all`}/>
                    </div>
                </div>
                </div>

                <div id="info-section" className="h-auto bg-cornflower_blue-50/5 w-full overflow-y-auto shadow-lg shadow-black-900/40">
                    <div id="info-section" className="bg-black-900 h-auto w-full flex gap-8 justify-between p-3 relative">
                        <div className="h-auto">
                            <div className="h-auto text-3xl mb-2"> {props.productData.name}</div>
                            <div className="h-8 text-xl">{props.productData.manufacturer ? props.productData.manufacturer.name : ""}</div>
                        </div>

                        <div className="max-lg:hidden">
                            <div className="text-xl h-10 flex flex-col-reverse max-lg:text-base"><div className="relative border-b-4 border-transparent"> Order now and receive by: </div></div>
                            <div className="text-xl relative h-8 text-turquoise-50"> Tomorrow </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-xl p-4 bg-black-900/70 shadow-sm shadow-black-900/40">Description</div>
                        <div className="text-lg p-4 ">
                            
                            {props.productData.description} 

                            
                        </div>
                    </div>
                    <div className="text-xl p-4 bg-black-900/70 shadow-sm shadow-black-900/40">Specification</div>
                    <div className="w-full h-auto p-3 grid-flow-row-dense text-md grid grid-cols-2 max-sm:grid-cols-1 gap-2">

                        {/* Map these with a limit */}
                        
                        <ProductDetails id={props.id}/>
                    </div>
                </div>
                

                </div>
                <div className="w-full flex">
                <div id="photo-slider" className="bg-black-900 h-24 w-96 mt-3 mr-3 flex-shrink-0 max-lg:hidden"></div>
                <div id="button-section" className="bg-black-900 h-24 w-full mt-3 flex justify-between p-3 gap-3 font-semibold"> 
                    <div className="flex flex-col font-normal"> 
                        <div className="text-xl text-raspberry-600 line-through"> {props.productData.price} </div>
                        <div className="text-4xl max-xs:text-2xl"> {props.productData.price} </div>
                    </div>
                    <div className="flex flex-row-reverse gap-3">
                        <Button text="BUY NOW" height={""} className="text-xl text-black-900 p-8 px-8 max-xs:px-4 max-xs:text-lg" textClassName="-top-1/2 -translate-y-1/2"
                                icon={<ShoppingCartSVG color="black" className="w-7 h-7 inline ml-1 relative"/>}/> 
                        <Button text="CART" height={""} className="text-xl text-black-900 p-8 px-8 max-xs:px-4 max-xs:text-lg" textClassName="-top-1/2 -translate-y-1/2"/> 
                    </div>
                    
                </div>
                </div>
                
                
            
            </section>


        </div>
    )
}

function ProductDetails({...props}){

    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProductData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        let mounted = true
        
        GetProductDetails(props.id).then(p => {
            if(mounted){
                setProductData(p.data)
            }
        }).then(setIsLoading(false)).then(console.log(productData));
        return () => mounted = false;
    }, [])



    
    return !isLoading ? (
        <>
        {console.log(productData)} {productData.map((p) => (<Detail detailData={p}/>))}
        </>
    ) : <div>Loading...</div>
}

function Detail({...props}){
    const data = props.detailData
    console.log(data)

    return(
        <div className={`${data.detailType.name == "Description" ? "col-span-2 max-sm:col-span-1" : ""}`}>
            <div className="w-full bg-gradient-to-r from-black-900 to-transparent text-white-900 p-1"> {data.detailType.name} </div>
            <div className="w-full text-white-900 p-1"> 
                {data.description}
            </div>
        </div>
    )
}