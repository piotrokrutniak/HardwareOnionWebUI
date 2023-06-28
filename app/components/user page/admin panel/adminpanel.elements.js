import { useEffect, useState } from "react"
import ItemCard from "./item card/itemcard"
import { GetBaseUrl } from "@/app.config"
import GetProducts from "@/app/(api methods)/GetProducts"

export function ItemCards({...props}){
    const [isLoading, setIsLoading] = useState(true)

    const baseUrl = GetBaseUrl()

    //pageNumber = 1 , pageSize = 12, orderBy = "PriceAsc"
    useEffect(() => {
        setIsLoading(true)
        let mounted = true

        GetProducts(props.currentPage, 6, props.orderBy).then(product => {
            if(mounted){
                let newData = [...product.data]
                props.setMaxPage(product.lastPage)
                props.setProductSet(newData)
                console.log(newData)
            }
        }).then(setIsLoading(false));
        return () => mounted = false;
    }, [props.orderBy, props.currentPage])

    return(
        <>
        {!isLoading && props.productSet.map((product) => 
        <ItemCard data={...product} createdDate={product.created} 
            setPopupActive={props.setPopupActive}
            updatedDate={product.lastModified} 
            subTitle={product.manufacturer.name} 
            title={product.name} baseUrl={baseUrl} orderBy={props.orderBy}/> )}
        </>
    )
}