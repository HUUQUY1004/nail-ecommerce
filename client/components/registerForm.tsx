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
import { UserRegister } from "~/lib/validation"
import { register } from "~/lib/actions"
import { useRouter } from "next/navigation"

export default function RegisterForm() {
  // ...
  const form = useForm<z.infer<typeof UserRegister>>({
    resolver: zodResolver(UserRegister),
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      name: "",
      role: "CUSTOMER",
      address: "",
    },
  })

const navigate = useRouter()
const onSubmit = async (values  : z.infer<typeof UserRegister>)=>{
    const data = await register(values)
    if(data.status === 200) {
      localStorage.setItem("access_token", data.token.access_token)
      if(data._doc.role === "ADMIN") {
        navigate.push("/admin")
      }
      else {
        navigate.push("/")
      }
      
    }
}
  return (
   <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-[600px] sm:w-[500px] w-phone:w-[300px] mt-10">
    <div>
      <h1 className="text-4xl font-semibold text-center" >Tạo tài khoản</h1>
      <p className="py-2 text-center sm:w-[500px] w-phone:w-[300px] text-sm">Chỉ cần có một tài khoản Hanie-Nail để truy cập được tất cả các dịch vụ của Hanie-Nail</p>
    </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Tên người dùng</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Đăng ký</Button>
        </form>
      </Form>
   </div>
  )
}
