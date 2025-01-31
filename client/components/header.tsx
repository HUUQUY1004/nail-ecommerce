'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
  const user = false
  const username = "Đặng Hữu Qúy"
  const list = [
    {
      "title": 'Trang chủ',
      "link": '/',
    },
    {
      "title": "Đặt lịch",
      "link": '/booking',

    },
    {
      "title": "Mua sắm",
      "link": "/buy",
    },
    {
      "title": "Liên hệ",
      "link": '/contact'
    }
  ]
  //navigate
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className='w-full mx-auto flex justify-center bg-red-500'>
        <div className=' flex items-center justify-between lg:w-[1204px] h-24 px-2 py-5'>
          <div className='left cursor-pointer'>
            <Image  onClick={()=>handleClick()} height={180} width={180} src={'/images/logo.png'} alt='logo' />
          </div>
          <div className="right flex justify-center gap-5 items-center">
            <div className='r-1'>
              {list.map((item, index) => (
                <Link key={index} href={item.link} className='text-white px-3 py-2 text-gray-700 hover:text-gray-900 '>
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="r-2 flex gap-6 items-center">
              <div className='cart relative cursor-pointer'>
                <Image className='font-bold' height={24} width={24} src={'/images/cart.svg'} alt='cart' />
                <span className='absolute bg-slate-700 py-1 px-2 text-white font-bold' style={{top: "-25px" , right: '-22px', borderRadius: '50%'}}>0</span>
              </div>
              <div className='user'>
                {
                  user? <div className='flex gap-1 items-center font-semibold'>
                    <Image
                    className='h-7 w-7 rounded-full bg-slate-400 p-1'
                      height={24}
                      width={24}
                      alt='user icon'
                      src={`/images/user.svg`}  
                    />
                    <p className='username'>{`Hi, ${username}`}</p>
                  </div>: <div className='-tracking-tighter cursor-pointer text-white hover:text-gray-900'>
                    <Link href={'/login'}>Đăng nhập</Link>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Header