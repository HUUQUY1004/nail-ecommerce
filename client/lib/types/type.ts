import {z} from 'zod'

// export interface Address{
//     roads: string,
//     wards: string,
//     district: string,
//     province: string,
//   };

export interface UserRegister {
    name: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string,
    role: string
}
export interface UserLogin {
  email: string,
  password: string,
}
export interface AddProduct{
  name: string,
  price: number,
  discount: number,
  description: string,
  quantity: number,
  imageMain?: any,
  imageOther?: any,
}

export interface Product {
  _id: any,
  name: string,
  description: string,
  price: number,
  discount: number,
  quantity: number,
  star: number[]
  imageMain: string,
  imageOther: string[],
  createdAt: Date,
  updatedAt: Date,
  __v: number,
}

export interface AddToCart {
  productId: string,
  quantity: number,
}
export interface Checkout {
  price: number,
  quantity: number,
  
}