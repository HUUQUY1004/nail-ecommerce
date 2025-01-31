'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const HeaderAdmin = () => {
  const user = true
  const username = "Đặng Hữu Qúy"
  const list = [
    {
      "title": 'Dashboard',
      "link": '/admin',
    },
    {
      "title": "Lịch hẹn",
      "link": '/admin/booking',

    },
    {
      "title": "Sản phẩm",
      "link": '/admin/products',
    }
  ]
  //navigate
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className='w-full mx-auto bg-white'>
        <div className='flex items-center justify-between lg:w[1024px] h-24 px-12 py-5'>
          <div className='left cursor-pointer'>
            <Image  onClick={()=>handleClick()} height={180} width={180} src={'/images/logo.png'} alt='logo' />
          </div>
          <div className="right flex justify-center gap-5 items-center">
            <div className='r-1'>
              {list.map((item, index) => (
                <Link key={index} href={item.link} className='px-3 py-2 text-gray-700 hover:text-gray-900 font-semibold'>
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="r-2 flex gap-6 items-center">
        
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
                  </div>: <div className='font-semibold -tracking-tighter cursor-pointer text-gray-700 hover:text-gray-900'>Đăng nhập/Đăng kí</div>
                }
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default HeaderAdmin