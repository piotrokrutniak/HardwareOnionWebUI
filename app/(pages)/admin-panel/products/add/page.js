"use client";
import React, { useReducer, useState, useEffect } from 'react'
import { GetApiEndpoint } from '@/app.config';
import ProductPage from '@/app/components/product page/productpage';
import GetProduct from '@/app/(api methods)/GetProduct';
import { AddProductForm } from '@/app/components/user page/admin panel/forms/product/addproduct';



export default function AddProduct(pageData) {
    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProductData] = useState([])

  return (
        
    <AddProductForm productData={productData}/>
    
)
}
