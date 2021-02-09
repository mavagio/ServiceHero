import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ListingType } from './types';
import { User } from '../user/user.schema';

export type ListingDocument = Listing & Document;
@Schema()
export class Listing {
  static readonly modelName = 'Listing';

  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  specialist: string | User;

  @Prop({ type: String, required: true, enum: Object.keys(ListingType) })
  type: ListingType;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  hourlyRate: number;

  @Prop({ type: [String], required: true })
  availability: string[];
}

export const ListingSchema = SchemaFactory.createForClass(Listing);
