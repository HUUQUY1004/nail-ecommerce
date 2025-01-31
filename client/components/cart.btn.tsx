import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { addToCart } from '~/lib/actions'
import { toast } from '~/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import Link from 'next/link'

interface AddToCartProps {
    productId: string,
    quantity: number,
}
const CartButton = (props: AddToCartProps) => {
      // add cart
  const addCart = async () => {
    const data = await addToCart({productId:props.productId , quantity: props.quantity})
    if(data){
      toast({
        variant: "outline",
        title: "Thông báo",
        description: data.message,
        action: <ToastAction altText="Đi tới">
          <Link href={'/cart'}>Giỏ hàng</Link>
        </ToastAction>,
      })
    }
  }
  return (
    <Button className='bg-orange-400 w-52' onClick={()=> addCart()}>
            <span>
              <Image
                src={'/images/cart.svg'}
                alt='cart'
                width={20}
                height={20}
              />
            </span>
            <span>Thêm vào giỏ hàng</span>
          </Button>
  )
}

export default CartButton