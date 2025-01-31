"use client"
import Image from 'next/image';
import { env } from 'process';
import React, { useState } from 'react'
import { useToast } from '~/hooks/use-toast';
import  { Product } from '~/lib/types/type';
import { Button } from './ui/button';
import { addToCart } from '~/lib/actions';
import CartButton from './cart.btn';
 interface Prop {
    product :Product 
 }
const ProductDetail = ({product}: Prop) => {
  const [image,setImage] = useState<string>(product.imageMain)
  const [quantity,setQuantity] = useState<number>(1)
  // Toast
  const { toast } = useToast()
  const handleQuantityPlus =() =>{
     if(product.quantity > quantity){
      setQuantity(quantity + 1)
     }
     else{
      toast({
        variant: "destructive",
        title: "Thông báo",
        description: "Bạn không thể mua quá số lượng còn lại",
      })
     }
  }
  const handleQuantityMinus =() =>{
    if(quantity > 1){
      setQuantity(quantity - 1)
    }
  }


  return (
    <div className='flex mx-auto lg:w-[1204px] px-2 py-10 bg-white'>
      <div className='image w-1/2'>
        <Image
          src={"http://localhost:5000/"+ image }
          width={550}
          height={550}
          alt={product.name}
          className='h-[400px] w-[400px] object-cover'
        />
        <div className='image-other mt-4'>
          {
            product.imageOther.map((imageOther, index) => (
              <Image
                key={index}
                src={"http://localhost:5000/"+ imageOther}
                width={100}
                height={100}
                alt={product.name}
                className='cursor-pointer w-24 h-24 object-cover'
                onMouseOver={()=>setImage(imageOther)}
                onMouseOut={()=>setImage(product.imageMain)}
              />
            ))
          }
        </div>
      </div>
      <div className='information w-1/2 flex flex-col gap-5'>
        <h1 className='text-xl pb-3'>{product.name}</h1>
        <div className='overview pb-3 w-full flex gap-12'>
          <div className='start flex'>
            <span className='mr-2'>0</span>
            {
              [1,1,1,1,1].map((svg, index)=>{
                return <Image
                        src={'/images/star.svg'}
                        alt='star'
                        width={20}
                        height={20}
                />
              })
            }

          </div>
          <div>
            <span className='mr-2'>0</span>
            <span>Đã bán</span>
          </div>
          <div>
            <span className='mr-2'>0</span>
            <span>Đã bán</span>
          </div>
          
        </div>
        <div className='flex gap-6 '>
          <p className='text-orange-600 text-2xl '>{product.price - product.discount } VNĐ</p>
          <p className='text-orange-600 text-2xl line-through'>{product.price} VNĐ</p>
        </div>
        <p className='text-gray-500 my-2'>
          <span className='mr-2'>Số lượng còn lại:</span>
          <span>{product.quantity}</span>
        </p>

        {/* quantity */}
        <div className='flex items-center gap-5'>
          <span>Số lượng</span>
          <div className='flex gap-2 border w-36 items-center'>
            <button className='text-gray-500 w-10 h-10 border-r' onClick={()=>handleQuantityMinus()}>-</button>
            <div className='flex-1 text-center'>{quantity}</div>
            <button className='text-gray-500 w-10 h-10 border-l' onClick={()=>handleQuantityPlus()}>+</button>
          </div>
        </div>
        {/* button */}
        <div className='flex gap-5'>
          <CartButton productId={product._id} quantity={quantity}/>
          <Button className='bg-orange-400 w-52'>Mua ngay</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail