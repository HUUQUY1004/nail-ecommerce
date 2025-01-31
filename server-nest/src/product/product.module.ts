import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/schemas/Product.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
            { name: 'Product', schema: productSchema } 
        ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports:[ProductService]
})
export class ProductModule {}
