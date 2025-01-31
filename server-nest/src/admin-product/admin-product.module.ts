import { Module } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { AdminProductController } from './admin-product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { productSchema } from 'src/schemas/Product.schema';
import {MulterModule} from '@nestjs/platform-express'

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Product', schema: productSchema } 
    ]),
      JwtModule.register({
    }),
    MulterModule.register({
      dest: './uploads'  // specify the destination folder where the uploaded files will be stored
    })
  ],
  providers: [AdminProductService],
  controllers: [AdminProductController]
})
export class AdminProductModule {}
