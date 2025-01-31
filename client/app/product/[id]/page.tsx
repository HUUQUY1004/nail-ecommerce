"use client"
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Header from '~/components/header';
import { getProductById } from '~/lib/actions';
import Loading from '~/components/loading.jsx';
import type { Product } from '~/lib/types/type';
import ProductDetail from '~/components/product-detail';
const Product = () => {
    const params = useParams<{tag:string, item:string}>() 
    const [product, setProduct] = useState<Product>()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        (async()=>{
            try {
                const response = await getProductById(params.id)
                console.log(params.id);
                setProduct(response.data)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        })()
    },[params.id])
    
  return (
    <div className='flex flex-col '>
        <Header/>
        {
            isLoading? (
                <div className='flex justify-center items-center h-screen'>

                    <Loading/>
                </div>
            ) : (
                <ProductDetail product={product}/> 
            )
        }
    </div>
  )
}

export default Product