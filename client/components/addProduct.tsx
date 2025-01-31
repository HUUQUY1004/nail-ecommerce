"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { AddProduct, UserRegister } from "~/lib/validation"
import { addProduct, register } from "~/lib/actions"
import { useRouter } from "next/navigation"
import { Textarea } from "./ui/textarea"
import Image from "next/image"
import { useDropzone } from "react-dropzone";
import { useState } from "react"
export default function AddProductForm() {
    const form = useForm<z.infer<typeof AddProduct>>({
        resolver: zodResolver(AddProduct),
        defaultValues: {
          name: "",
          description: "",
          price: "0",
          discount: "0",
          quantity: "0",
          imageMain:"",
          imageOther:[]
          
        },
      })
    const [preview, setPreview] = useState(null);
    const [otherImages, setOtherImages] = useState<string[]>([])

    const onDrop = (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      form.setValue("imageMain", file);
    };
    const onDropOther = (acceptedFiles: File[]) => {
        // Giới hạn chỉ cho phép 5 ảnh
        if (otherImages.length + acceptedFiles.length <= 5) {
          const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
          setOtherImages(prev => [...prev, ...newImages]);
          form.setValue("imageOther", [...otherImages, ...acceptedFiles]);
        }
      };
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "image/*", // Chỉ nhận file ảnh
      multiple: false, // Chỉ cho phép tải lên một file
    });
    const { getRootProps: getRootPropsOther, getInputProps: getInputPropsOther } = useDropzone({
        onDrop: onDropOther,
        accept: "image/*",
        multiple: true,
        maxFiles: 5, 
      });
  // ...
  

const navigate = useRouter()
const onSubmit = async (values  : z.infer<typeof AddProduct>)=>{
    const dataSubmit = {
        ...values,
        price: +values.price,
        discount: +values.discount,
        quantity: +values.quantity
    }
    const data = await addProduct(dataSubmit)
    if(data.status ===200){
      navigate.push("/admin/manager-products")
    }else{
      console.log(data);
      
    }
    
    
    
}
  return (
   <div className="bg-white px-10 py-7 flex flex-col gap-4 items-center justify-center w-full  lg:w-[600px] sm:w-[500px] w-phone:w-[300px] mt-10">
    <div>
      <h1 className="text-4xl font-semibold text-center" >Thêm sản phẩm</h1>
      <p className="py-2 text-center sm:w-[500px] w-phone:w-[300px] text-sm">Chỉ cần có một tài khoản Hanie-Nail để truy cập được tất cả các dịch vụ của Hanie-Nail</p>
    </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
            control={form.control}
            name="imageMain"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Ảnh sản phẩm</FormLabel>
                <FormControl className="flex justify-center w-full">
                  <div
                  {...getRootProps()}
                   className="cursor-pointer w-40 h-40 border-dashed border-2 border-green-500">
                    <input {...getInputProps()} /> {/* Input ẩn */}
                    {preview ? (
                        <Image
                        src={preview}
                        alt="Preview"
                        width={150}
                        height={150}
                        className="object-cover"
                        />
                    ) : (
                        <Image
                        width={50}
                        height={50}
                        src="/images/add.svg"
                        alt="Upload"
                        />
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageOther"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel className="font-semibold">Ảnh khác</FormLabel>
                <FormControl>
                    <div className="flex gap-4 justify-start">
                    {otherImages.map((image, index) => (
                        <div key={index} className="cursor-pointer flex justify-center items-center w-24 h-24 border-dashed border-2 border-green-500">
                        <Image
                            width={30}
                            height={30}
                            src={image}
                            alt={`Other image ${index + 1}`}
                            className="object-cover"
                        />
                        </div>
                    ))}
                    {otherImages.length < 5 && (
                        <div {...getRootPropsOther()} className="cursor-pointer flex justify-center items-center w-24 h-24 border-dashed border-2 border-green-500">
                        <input {...getInputPropsOther()} />
                        <Image
                            width={30}
                            height={30}
                            src="/images/add.svg"
                            alt="Upload"
                        />
                        </div>
                    )}
                    </div>
                </FormControl>
                </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Tên sản phẩm</FormLabel>
                <FormControl>
                  <Input placeholder="Nail box" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Giá bán</FormLabel>
                <FormControl>
                  <Input placeholder="1000.000 VNĐ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Giảm giá</FormLabel>
                <FormControl>
                  <Input placeholder="0 VNĐ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Số lượng</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Mô tả sản phẩm</FormLabel>
                <FormControl>
                  <Textarea placeholder="Mô tả sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Thêm</Button>
        </form>
      </Form>
   </div>
  )
}
