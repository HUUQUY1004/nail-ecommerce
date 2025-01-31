import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Product {
    @Prop({required:true})
    name: string;

    @Prop({required:true})
    description: string;

    @Prop({required:true})
    price: number;

    @Prop({required:true})
    quantity: number;

    @Prop({required:true})
    discount: number;

    @Prop({required:true})
    imageMain: string;

    @Prop()
    imageOther: string[]

}
export const productSchema =  SchemaFactory.createForClass(Product)