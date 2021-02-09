import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from './types';

export type UserDocument = User & Document;

@Schema()
export class User {
  id: string;

  @Prop({type: String, required: true})
  name: string;

  @Prop({type: String, required: true, unique: true})
  email: string;

  @Prop({type: String, required: true })
  password: string;

  @Prop({type: String, required: true, enum: Object.keys(UserType)})
  type: UserType;

  @Prop({type: Number, required: false, min: 0, max: 5 })
  rating?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
