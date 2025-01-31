import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class CartMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: () => void) {
    const authorization = req.headers['authorization'];
    console.log(req.headers);
    
    // Kiểm tra token trong header
    if (!authorization) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Không có token',
      });
    }

    const token = authorization.split(' ')[1];

    try {
      // Kiểm tra validity của access token
      const user = await this.jwtService.verifyAsync(token, {
        secret: 'jwt-token',
      });
      req['user'] = user
      console.log(user);
      return next();
    } catch (error) {
      // Xử lý khi token hết hạn
      if (error.name === 'TokenExpiredError') {
        console.log('Token hết hạn, làm mới bằng refresh token');

        // Lấy refresh token từ cookie
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: 'Không có refresh token',
          });
        }

        try {
          // Kiểm tra refresh token và cấp lại access token
          const newAccessToken = await this.jwtService.verifyAsync(refreshToken, {
            secret: 'refresh-token', 
          });

          // Tạo mới access token từ refresh token
          const newAccessTokenJwt = this.jwtService.sign(newAccessToken, {
            secret: 'jwt-token',
            expiresIn: '15m',
          });

          // Trả về access token mới
          res.setHeader('Authorization', `Bearer ${newAccessTokenJwt}`);
          return next();
        } catch (refreshError) {
          console.log('Refresh token không hợp lệ:', refreshError);
          return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: 'Refresh token không hợp lệ',
          });
        }
      }

      // Trường hợp token không hợp lệ
      console.log('Token không hợp lệ');
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Token không đúng',
      });
    }
  }
}
