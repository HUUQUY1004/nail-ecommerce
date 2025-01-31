import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserLogin, UserRequest } from 'src/stategy/user.stategy';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    private readonly service : AuthService;
    constructor(service : AuthService) {
        this.service = service;
    }

    @Post('register')
    async register( @Body()  userRequest : UserRequest) {
        return await this.service.register(userRequest)
    }
    @Post("login")
    async login(@Body() login : UserLogin, @Res({ passthrough: true }) res: Response) {
        console.log("login");
        
        const loginRes=  await this.service.login(login)
        // Save refresh token
        res.cookie('refreshToken', loginRes.token.refresh_token, 
            { httpOnly: true, 
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) 
            }
        );
        return loginRes
    }
}
