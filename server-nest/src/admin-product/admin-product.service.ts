import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';
import { ProductRequest } from './stategy/product.stategy';

@Injectable()
export class AdminProductService {
    constructor(
        @InjectModel(Product.name) private productModel : Model<Product>,
        
    ){
    }
    async addProduct(product: ProductRequest){
        try {
            const newProduct = new this.productModel(product);
            await newProduct.save();
            return {
                status: HttpStatus.OK,
                product: newProduct
            };
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            };
        }
        
    }
}
