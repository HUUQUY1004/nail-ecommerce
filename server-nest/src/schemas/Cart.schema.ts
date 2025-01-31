import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Cart {
    @Prop({required: true})
    userId:string
    @Prop({required: true})
    carts: [{ productId: object, quantity: number }]
}
export const cartSchema =  SchemaFactory.createForClass(Cart)