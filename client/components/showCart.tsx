'use client'
import React, { useEffect, useState } from 'react'
import { getCart } from '~/lib/actions';
import { Checkbox } from './ui/checkbox';
import Loading from './loading';
import Image from 'next/image';
import { callbackify } from 'util';
import { Checkout } from '~/lib/types/type';
const showCart =  () => {
  const [carts, setCarts] = useState<any>(null);
  const [isLoading,setIsLoading] = useState<boolean>(true);
  const [isAllProduct, setIsAllProduct] = useState<boolean>(false)
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkout, setCheckout] = useState<Checkout>({quantity:0, price:0})
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCarts(cartData);
        setIsLoading(false);
        console.log(cartData)
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);
  console.log(isAllProduct);
  const handleSelectAll = (checked) => {
    setIsAllProduct(checked);
    if (checked) {
      setSelectedProducts(carts.data.map(item => item.product._id));
    } else {
      setSelectedProducts([]);
    }
  };
  const handleSelectProduct = (productId, checked) => {
    setSelectedProducts((prev) =>
      checked ? [...prev, productId] : prev.filter(id => id !== productId)
    );
  }
  useEffect(()=>{
    console.log(selectedProducts);
    
  }, [selectedProducts])

  return (
    <div className='flex flex-col mx-auto lg:w-[1204px] px-2 min-h-[100vh -96px]'>
      <div className='mt-5 py-5 px-10 w-full flex justify-between bg-white'>
        <div className='w-[50%] flex items-center'>
          <div className="flex items-center space-x-2">
            <Checkbox checked={isAllProduct} onCheckedChange={handleSelectAll} id="all-product" />
            <label
              htmlFor="all-product"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sản phẩm
            </label>
        </div>
        </div>
        <div className='w-[50%] flex items-center justify-between'>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Thành tiền</p>
          <p>Thao tác</p>
        </div>
      </div>
      <div className='flex-1 bg-white mt-5 px-10'>
        {
          isLoading ?
          <div className='h-[400px] flex items-center justify-center'><Loading/></div>
          :
          carts.data.map(item =>(
          <div key={item.product._id} className='mt-5 py-5  w-full flex justify-between bg-white'>
            <div className='w-[50%] flex items-center'>
              <div className="flex items-center space-x-2">
                <Checkbox  checked={selectedProducts.includes(item.product._id)}
                           onCheckedChange={(checked) => handleSelectProduct(item.product._id, checked)}
                           id={'product_'+ item.product._id} />
                <label
                  htmlFor={'product_'+ item.product._id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {
                    <div className='flex items-center gap-5'>
                      <Image
                        height={50}
                        width={50}
                        src={"http://localhost:5000/"+ item.product?.imageMain}
                        alt='image'
                      />
                      <p title={item.product.name} className='text-[16px] truncate max-w-[200px]'>{item.product.name}</p>
                    </div>
                  }
                </label>
            </div>
          </div>
        <div className='w-[50%] flex items-center justify-between'>
          <p>{item.product.price}</p>
          <p>{item.quantity}</p>
          <p>{item.quantity * (item.product.price - item.product.discount)}</p>
          <p className='cursor-pointer hover:underline text-red-500'>Xóa</p>
        </div>
          </div>
          )
          )
        }
      </div>
      <div className='fixed bottom-5 left-0 right-0 flex justify-center'>
        <div className=' w-[1204px] mt-5 py-5 px-10 flex justify-between bg-white'>
          <div className='w-[50%] flex items-center'>
            <div className="flex items-center space-x-2">
              <Checkbox checked={isAllProduct} onChange={()=>setIsAllProduct(!isAllProduct)} id="all-product-tick" />
              <label
                htmlFor="all-product-tick"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Chọn tất cả ({carts?.data?.length})
              </label>
          </div>
          </div>
          <div className='w-[50%] flex items-center justify-between'>
            <p>Giá: {checkout.price} <span className='font-bold text-red-500'>VNĐ</span></p>
            <p>Số lượng: ({checkout.quantity})</p>
            <p className='text-red-500 cursor-pointer hover:underline'>Xóa toàn bộ</p>
            <p>Thao tác</p>
          </div>
        </div>
      </div>
       
    </div>
  )
}

export default showCart