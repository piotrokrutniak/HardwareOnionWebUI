"use client";
import React, { useReducer, useState, useEffect } from 'react'
import { GetApiEndpoint } from '@/app.config';
import ProductPage from '@/app/components/product page/productpage';
import { UpdateProductForm } from '@/app/components/user page/admin panel/forms/product/updateproduct';
import GetProduct from '@/app/(api methods)/GetProduct';



export default function UpdateProduct(pageData) {
    let id = pageData.params.id

    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProductData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        let mounted = true
        
        GetProduct(id).then(p => {
            if(mounted){
                setProductData(p.data)
            }
        }).then(setIsLoading(false)).then(console.log(productData));
        return () => mounted = false;
    }, [])

  return productData ? (
        
    <UpdateProductForm isLoading={isLoading} productData={productData} id={id}/>
    
) : <div>Loading</div>
}
