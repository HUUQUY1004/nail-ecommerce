import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartMiddleware } from './cart.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from 'src/schemas/Cart.schema';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [JwtModule,
    MongooseModule.forFeature([
      { name: Cart.name, schema: cartSchema } ,
    ]),
    ProductModule
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(CartMiddleware)
      .forRoutes({path: "cart/*",method: RequestMethod.ALL})
  }
}
