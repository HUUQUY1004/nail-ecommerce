import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserLogin, UserRequest } from 'src/stategy/user.stategy';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    private saltOrRounds = 10
    constructor(@InjectModel(User.name) private userModel : Model<User>,
                private jwtService : JwtService,
                private UserService : UserService,
                private configService : ConfigService,
    ){}
    async register(user :UserRequest) {
        const hashedPassword = await bcrypt.hash(user.password,this.saltOrRounds);
        const checkUserExist =  await this.UserService.findUserByEmail(user.email);
        if(checkUserExist){
            return {
                status: HttpStatus.CONFLICT,
                message: "Email already exist"
            }
        }
        const newUser = await this.userModel.create({...user, password: hashedPassword})
        delete newUser.password
        return {
            status:200,
            ...newUser,
             token: await this.signJwt(newUser.id, newUser.email, newUser.role)
        }
    }
    async login(login : UserLogin) {
        const user = await this.userModel.findOne({email: login.email}).exec();
        if (!user) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                message: 'Invalid email or password'
            };
        }
        const isMatch = await bcrypt.compare(login.password, user.password);
        if (!isMatch) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                message: 'Invalid email or password'
            };
        }
        delete user.password

      

        return {
            status: HttpStatus.OK,
            user,
            token: await this.signJwt(user.id, user.email, user.role)
        };
    }
    async signJwt(_id:string, email:string, role:string): Promise<{ access_token: string,refresh_token:string}>{
        const payload = {
            sub: _id,
            email,
            role
        };
        return {
            access_token: await this.jwtService.signAsync(payload,
                {
                    expiresIn: "10m",
                    secret: "jwt-token"
                }
            ),
            refresh_token: await this.jwtService.signAsync(payload,
                {
                    expiresIn: "7d",
                    secret: "refresh-token"
                }
            )
        };
    }

}
