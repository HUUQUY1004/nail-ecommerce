import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AdminProductModule } from './admin-product/admin-product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [AuthModule,
    MongooseModule.forRoot('mongodb://localhost/nail'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Đảm bảo rằng đây là đúng đường dẫn đến thư mục chứa file
      serveRoot: '/uploads', // URL sẽ bắt đầu với '/uploads'
    }),
    UserModule,
    AdminProductModule,
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
}
