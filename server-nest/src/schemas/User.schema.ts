import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({unique:true, required:true})
    email: string;

    @Prop({ required:true})
    password: string;

    @Prop({ required:true})
    name: string;

    @Prop({ required:true,default: "CUSTOMER",})
    role : string;

    @Prop({default:true})
    isActive: boolean;

    @Prop({default:[]})
    star: number[]

    @Prop({default: new Date(Date.now())})
    createdAt: Date;

    @Prop({default: new Date(Date.now())})
    updatedAt: Date;
}
export const userSchema =  SchemaFactory.createForClass(User)