'use client'
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
import { UserLogin } from "~/lib/validation"
import { login } from "~/lib/actions"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const form = useForm<z.infer<typeof UserLogin>>({
        resolver: zodResolver(UserLogin),
        defaultValues: {
          email: "",
          password: "",
        },
      })
    
  
      const navigate = useRouter()
    const onSubmit = async (values  : z.infer<typeof UserLogin>)=>{
        const data = await login(values)
        console.log(data);
        
        if(data.status === 200){
          localStorage.setItem("access_token", data.token.access_token)
          localStorage.setItem("refresh_token", data.token.refresh_token)
          if(data.user.role === "ADMIN") {
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
      <h1 className="text-4xl font-semibold text-center" >Đăng nhập</h1>
      <p className="py-2 text-center sm:w-[500px] w-phone:w-[300px] text-sm">Đăng nhập tài khoản Hanie-Nail để truy cập được tất cả các dịch vụ của Hanie-Nail</p>
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
          <Button type="submit" className="w-full">Đăng nhập</Button>
        </form>
      </Form>
   </div>
  )
}

export default LoginForm