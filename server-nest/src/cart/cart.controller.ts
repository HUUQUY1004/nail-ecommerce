import { Body, Controller, Delete, Get, Param, Post,Req } from '@nestjs/common';
import { Request } from 'express';
import { AddToCartRequest } from 'src/stategy/cart.stategy';
import { CartService } from './cart.service';

@Controller('/cart')
export class CartController {
    constructor (
        private readonly cartService: CartService
    ){

    }
    @Post('addToCart')
    async addToCart(@Body() addToCart: AddToCartRequest,@Req() request : Request){
        console.log(addToCart)
        delete addToCart.token
        console.log('This is a userId ' , request['user']);
        
        return this.cartService.createCart(request['user'].sub, addToCart)
    }
    @Get('getCart')
    async getCart(@Req() request: Request){
        return this.cartService.getCart(request['user'].sub)
    }
    @Delete("delete/:id")
    async deleteCartItem(@Param('id') id: string, @Req() request: Request){
        return this.cartService.deleteCartItem(request['user'].sub, id)
    }
}
