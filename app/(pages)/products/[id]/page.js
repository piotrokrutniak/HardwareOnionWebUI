"use client";
import React, { useReducer, useState, useEffect } from 'react'
import { GetApiEndpoint } from '@/app.config';
import ProductPage from '@/app/components/product page/productpage';



export default function Product(pageData) {
    let userId = pageData.params.id
  return (
        <ProductPage userId={userId}/>
  )
}
