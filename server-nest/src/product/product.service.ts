import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}

    async getProductById(id: string) {
        try {
            console.log('get productById:', id);
            const product = await this.productModel.findById({_id: id});
            console.log("productById:", product);
            
            if (!product) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Product not found',
                };
            }

            return {
                status: HttpStatus.OK,
                data: product,
            };
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'Invalid ID format or other error',
            };
        }
    }
}
