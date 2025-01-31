import {z} from 'zod'
export const UserRegister = z.object({
    name: z.string().min(1, "Bạn cần phải nhập tên"),
    email: z.string().email("Bạn cần phải nhập email hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").max(20, "Mật khẩu tối đa 20 ký tự"),
    role: z.string(),
    phoneNumber: z
    .string()
    .refine((phoneNumber) => /^\d{10,15}$/.test(phoneNumber), "Số điện thoại không hợp lệ"),
    address: z.string().min(2,'Vui lòng chọn địa chỉ của bạn'),

})

export const UserLogin = z.object({
    email: z.string().email("Bạn cần phải nhập email hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").max(20, "Mật khẩu tối đa 20 ký tự"),
})
export const AddProduct = z.object({
    name: z.string().min(1, "Tên không được để trống"),
    price: z.string(),
    discount: z.string(),
    description: z.string(),
    imageMain :z.any(),
    imageOther : z.array(z.any()),
    quantity : z.string(),
})