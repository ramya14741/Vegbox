import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose'
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User
{
    @Prop()
    name: string 
    @Prop()
    email:{
        type:string,
        default:"subscriber"
    }
    @Prop()
    cart:{
        type: string[],
        default:[]
    }
    @Prop()
    address: string
    @Prop()
    timestamp: true

}

export const UserSchema = SchemaFactory.createForClass(User)