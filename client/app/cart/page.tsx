import React from 'react'
import Header from '~/components/header'
import ShowCart from '~/components/showCart'
const Cart = () => {
  return (
    <div className='flex flex-col'>
        <Header/>
        <ShowCart
        />
    </div>
  )
}

export default Cart