import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/User.schema';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: userSchema } 
  ]),
  JwtModule.register({
  }),
],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
