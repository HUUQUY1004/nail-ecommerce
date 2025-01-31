import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { ProductRequest } from './stategy/product.stategy';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin')
export class AdminProductController {
    constructor(
        private readonly productService: AdminProductService,
    ){

    }
    @Post('add-product')
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                 .fill(null)
                 .map(() => Math.round(Math.random() * 16).toString(16))
                 .join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
        limits: { fileSize: 100 * 1024 * 1024 }, // Maximum file size is 10MB
     }))
    async addProduct(@Body() product:Omit<ProductRequest, 'imageMain' | 'imageOther'>,@UploadedFiles() files: Express.Multer.File[],) {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded');
        }
        const imageMain = files[0]?.path;  // File chính là file đầu tiên
        if (!imageMain) {
            throw new Error('Main image is required');
        }
        const imageOther = files.slice(1).map(file => file.path);  // Các file còn lại

        const productData: ProductRequest = {
            ...product,
            imageMain,
            imageOther,
          };
       return await this.productService.addProduct(productData)
    }
}
