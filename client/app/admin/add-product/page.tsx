
import React from 'react'
import AddProductForm from '~/components/addProduct'
import HeaderAdmin from '~/components/headerAdmin'
import './bg.scss'
const AddProduct = () => {
  return (
    <div>
        <HeaderAdmin/>
        <div className='flex items-center justify-center  px-12 py-5'>
            <AddProductForm/>
        </div>
    </div>
  )
}

export default AddProduct