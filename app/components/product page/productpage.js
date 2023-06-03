import { ProductInfoSection } from "./productpage.elements";
import React, { useReducer, useState, useEffect } from 'react'
import { GetApiEndpoint } from '@/app.config';
import GetProduct from "@/app/(api methods)/GetProduct";

    

export default function ProductPage({...props}){
    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProductData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        let mounted = true
        
        GetProduct(props.userId).then(p => {
            if(mounted){
                setProductData(p.data)
            }
        }).then(setIsLoading(false)).then(console.log(productData));
        return () => mounted = false;
    }, [])

    return productData ? (
        
         <ProductInfoSection isLoading={isLoading} productData={productData} id={props.userId}/>
        
    ) : <div>Loading</div>
    }