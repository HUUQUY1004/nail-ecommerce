import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { Cart } from 'src/schemas/Cart.schema';
import { AddToCartRequest } from 'src/stategy/cart.stategy';

@Injectable()
export class CartService {
    constructor(
            @InjectModel(Cart.name) private cartModel: Model<Cart>,
            private productService: ProductService
        ) {} 
        
    async findCartByUserId(userId: string): Promise<Cart | undefined> {
        console.log("This is message log at line 15 and userId is " + userId)
        return await this.cartModel.findOne({ userId });
    }

    async createCart(userId: string,addToCart: AddToCartRequest): Promise<any> {
        const cart = await this.findCartByUserId(userId);
        if(!cart){
            const newCart = await 
            this.cartModel.create({ userId, carts: addToCart });
            return {
             status: HttpStatus.OK,
             "message": "Thêm thành công"
            }
        }else{
            const existingItemIndex = cart.carts.findIndex((item: any) => String(item.productId) === String(addToCart.productId));

        if (existingItemIndex !== -1) {
            cart.carts[existingItemIndex].quantity += addToCart.quantity;
        } else {
            cart.carts.push({
                productId: addToCart.productId,
                quantity: addToCart.quantity
            });
        }

        await this.cartModel.updateOne({ userId }, { carts: cart.carts });
        return {
            status: HttpStatus.OK,
            message: existingItemIndex !== -1 ? "Cập nhật số lượng thành công" : "Thêm sản phẩm thành công",
        };
            
        }
    }
    async getCart(userId: string) {
        const carts = await this.findCartByUserId(userId);
        const products = [];
        
        if (carts) {
            for (const item of carts.carts) {
                const product = await this.productService.getProductById(String(item.productId));
                products.push({quantity: item.quantity, product: product.data});
            }
            
            return {
                status: HttpStatus.OK,
                data: products
            };
        } else {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: "Giỏ hàng trống"
            };
        }
    }
    async deleteCartItem(userId: string,productId: string){
        const cart = await this.findCartByUserId(userId)
        if(cart) {
            // To do something
            const newCarts = cart.carts.filter(item => String(item.productId) !==String(productId))
            const upd = await this.cartModel.updateOne({ userId }, { carts: newCarts });
        }
        else {
            return {
                status: HttpStatus.BAD_REQUEST,
                message:   `Can't find cart for you`
            }
        }
    }
    
}
