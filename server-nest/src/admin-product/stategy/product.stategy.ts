import { Express } from 'express';
export class ProductRequest {
    name: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    imageMain: string;
    imageOther: string[];
}